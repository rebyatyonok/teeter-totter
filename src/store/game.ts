import { defineStore } from "pinia";
import { Figure } from "../types";

type GameState = {
  paused: boolean,
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
    figures: {},
    activeFigureId: '',
    movementInterval: 0,
  }),
  getters: {
    totalWeight: (state) => {
      return Object.values(state.figures)
        .filter(e => e.isSettled)
        .reduce((acc: TotalWeight, figure: Figure) => {
          if (figure.side === 'left') acc.left += figure.weight
          else acc.right += figure.weight

          return acc
        }, { left: 0, right: 0 })
    },
    totalBend: (state) => {

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
      this.figures[id].y = this.figures[id].y += amount // TODO: move to config
    },
    moveFigureByX(id: string, amount: number) {
      const leftLimit = 5
      const rightLimit = 40

      const moveTo = this.figures[id].x + amount

      if (moveTo > rightLimit) {
        this.figures[id].x = rightLimit
      } else if (moveTo < leftLimit) {
        this.figures[id].x = leftLimit
      } else {
        this.figures[id].x = moveTo
      }
    },
    keydownHandler(e: KeyboardEvent) {
      if (!this.movementInterval || this.figures[this.activeFigureId].side === 'right') return

      if (e.code === 'KeyD') {
        this.moveFigureByX(this.activeFigureId, 1)
      } else if (e.code === 'KeyA') {
        this.moveFigureByX(this.activeFigureId, -1)
      }
    },
    startMovement() {
      this.movementInterval = setInterval(() => {
        this.moveFigureByY(this.activeFigureId, 3)
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
      // todo
    },
  }
})