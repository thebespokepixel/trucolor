import test from 'ava'
import {palette} from '..'

const heading = 'values via module'

const definitions = palette({}, {
	rgb: 'rgb:255,128,64',
	hsl: 'hsl:45,100,60',
	hsv: 'hsv:90,50,20',
	hsb: 'hsb:135,100,100',
	hwb: 'hwb:155,50,0'
})

const definitionResults = {
	rgb: 'ff8040',
	hsl: 'ffcc33',
	hsv: '26331a',
	hsb: '00ff40',
	hwb: '80ffca'
}

Object.keys(definitionResults).forEach(target => {
	test(`${heading}: Definitions : ${definitions[target].toSwatch()} is ${definitionResults[target]}`, t => {
		t.is(definitions[target].hex, definitionResults[target])
	})
})
