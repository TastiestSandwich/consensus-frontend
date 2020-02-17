import { CardData } from '../components/card/card';
import { TypeList } from '../components/type/type';

export const CardList: { [name:string] : CardData } = {
	"Quick Attack": {
		name: "Quick Attack",
		cost: 1,
		power: 30,
		text: "Quickly strikes the enemy",
		type: TypeList["NEUTRAL"],
		action: [{
			effect: "DAMAGE",
			parameters: {
				power: 30,
			}
		}]
	},
	"Water Gun": {
		name: "Water Gun",
		cost: 2,
		power: 50,
		text: "Soaks the enemy in water",
		type: TypeList["WATER"],
		action: [{
			effect: "DAMAGE",
			parameters: {
				power: 50,
			}
		}]
	},
	"Mega Drain": {
		name: "Mega Drain",
		cost: 3,
		power: 60,
		text: "Drains the enemy's health, recovering half the damage done",
		type: TypeList["GRASS"],
		action: [{
			effect: "ABSORB",
			parameters: {
				power: 60,
				percentage: 0.5,
			}
		}]
	},
	"Flamethrower": {
		name: "Flamethrower",
		cost: 4,
		power: 90,
		text: "Burns the enemy with a stream of fire",
		type: TypeList["FIRE"],
		action: [{
			effect: "DAMAGE",
			parameters: {
				power: 90,
			}
		}]
	},
	"Rest": {
		name: "Rest",
		cost: 5,
		text: "Rests and recovers half of its health",
		type: TypeList["NEUTRAL"],
		action: [{
			effect: "HEAL",
			parameters: {
				percentage: 0.5,
			}
		}]
	},
}