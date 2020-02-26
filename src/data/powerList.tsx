import { CardData } from '../components/card/card';
import { TypeList } from '../components/type/type';
import { EffectList } from './effectList';

export const PowerList: { [name:string] : CardData } = {
  "Change": {
    name: "Change",
    text: "Changes the current chinpoko",
    type: TypeList["NEUTRAL"],
    actions: [{
      effect: EffectList["WAIT"],
      parameters: {}
    },{
      effect: EffectList["CHANGE"],
      parameters: {}
    },{
      effect: EffectList["WAIT"],
      parameters: {}
    }]
  },
  "Aqua Jet": {
    name: "Aqua Jet",
    text: "Hits with a fast burst of water",
    type: TypeList["WATER"],
    actions: [{
      effect: EffectList["DAMAGE"],
      parameters: {
        power: 40,
      }
    },{
      effect: EffectList["WAIT"],
      parameters: {}
    },]
  },
  "Heat Wave": {
    name: "Heat Wave",
    text: "Surrounds the enemy in hot air",
    type: TypeList["FIRE"],
    actions: [{
      effect: EffectList["WAIT"],
      parameters: {}
    }, {
      effect: EffectList["DAMAGE"],
      parameters: {
        power: 60,
      }
    }, {
      effect: EffectList["WAIT"],
      parameters: {}
    }]
  },
  "Deep Freeze": {
    name: "Deep Freeze",
    text: "Freeze the enemy with abysmal temperature",
    type: TypeList["COLD"],
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
      effect: EffectList["WAIT"],
      parameters: {}
    },{
      effect: EffectList["DAMAGE"],
      parameters: {
        power: 120
      }
    }]
  },
  "Charge Up": {
    name: "Charge Up",
    text: "Eat a battery to restore health",
    type: TypeList["ELECTRIC"],
    actions: [{
      effect: EffectList["WAIT"],
      parameters: {}
    },{
      effect: EffectList["HEAL"],
      parameters: {
        percentage: 0.3
      }
    }]
  },
  "Photosyntesis": {
    name: "Photosyntesis",
    text: "Lay in the sun to regain health",
    type: TypeList["GRASS"],
    actions: [{
      effect: EffectList["HEAL"],
      parameters: {
        percentage: 0.1
      }
    },{
      effect: EffectList["HEAL"],
      parameters: {
        percentage: 0.1
      }
    },{
      effect: EffectList["HEAL"],
      parameters: {
        percentage: 0.1
      }
    },{
      effect: EffectList["HEAL"],
      parameters: {
        percentage: 0.1
      }
    },{
      effect: EffectList["HEAL"],
      parameters: {
        percentage: 0.1
      }
    }]
  },
  "Superposition": {
    name: "Superposition",
    text: "Each quantum state attacks",
    type: TypeList["MISTERY"],
    actions: [{
      effect: EffectList["DAMAGE"],
      parameters: {
        power: 20,
      }
    },{
      effect: EffectList["DAMAGE"],
      parameters: {
        power: 20,
      }
    }]
  }
}