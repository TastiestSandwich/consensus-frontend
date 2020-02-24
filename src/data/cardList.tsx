import { CardData } from '../components/card/card';
import { TypeList } from '../components/type/type';
import { EffectList } from './effectList';

export const CardList: { [name:string] : CardData } = {
	"Quick Attack": {
		name: "Quick Attack",
		text: "Quickly strikes the enemy",
		type: TypeList["NEUTRAL"],
		actions: [{
			effect: EffectList["DAMAGE"],
			parameters: {
				power: 30,
			}
		}]
	},
	"Water Gun": {
		name: "Water Gun",
		text: "Soaks the enemy in water",
		type: TypeList["WATER"],
		actions: [{
			effect: EffectList["WAIT"],
			parameters: {}
		},{
			effect: EffectList["DAMAGE"],
			parameters: {
				power: 50,
			}
		}]
	},
	"Mega Drain": {
		name: "Mega Drain",
		text: "Drains the enemy's health, recovering half the damage done",
		type: TypeList["GRASS"],
		actions: [{
			effect: EffectList["WAIT"],
			parameters: {}
		},{
			effect: EffectList["WAIT"],
			parameters: {}
		},{
			effect: EffectList["ABSORB"],
			parameters: {
				power: 60,
				percentage: 0.5,
			}
		}]
	},
	"Flamethrower": {
		name: "Flamethrower",
		text: "Burns the enemy with a stream of fire",
		type: TypeList["FIRE"],
		actions: [{
			effect: EffectList["WAIT"],
			parameters: {}
		},{
			effect: EffectList["WAIT"],
			parameters: {}
		},{
			effect: EffectList["WAIT"],
			parameters: {}
		},{
			effect: EffectList["DAMAGE"],
			parameters: {
				power: 90,
			}
		}]
	},
	"Rest": {
		name: "Rest",
		text: "Rests and recovers half of its health",
		type: TypeList["NEUTRAL"],
		actions: [{
			effect: EffectList["WAIT"],
			parameters: {}
		},{
			effect: EffectList["WAIT"],
			parameters: {}
		},{
			effect: EffectList["WAIT"],
			parameters: {}
		},{
			effect: EffectList["HEAL"],
			parameters: {
				percentage: 0.5,
			}
		}]
	},
}