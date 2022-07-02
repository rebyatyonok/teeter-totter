export function isFigureSettled(figure: HTMLElement | null, beam: HTMLElement | null) {
	if (!figure || !beam) {
		// just for type safety
		throw Error("Argument is undefined!")
	}

	const figureRect = figure.getBoundingClientRect();
	const beamRect = beam.getBoundingClientRect();

	return figureRect.bottom >= beamRect.top - 5
}