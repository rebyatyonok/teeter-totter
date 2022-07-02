import { nanoid } from "nanoid"
import { ref, Ref } from "vue"
import { useKeydownEvent } from "../composables/useKeydownEvent"
import { rand } from "../helpers/rand"

export const shapes = ['circle', 'rectangle', 'triangle'] as const
export type Side = 'left' | 'right'

export class Figure {
  id = nanoid()
  side: Side
  x = 0
  y = 0
  shape = shapes[rand(0, shapes.length - 1)]
  weight = rand(1, 10)
  color = 'red'
  isSettled = false

  constructor(side: Side) {
    const colors = ['red', 'blue', 'gray', 'tomato', 'brown']

    this.side = side
    this.x = this.side === 'left' ? 30 : rand(60, 90)
    this.color = colors[rand(0, colors.length - 1)]
  }
}
