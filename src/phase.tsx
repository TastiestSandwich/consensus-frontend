import React from 'react';
import './style/phase.css';
import { CardInstance } from './card';
import { ChinpokoData } from './chinpoko';

export interface PhaseCounter {
  value: number
  chinpoko: ChinpokoData
  remainingPhases: Array<PhaseData>
}

export function initPhaseGroupData(size: number) {
	let phaseGroup: Array<PhaseData> = new Array<PhaseData>();
	for (let i = 0; i < size; i++) {
		phaseGroup.push(initPhaseData(i+1));
	}
	return phaseGroup;
}

function initPhaseData(index: number) {
	let phaseData: PhaseData = {
		index: index,
		filled: false,
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
				instance: null
			}
		} else if (i === phaseNumber) {
			newPhases[i-1] = {
				index: i,
				filled: true,
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
				instance: null
			}
		} else if (i === phaseNumber) {
			newPhases[i-1] = {
				index: i,
				filled: false,
				instance: null
			}
		}
	}
	return newPhases;
}

interface PhaseGroupProps {
	phases: Array<PhaseData>
	ally: boolean
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
	instance: CardInstance | null
}

interface PhaseProps {
	key: number
	phase: PhaseData
	ally: boolean
	onPhaseClick?: () => void
	onPhaseDelete?: () => void
}

export class Phase extends React.Component<PhaseProps, {}> {

	render() {
		// add is-not-ally class after ':' if needed
		const allyClass = this.props.ally ? "is-ally" : ""
		const filledClass = this.props.phase.filled ? "is-filled" : ""

		if(!this.props.ally) {
			return (
				<div className={`phase-container ${allyClass}`}>
					<div className="phase">
						{this.props.phase.index}
					</div>
				</div>
			)

		} else {
			return (
				<div className={`phase-container ${allyClass}`}>
					<div className={`phase ${filledClass}`} onClick={this.props.onPhaseClick}>
						{this.props.phase.index}
					</div>
					{ this.props.phase.instance != null &&
						<div className="phase-card">
							{this.props.phase.instance.card.name}
							<button className="delete-phase-card" onClick={this.props.onPhaseDelete}>
								x
							</button>
						</div> }
				</div>
			)
		}
	}
}