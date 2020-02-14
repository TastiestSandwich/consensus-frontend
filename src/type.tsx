export interface Type {
	name: string
	color: string
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
		color: "red",
		weakness: ["WATER", "EARTH"], 
		resistance: ["FIRE", "GRASS", "ICE"]
	},
	"WATER": {
		name: "WATER",
		color: "dodgerblue",
		weakness: ["GRASS", "ELECTRIC", "ICE"],
		resistance: ["WATER", "FIRE"]
	},
	"GRASS": {
		name: "GRASS",
		color: "chartreuse",
		weakness: ["FIRE", "AIR", "ICE"],
		resistance: ["GRASS", "WATER", "ELECTRIC"]
	},
	"NEUTRAL": {
		name: "NEUTRAL",
		color: "lightgrey",
		weakness: ["MISTERY"],
		resistance: []
	},
	"MISTERY": {
		name: "MISTERY",
		color: "darkmagenta",
		weakness: [],
		resistance: ["NEUTRAL"]
	},
	"ELECTRIC": {
		name: "ELECTRIC",
		color: "gold",
		weakness: ["EARTH"],
		resistance: ["ELECTRIC", "AIR"]
	},
	"EARTH": {
		name: "EARTH",
		color: "saddlebrown",
		weakness: ["GRASS", "AIR"],
		resistance: ["FIRE"]
	},
	"AIR": {
		name: "AIR",
		color: "skyblue",
		weakness: ["ELECTRIC", "ICE"],
		resistance: ["EARTH", "GRASS"]
	},
	"ICE": {
		name: "ICE",
		color: "cornflowerblue",
		weakness: ["FIRE"],
		resistance: ["ICE", "WATER"]
	}
};