import React from 'react';
import './index.css';
import { Type, TypeList } from './common.tsx';
import bisonte from './images/bisonte.png'
import lagarto from './images/lagarto.png'
import nutria from './images/nutria.png'

export interface ChinpokoStoredData {
	name: string
	species: BaseChinpokoData
	lvl: number
	evHP: number
	evATK: number
	evDEF: number
	evSPE: number
}

export const BaseChinpokoList = {
	"BISONTE": {
		speciesName: "BISONTE",
		sprite: bisonte,
		baseHP: 100,
		baseATK: 60,
		baseDEF: 100,
		baseSPE: 60,
		type: TypeList["GRASS"]
	},
	"LAGARTO": {
		speciesName: "LAGARTO",
		sprite: lagarto,
		baseHP: 70,
		baseATK: 100,
		baseDEF: 70,
		baseSPE: 80,
		type: TypeList["FIRE"]
	},
	"NUTRIA": {
		speciesName: "NUTRIA",
		sprite: nutria,
		baseHP: 60,
		baseATK: 100,
		baseDEF: 60,
		baseSPE: 100,
		type: TypeList["WATER"]
	}
};

export const ChinpokoList: Array<ChinpokoStoredData> = [{
	name: "Imanol", 
	species: BaseChinpokoList["BISONTE"],
	lvl: 10, evHP: 0, evATK: 0, evDEF: 0, evSPE: 0
	},{
	name: "Gerard",
	species: BaseChinpokoList["LAGARTO"],
	lvl: 10, evHP: 0, evATK: 0, evDEF: 0, evSPE: 0
	},{
	name: "Mojano",
	species: BaseChinpokoList["NUTRIA"],
	lvl: 10, evHP: 0, evATK: 0, evDEF: 0, evSPE: 0
	}
];

export interface BaseChinpokoData {
	speciesName: string
	baseHP: number
	baseATK: number
	baseDEF: number
	baseSPE: number
	type: Type
}

export interface ChinpokoData {
	storedData: ChinpokoStoredData
	maxhp: number
	hp: number
	atk: number
	def: number
	spe: number
}

export function getRandomChinpoko(): ChinpokoData {
	let index = Math.floor(Math.random() * ChinpokoList.length);
	return getChinpokoData(ChinpokoList[index]);
}

function getChinpokoData(storedData: ChinpokoStoredData): ChinpokoData {
	let startingHP = calcHP(storedData.species.baseHP, storedData.evHP, storedData.lvl);
	let chinpoko: ChinpokoData = {
		storedData: storedData,
		maxhp: startingHP,
		hp: startingHP,
		atk: calcStat(storedData.species.baseATK, storedData.evATK, storedData.lvl),
		def: calcStat(storedData.species.baseDEF, storedData.evDEF, storedData.lvl),
		spe: calcStat(storedData.species.baseSPE, storedData.evSPE, storedData.lvl)
	}
	return chinpoko;
}

function calcStat(baseStat: number, evStat: number, lvl:number): number {
	return Math.floor( ((2*baseStat+evStat)*lvl/100) + 5)
}

function calcHP(baseHP: number, evHP: number, lvl: number): number {
	return Math.floor( ((2*baseHP+evHP)*lvl/100) + lvl + 10)
}

export class Chinpoko extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			name: this.props.chinpoko.storedData.name,
			lvl: this.props.chinpoko.storedData.lvl,
			species: this.props.chinpoko.storedData.species,
			maxhp: this.props.chinpoko.maxhp,
			hp: this.props.chinpoko.hp,
			atk: this.props.chinpoko.atk,
			def: this.props.chinpoko.def,
			spe: this.props.chinpoko.spe,
			ally: this.props.ally
		}
	}

	renderChinpokoSprite() {
		return (
			<div className="chinpoko-sprite" ally={this.state.ally.toString()}>
				<img src={ this.state.species.sprite } alt={ this.state.species.speciesName } />
			</div>
		)
	}

	// <img src={ "/images/" + this.state.species.speciesName.toLowerCase() + ".png" }  alt={ this.state.species.speciesName } />

	renderChinpokoDataBox() {
		return (
			<div className="chinpoko-databox" ally={this.state.ally.toString()}>
				<div className="chinpoko-hpbox">
					<div className="chinpoko-title">
						<div className="chinpoko-name">
							{this.state.name}
						</div>
						<div className="chinpoko-lvl">
							<b>lvl {this.state.lvl}</b>
						</div>	
					</div>
					<div className="chinpoko-healthbar" style= {{width: (this.state.hp * 96 / this.state.maxhp)}}>
					</div>
					<div className="chinpoko-hp">
						<b>HP </b>{this.state.hp} / {this.state.maxhp}
					</div>
				</div>
				<div className="chinpoko-statbox">
					<table>
						<thead>
						<tr>
							<th>ATK</th>
							<th>DEF</th>
							<th>SPE</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>{this.state.atk}</td>
							<td>{this.state.def}</td>
							<td>{this.state.spe}</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="chinpoko-field" ally= {this.state.ally}>
				{ this.renderChinpokoDataBox() }
				{ this.renderChinpokoSprite() }
			</div>
		);
	}
}