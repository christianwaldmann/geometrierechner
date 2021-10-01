import {
	UNIT_MM,
	UNIT_CM,
	UNIT_DM,
	UNIT_M,
	UNIT_MM_FACTOR,
	UNIT_CM_FACTOR,
	UNIT_DM_FACTOR,
	UNIT_M_FACTOR,
} from "./Constants";

export const displayNumber = (number) => {
	return number.toLocaleString(navigator.language);
};

export const displayNumberFixedDecimalPlaces = (number, n) => {
	return number.toLocaleString(navigator.language, {
		minimumFractionDigits: n,
		maximumFractionDigits: n,
	});
};

export function getLengthUnitFactor(lengthUnit) {
	switch (lengthUnit) {
		case UNIT_MM:
			return UNIT_MM_FACTOR;
		case UNIT_CM:
			return UNIT_CM_FACTOR;
		case UNIT_DM:
			return UNIT_DM_FACTOR;
		case UNIT_M:
			return UNIT_M_FACTOR;
		default:
			throw new Error("Unbekannte Laengeneinheit");
	}
}
