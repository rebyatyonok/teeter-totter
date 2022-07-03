export function isIntersectsPlatform(figure: HTMLElement | null, platform: HTMLElement | null, angle: number = 0) {
	if (!figure || !platform) {
		// just for type safety
		throw Error("Argument is undefined!")
	}

	const figureRect = figure.getBoundingClientRect();
	const beamRect = platform.getBoundingClientRect();

	// if beam has angle we need add/substract difference for more precise calculation
	// we will do it by calculation one of the sides of right triangle
	if (angle !== 0) {
		const isLeft = parseInt(figure.style.left) < platform.offsetWidth / 2

		const shouldAddFigureWidth = isLeft ? angle < 0 : angle > 0
		const left = parseInt(shouldAddFigureWidth ? figure.style.left + figure.offsetWidth : figure.style.left)

		// second side is amount of pixels to add/substract
		let delta = Math.abs(Math.abs(angle > 0 ? left : beamRect.right - left) * Math.tan(angle * Math.PI / 180))

		// because the beamRect.top is always the highest point (by look, by value it's always smallest)
		// we need always add delta and never substract
		return figureRect.bottom >= (beamRect.top + delta)
	} else {
		return figureRect.bottom >= beamRect.top
	}
}