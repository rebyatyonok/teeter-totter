import { useConfigStore } from "../store/config";
import { Meter } from "../types";

export function metersToPixels(meters: Meter) {
	const config = useConfigStore()
	return meters * config.pixelsInOneMeter
}