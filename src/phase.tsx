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

export function shouldPhaseBeClicked(phaseNumber: number, card: CardData | null, phases: Array<PhaseData>) {
	if (card === null){
		console.log("no card selected");
		return false;
	}
	let cost: number = card.cost;
	if (cost > phaseNumber) {
		console.log("not enough charging phases")
		return false;
	}
	let numberStart = phaseNumber - cost + 1;
	for (let i = numberStart; i <= phaseNumber; i++) {
		if (phases[i-1].filled) {
			console.log("not enough unfilled charging phases")
			return false;
		}
	}
	return true;
}

export function setPhaseGroupData(phaseNumber: number, card: CardData | null, phases: Array<PhaseData>) {
	let newPhases: Array<PhaseData> = phases.slice();
	if (card === null) {
		return newPhases;
	}
	let numberStart = phaseNumber - card.cost + 1;
	for (let i = numberStart; i <= phaseNumber; i++) {
		if (i < phaseNumber) {
			newPhases[i-1] = {
				filled: true,
				action: null
			}
		} else if (i === phaseNumber) {
			newPhases[i-1] = {
				filled: true,
				action: card
			}
		}
	}
	return newPhases;
}

export function deleteFromPhaseGroupData(phaseNumber: number, cost: number, phases: Array<PhaseData>) {
	let newPhases: Array<PhaseData> = phases.slice();
	let numberStart = phaseNumber - cost + 1;
	for (let i = numberStart; i <= phaseNumber; i++) {
		if (i < phaseNumber) {
			newPhases[i-1] = {
				filled: false,
				action: null
			}
		} else if (i === phaseNumber) {
			newPhases[i-1] = {
				filled: false,
				action: null
			}
		}
	}
	return newPhases;
}

interface PhaseGroupProps {
	phases: Array<PhaseData>
	ally: boolean
	onPhaseClick?: (phaseNumber: number) => void
	onPhaseDelete?: (phaseNumber: number, card: CardData | null) => void
}

export class PhaseGroup extends React.Component<PhaseGroupProps, {}> {
	handleClick = (phaseNumber: number) => () => {
		if (this.props.onPhaseClick)
			this.props.onPhaseClick(phaseNumber)
	}
	handleDelete = (phaseNumber: number, card: CardData | null) => () => {
		if (this.props.onPhaseDelete)
			this.props.onPhaseDelete(phaseNumber, card)
	}

	render() {
		const allyText = this.props.ally?"ALLY":"ENEMY";
		return (
			<div className="phase-group">
				{allyText}
				{ this.props.phases.map((phase, index) => (
		          <Phase 
		            key={index}
		            value={index + 1}
		            phase={phase}
		            ally={this.props.ally} 
		            onPhaseClick={this.handleClick(index+1)}
		            onPhaseDelete={this.handleDelete(index+1, phase.action)}
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
	onPhaseClick?: () => void
	onPhaseDelete?: () => void
}

export class Phase extends React.Component<PhaseProps, {}> {

	render() {
		// add is-not-ally class after ':' if needed
		const allyClass = this.props.ally ? "is-ally" : ""
		const filledClass = this.props.phase.filled ? "is-filled" : ""
		return (
			<div className={`phase-container ${allyClass}`}>
				<div className={`phase ${filledClass}`} onClick={this.props.onPhaseClick}>
					{this.props.value}
				</div>
				{ this.props.phase.action != null &&
					<div className="phase-action">
						{this.props.phase.action.name}
						<button className="delete-phase-action" onClick={this.props.onPhaseDelete}>
							x
						</button>
					</div> }
			</div>
		)
	}
}