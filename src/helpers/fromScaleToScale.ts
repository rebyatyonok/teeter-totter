/** Type with a [min, max] values for scale */
type Scale = [number, number]

export function fromScaleToScale(val: number, formScale: Scale, toScale: Scale) {
	return (val - formScale[0]) / (formScale[1] - formScale[0]) * (toScale[1] - toScale[0]) + toScale[0]
}