import { defineStore } from "pinia";
import { fromScaleToScale } from "../helpers/fromScaleToScale";
import { Figure } from "../classes/figure";
import { useConfigStore } from "./config";
import { KEY_LEFT, KEY_RIGHT } from "../constants";

type GameState = {
  paused: boolean,
  over: boolean,
  figures: Record<string, Figure>,
  activeFigureId: string
  movementInterval: number,
}

type TotalWeight = {
  left: number
  right: number
}

export const useGameStore = defineStore('game', {
  state: (): GameState => ({
    paused: false,
    over: false,
    figures: {},
    activeFigureId: '',
    movementInterval: 0,
  }),
  getters: {
    settledFigures: (state) => {
      return Object.values(state.figures).filter(e => e.isSettled)
    },

    totalWeightBySides(): TotalWeight {
      return this.settledFigures.reduce((acc: TotalWeight, figure: Figure) => {
        acc[figure.side] += figure.weight
        return acc
      }, { left: 0, right: 0 })
    },

    totalForceBySides(): TotalWeight {
      const config = useConfigStore()

      // create a dependency between weight and distance from center of platform
      return this.settledFigures.reduce((acc: TotalWeight, figure: Figure) => {
        const distanceFromPivot = Math.abs(figure.x - config.teeterTotterWidthInPx / 2)

        acc[figure.side] += distanceFromPivot * figure.weight
        return acc
      }, { left: 0, right: 0 })
    },

    totalBendAngle(): number {
      const config = useConfigStore()
      const { left, right } = this.totalForceBySides
      const maxForceValue = config.maxWeight * (config.teeterTotterWidthInPx / 2)

      return Math.floor(fromScaleToScale(right - left, [0, maxForceValue], [0, config.tetterTotter.maxBendAngle]))
    },

    isOver(): boolean {
      const config = useConfigStore()
      const { left, right } = this.totalWeightBySides

      const isBendAngleBiggerThanMax = Math.abs(this.totalBendAngle) > config.tetterTotter.maxBendAngle
      const isExtraWeightBiggerThanMax = Math.abs(left - right) > config.maxExtraWeight

      return isBendAngleBiggerThanMax || isExtraWeightBiggerThanMax
    }
  },
  actions: {
    addFigure(figure: Figure) {
      this.figures = {
        ...this.figures,
        [figure.id]: figure
      }
      this.activeFigureId = figure.id
    },

    moveFigureByY(id: string, amount: number) {
      this.figures[id].y = this.figures[id].y += amount
    },

    moveFigureByX(id: string, amount: number) {
      const config = useConfigStore()

      const min = 0
      const max = (config.teeterTotterWidthInPx / 2) - this.figures[id].width

      const moveTo = this.figures[id].x + amount

      if (moveTo > max) {
        this.figures[id].x = max
      } else if (moveTo < min) {
        this.figures[id].x = min
      } else {
        this.figures[id].x = moveTo
      }
    },

    keydownHandler(e: KeyboardEvent) {
      const config = useConfigStore()

      if (!this.movementInterval || this.figures[this.activeFigureId].side === 'right') return

      if (e.code === KEY_RIGHT) {
        this.moveFigureByX(this.activeFigureId, config.horizontalSpeed)
      } else if (e.code === KEY_LEFT) {
        this.moveFigureByX(this.activeFigureId, -config.horizontalSpeed)
      }
    },

    startMovement() {
      this.movementInterval = setInterval(() => {
        this.moveFigureByY(this.activeFigureId, 5)
      }, 100)
    },

    start() {
      this.addFigure(new Figure("right"))

      this.startMovement()
      window.addEventListener('keydown', this.keydownHandler);
    },

    settleActiveFigure() {
      const activeFigure = this.figures[this.activeFigureId]
      activeFigure.isSettled = true

      this.addFigure(new Figure(activeFigure.side === 'left' ? 'right' : 'left'))

      return activeFigure
    },

    pause() {
      this.paused = true
      window.clearInterval(this.movementInterval)
      window.removeEventListener('keydown', this.keydownHandler)
    },

    continue() {
      this.paused = false
      this.startMovement()
      window.addEventListener('keydown', this.keydownHandler)
    },

    stop() {
      this.over = true
      window.clearInterval(this.movementInterval)
      window.removeEventListener('keydown', this.keydownHandler)
    },
  }
})