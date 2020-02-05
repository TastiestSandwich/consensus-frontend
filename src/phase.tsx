import React from 'react';
import './phase.css';
import { CardData } from './card';

export function initPhaseGroupData(size: number) {
	let phaseGroup: Array<PhaseData> = new Array<PhaseData>();
	for (let i = 0; i < size; i++) {
		phaseGroup.push(initPhaseData());
	}
	return phaseGroup;
}

function initPhaseData() {
	let phaseData: PhaseData = {
		filled: false,
		action: null
	}
	return phaseData;
}

interface PhaseGroupProps {
	phases: Array<PhaseData>
	ally: boolean
}

export class PhaseGroup extends React.Component<PhaseGroupProps, {}> {

	render() {
		return (
			<div className="phase-group">
				{ this.props.phases.map((phase, index) => (
		          <Phase 
		            key={index}
		            value={index}
		            phase={phase}
		            ally={this.props.ally} 
		            //onClick={this.handleClick(card)}
		           /> 
		          ))}
			</div>
		)
	}
}

export interface PhaseData {
	filled: boolean
	action: CardData | null
}

interface PhaseProps {
	key: number
	phase: PhaseData
	ally: boolean
	value: number
}

export class Phase extends React.Component<PhaseProps, {}> {

	render() {
		// add is-not-ally class after ':' if needed
		const allyClass = this.props.ally ? "is-ally" : "" 
		return (
			<div className={`phase ${allyClass}`}>
				{this.props.value}
			</div>
		)
	}
}