import {PhaseCounter} from './phase';

export function findHighestIndexOverLimit(phaseCounters: Array<PhaseCounter>, limit: number) {
	let index: number = -1;
	let max: number = -1;

	for(let i = 0; i < phaseCounters.length; i++) {
		const value = phaseCounters[i].value;

		if (value > limit) {
			if ( (value > max) || (value === max && index < 0) ) {
				max = value;
				index = i;

			} else if (value === max && index >= 0) {
				const random = Math.random();
				if (random >= 0.5) {
					index = i;
				}
			}
		}
	}
	return index;
}