import './index.css';

export interface Type {
	name: string
	strongTo: Array<string>
	resistedBy: Array<string>
}

export const TypeList = {
	"FIRE": {
		name: "FIRE", 
		strongTo: ["GRASS"], 
		resistedBy: ["FIRE", "WATER"]
	},
	"WATER": {
		name: "WATER",
		strongTo: ["FIRE"],
		resistedBy: ["WATER", "GRASS"]
	},
	"GRASS": {
		name: "GRASS",
		strongTo: ["WATER"],
		resistedBy: ["GRASS", "FIRE"]
	},
	"NEUTRAL": {
		name: "NEUTRAL",
		strongTo: [],
		resistedBy: []
	}
};