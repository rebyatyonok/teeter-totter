import { nanoid } from "nanoid"
import { MIN_FIGURE_WIDTH, WIDTH_KG_COEFFICIENT } from "../constants"
import { rand } from "../helpers/rand"
import { useConfigStore } from "../store/config"
import { shapes, Side } from "../types"

export class Figure {
	id = nanoid()
	side: Side
	x = 0
	y = 0
	shape = shapes[rand(0, shapes.length - 1)]
	weight = rand(1, 10)
	width = 0
	color = 'red'
	isSettled = false

	constructor(side: Side) {
		const config = useConfigStore()
		const colors = ['red', 'blue', 'gray', 'tomato', 'brown']

		this.side = side
		this.color = colors[rand(0, colors.length - 1)]
		this.width = this.weight * WIDTH_KG_COEFFICIENT + MIN_FIGURE_WIDTH // 30px is the minimum width for figure

		const max = config.teeterTotterWidthInPx - this.width

		this.x = this.side === 'left' ? max / 4 : rand(max / 2, max)
	}
}