import React from 'react';
import './chinpoko.scss';
import { TypeSymbol, Type } from '../type/type';
import { Biome } from '../type/biome';
import { ChinpokoList } from '../../data/chinpokoList';

export interface ChinpokoStoredData {
	name: string
	species: BaseChinpokoData
	lvl: number
	evHP: number
	evATK: number
	evDEF: number
	evSPE: number
}

export interface BaseChinpokoData {
	speciesName: string
	sprite: string
	baseHP: number
	baseATK: number
	baseDEF: number
	baseSPE: number
	biome: Biome
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

export function getChinpokoData(storedData: ChinpokoStoredData): ChinpokoData {
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

function calcStat(baseStat: number, evStat: number, lvl: number): number {
	return Math.floor(((2 * baseStat + evStat) * lvl / 100) + 5)
}

function calcHP(baseHP: number, evHP: number, lvl: number): number {
	return Math.floor(((2 * baseHP + evHP) * lvl / 100) + lvl + 10)
}

interface ChinpokoProps {
	chinpoko: ChinpokoData
	ally: boolean
}

export class Chinpoko extends React.Component<ChinpokoProps> {

	renderChinpokoSprite() {
		const species = this.props.chinpoko.storedData.species
		return (
			<div className={`chinpoko-component__sprite`}>
				<img src={species.sprite} alt={species.speciesName} />
			</div>
		)
	}

	// <img src={ "/images/" + this.state.species.speciesName.toLowerCase() + ".png" }  alt={ this.state.species.speciesName } />

  renderChinpokoTypeRow(parent: string, rowSymbol: string, typeList: Array<Type>) {
    return(
      <div className={`${parent}__row`}>
        <div className={`${parent}__row-symbol`}>
          <i className={rowSymbol}></i> :
        </div>
        <div className={`${parent}__row-content`}>
          { typeList.map((type) => (
            <TypeSymbol
            type={type}
            />
          ))}
        </div>
      </div>
    )
  }

	renderChinpokoBiomeBox(parent: string, biome: Biome) {
		const ally = this.props.ally
		const strongClass = ally ? "far fa-thumbs-up fa-flip-horizontal" : "fa fa-shield"
		const weakClass = ally ? "far fa-thumbs-down fa-flip-horizontal" : "fas fa-bahai"
		const strong = this.renderChinpokoTypeRow("biomebox", strongClass, biome.resistance);
		const weak = this.renderChinpokoTypeRow("biomebox", weakClass, biome.weakness);

		return(
			<div className={`${parent}__biomebox biomebox`}>
				<div className="biomebox__title">
					<strong>{biome.name}</strong>
				</div>
				{ strong }
				{ weak }
			</div>
		);
	}

	renderChinpokoDataBox() {
		const {chinpoko} = this.props
		const storedData = chinpoko.storedData
		const biome = storedData.species.biome
		const healthStyle = { width: (chinpoko.hp * 96 / chinpoko.maxhp) + "%" }
		const cpc = "chinpoko-component"
		return (
			<div className={`${cpc}__databox`}>
				<div className={`${cpc}__hpbox hpbox`}>
					<div className="hpbox__title">
						<div className="hpbox__name">
							{storedData.name}
						</div>
						<div className="hpbox__lvl">
							<b>lvl {storedData.lvl}</b>
						</div>
					</div>
					<div className="hpbox__healthbar" style={healthStyle}>
					</div>
					<div className="hpbox__hp">
						<b>HP </b>{chinpoko.hp} / {chinpoko.maxhp}
					</div>
				</div>
				<div className={`${cpc}__statbox`}>
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
								<td>{chinpoko.atk}</td>
								<td>{chinpoko.def}</td>
								<td>{chinpoko.spe}</td>
							</tr>
						</tbody>
					</table>
				</div>
				{this.renderChinpokoBiomeBox(cpc, biome)}
			</div>
		)
	}

	render() {
		const allyClass = this.props.ally ? "is-ally" : "is-enemy"
		return (
			<div className={`chinpoko-component chinpoko-component--${allyClass}`}>
				{this.renderChinpokoDataBox()}
				{this.renderChinpokoSprite()}
			</div>
		);
	}
}