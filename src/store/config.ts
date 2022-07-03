import { defineStore } from "pinia";
import { metersToPixels } from "../helpers/metersToPx";
import { Meter, Degree } from '../types'

export type Config = {
  /** Teeter-totter config */
  tetterTotter: {
    /** Width of platform in meters */
    platformWidth: Meter

    /** Height of platform in meters */
    platformHeight: Meter

    /** Maximum bend until game over */
    maxBendAngle: Degree
  }

  /** How much pixels in one meter */
  pixelsInOneMeter: number

  /** Minimum weight for figures */
  minWeight: number

  /** Maximum weight for figures */
  maxWeight: number

  /** Maximum bend percentage allowed. If more - game will over */
  maxBendPercentage: number

  /** If some side have more than that value - game over */
  maxExtraWeight: number

  horizontalSpeed: number

  verticalSpeed: number

  verticalSpeedIncrease: boolean
}

const getDefaultConfig: () => Config = () => ({
  tetterTotter: {
    platformWidth: 10,
    platformHeight: 0.1,
    maxBendAngle: 12,
  },
  pixelsInOneMeter: 100,
  minWeight: 1,
  maxWeight: 10,
  maxBendPercentage: 30,
  maxExtraWeight: 20,
  horizontalSpeed: 5,
  verticalSpeed: 1,
  verticalSpeedIncrease: true,
})

export const useConfigStore = defineStore('config', {
  state: (): Config => (getDefaultConfig()),
  getters: {
    teeterTotterWidthInPx: (state): number => {
      return metersToPixels(state.tetterTotter.platformWidth)
    },
    teeterTotterHeightInPx: (state): number => {
      return metersToPixels(state.tetterTotter.platformHeight)
    }
  }
})