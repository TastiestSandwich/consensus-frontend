export interface Type {
	name: string
	weakness: Array<string>
	resistance: Array<string>
}

export function findEffectiveness(attackType: Type, defenseType: Type):number {
	for(let effectiveType of defenseType.weakness) {
		if(effectiveType === attackType.name) {
			console.log("It's supereffective!");
			return 2;
		}
	}
	for(let ineffectiveType of defenseType.resistance) {
		if(ineffectiveType === attackType.name) {
			console.log("It's not very effective...")
			return 0.5;
		}
	}
	return 1;
}

export function findStab(cardType: Type, userType: Type):number {
	if(cardType.name === userType.name) {
		console.log("It was easy to cast!")
		return 1.5;
	}
	for(let unstabType of userType.weakness) {
		if(unstabType === cardType.name) {
			console.log("It was difficult to cast...")
			return (1./1.5);
		}
	}
	return 1;
}

export const TypeList = {
	"FIRE": {
		name: "FIRE",
		weakness: ["WATER", "EARTH"],
		resistance: ["FIRE", "GRASS", "ICE"]
	},
	"WATER": {
		name: "WATER",
		weakness: ["GRASS", "ELECTRIC", "TOXIC"],
		resistance: ["WATER", "FIRE"]
	},
	"GRASS": {
		name: "GRASS",
		weakness: ["FIRE", "TOXIC", "ICE"],
		resistance: ["GRASS", "WATER", "ELECTRIC"]
	},
	"NEUTRAL": {
		name: "NEUTRAL",
		weakness: ["MISTERY"],
		resistance: []
	},
	"MISTERY": {
		name: "MISTERY",
		weakness: [],
		resistance: ["NEUTRAL"]
	},
	"ELECTRIC": {
		name: "ELECTRIC",
		weakness: ["EARTH", "ARTIFICIAL"],
		resistance: ["ELECTRIC", "AIR"]
	},
	"EARTH": {
		name: "EARTH",
		weakness: ["GRASS", "AIR"],
		resistance: ["EARTH", "FIRE", "TOXIC"]
	},
	"AIR": {
		name: "AIR",
		weakness: ["ELECTRIC", "ICE"],
		resistance: ["AIR","EARTH", "GRASS"]
	},
	"ICE": {
		name: "ICE",
		weakness: ["FIRE", "METAL"],
		resistance: ["ICE", "WATER"]
	},
	"TOXIC": {
		name: "TOXIC",
		weakness: ["AIR", "ARTIFICIAL"],
		resistance: ["TOXIC", "MIND"]
	},
	"ARTIFICIAL": {
		name: "ARTIFICIAL",
		weakness: ["MIND", "GRASS"],
		resistance: ["ARTIFICIAL", "MISTERY"]
	},
	"MIND": {
		name: "MIND",
		weakness: ["TOXIC", "MISTERY"],
		resistance: ["MIND", "ARTIFICIAL"]
	},
};