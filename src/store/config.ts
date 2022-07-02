import { defineStore } from "pinia";

export type Config = {
  /** Teeter beam's width */
  beamWidth: number
  /** Minimum weight for figures */
  minWeight: number,
  /** Maximum weight for figures */
  maxWeight: number,
  /** Maximum bend percentage allowed. If more - game will over */
  maxBendPercentage: number,
  /** If some side have more than that value - game over */
  maxExtraWeight: number,
}

const DEFAULTS: Config = {
  beamWidth: 10,
  minWeight: 1,
  maxWeight: 10,
  maxBendPercentage: 30,
  maxExtraWeight: 20
}

export const useConfigStore = defineStore('config', {
  state: (): Config => (DEFAULTS)
})