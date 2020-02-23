import { BiomeList } from '../components/type/biome';
import { BaseChinpokoData } from '../components/chinpoko/chinpoko';
import bisonte from '../images/bisonte.png'
import lagarto from '../images/lagarto.png'
import nutria from '../images/nutria.png'
import gato from '../images/gato.png'
import ardilla from '../images/ardilla.png'
import morsa from '../images/morsa.png'

export const BaseChinpokoList: {[species: string] : BaseChinpokoData} = {
	"BISONTE": {
		speciesName: "BISONTE",
		sprite: bisonte,
		baseHP: 100,
		baseATK: 60,
		baseDEF: 100,
		baseSPE: 60,
		biome: BiomeList["FOREST"]
	},
	"LAGARTO": {
		speciesName: "LAGARTO",
		sprite: lagarto,
		baseHP: 70,
		baseATK: 100,
		baseDEF: 70,
		baseSPE: 80,
		biome: BiomeList["DESERT"]
	},
	"NUTRIA": {
		speciesName: "NUTRIA",
		sprite: nutria,
		baseHP: 60,
		baseATK: 100,
		baseDEF: 60,
		baseSPE: 100,
		biome: BiomeList["RIVER"]
	},
	"GATO": {
		speciesName: "GATO",
		sprite: gato,
		baseHP: 50,
		baseATK: 80,
		baseDEF: 50,
		baseSPE: 140,
		biome: BiomeList["UNKNOWN"]
	},
  "ARDILLA": {
    speciesName: "ARDILLA",
    sprite: ardilla,
    baseHP: 80,
    baseATK: 60,
    baseDEF: 60,
    baseSPE: 120,
    biome: BiomeList["CITY"]
  },
  "MORSA": {
    speciesName: "MORSA",
    sprite: morsa,
    baseHP: 100,
    baseATK: 100,
    baseDEF: 70,
    baseSPE: 50,
    biome: BiomeList["ARCTIC"]
  }
};