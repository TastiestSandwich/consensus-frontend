import React from 'react';
import './old_style/phase.css';
import { CardInstance } from './card';

export interface CurrentPhase {
	isAlly: boolean
	index: number
}

export interface PhaseCounter {
  value: number
  isAlly: boolean
  remainingPhases: Array<PhaseData>
}

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

export function initPhaseGroupData(size: number) {
	let phaseGroup: Array<PhaseData> = new Array<PhaseData>();
	for (let i = 0; i < size; i++) {
		phaseGroup.push(initPhaseData(i+1));
	}
	return phaseGroup;
}

export function initPhaseData(index: number) {
	let phaseData: PhaseData = {
		index: index,
		filled: false,
		show: false,
		instance: null
	}
	return phaseData;
}

export function shouldPhaseBeClicked(phaseNumber: number, instance: CardInstance | null, phases: Array<PhaseData>) {
	if (instance === null){
		console.log("no card selected");
		return false;
	}
	let cost: number = instance.card.cost;
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

export function setPhaseGroupData(phaseNumber: number, instance: CardInstance | null, phases: Array<PhaseData>) {
	let newPhases: Array<PhaseData> = phases.slice();
	if (instance === null) {
		return newPhases;
	}
	let numberStart = phaseNumber - instance.card.cost + 1;
	for (let i = numberStart; i <= phaseNumber; i++) {
		if (i < phaseNumber) {
			newPhases[i-1] = {
				index: i,
				filled: true,
				show: false,
				instance: null
			}
		} else if (i === phaseNumber) {
			newPhases[i-1] = {
				index: i,
				filled: true,
				show: false,
				instance: instance
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
				index: i,
				filled: false,
				show: false,
				instance: null
			}
		} else if (i === phaseNumber) {
			newPhases[i-1] = {
				index: i,
				filled: false,
				show: false,
				instance: null
			}
		}
	}
	return newPhases;
}

interface PhaseGroupProps {
	phases: Array<PhaseData>
	ally: boolean
	currentPhase: CurrentPhase | null
	onPhaseClick?: (phaseNumber: number) => void
	onPhaseDelete?: (phaseNumber: number, instance: CardInstance | null) => void
}

export class PhaseGroup extends React.Component<PhaseGroupProps, {}> {
	handleClick = (phaseNumber: number) => () => {
		if (this.props.onPhaseClick)
			this.props.onPhaseClick(phaseNumber)
	}
	handleDelete = (phaseNumber: number, instance: CardInstance | null) => () => {
		if (this.props.onPhaseDelete)
			this.props.onPhaseDelete(phaseNumber, instance)
	}

	render() {
		const allyText = this.props.ally?"ALLY":"ENEMY";
		return (
			<div className="phase-group">
				{allyText}
				{ this.props.phases.map((phase, index) => (
				  <Phase
					key={index}
					phase={phase}
					ally={this.props.ally}
					currentPhase={this.props.currentPhase}
					onPhaseClick={this.handleClick(index+1)}
					onPhaseDelete={this.handleDelete(index+1, phase.instance)}
				   />
				  ))}
			</div>
		)
	}
}

export interface PhaseData {
	index: number
	filled: boolean
	show: boolean
	instance: CardInstance | null
}

interface PhaseProps {
	key: number
	phase: PhaseData
	ally: boolean
	currentPhase: CurrentPhase | null
	onPhaseClick?: () => void
	onPhaseDelete?: () => void
}

export class Phase extends React.Component<PhaseProps, {}> {

	render() {
		const { phase, ally, currentPhase, onPhaseClick, onPhaseDelete } = this.props;

		let isCurrent = false;
		if (currentPhase != null) {
			isCurrent = (ally === currentPhase.isAlly && phase.index === currentPhase.index);
		}
		const currentClass = isCurrent ? "is-current" : ""
		// add is-not-ally class after ':' if needed
		const allyClass = ally ? "is-ally" : ""
		const filledClass = phase.filled ? "is-filled" : ""

		if(!ally && !phase.show) {
			return (
				<div className={`phase-container ${allyClass}`}>
					<div className="phase">
						{phase.index}
					</div>
				</div>
			)

		} else {
			return (
				<div className={`phase-container ${allyClass} ${currentClass}`}>
					<div className={`phase ${filledClass}`} onClick={onPhaseClick}>
						{phase.index}
					</div>
					{ phase.instance != null &&
						<div className="phase-card">
							{phase.instance.card.name}
							<button className="delete-phase-card" onClick={onPhaseDelete}>
								x
							</button>
						</div> }
				</div>
			)
		}
	}
}