import React from 'react';
import { ChinpokoData } from '../../components/chinpoko/chinpoko';
import './teamChinpoko.scss';

interface TeamChinpokoProps {
	chinpoko: ChinpokoData
}

export class TeamChinpoko extends React.Component<TeamChinpokoProps> {

	renderChinpokoSprite() {
		const species = this.props.chinpoko.storedData.species
		return (
			<div className={`team-chinpoko-component__sprite`}>
				<img src={species.sprite} alt={species.speciesName} />
			</div>
		)
	}

	renderChinpokoDataBox() {
		const {chinpoko} = this.props
		const storedData = chinpoko.storedData
		const healthStyle = { width: (chinpoko.hp * 96 / chinpoko.maxhp) }
		const cpc = "team-chinpoko-component"
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
			</div>
		)
	}

	render() {
		return (
			<div className={`team-chinpoko-component`}>
				{this.renderChinpokoDataBox()}
				{this.renderChinpokoSprite()}
			</div>
		);
	}
}