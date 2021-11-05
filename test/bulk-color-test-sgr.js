import test from 'ava'
import {palette} from '../index.js'

const heading = 'values via module'

const definitions = palette({}, {
	underline: 'red underline',
	background: 'green background',
	bold: 'yellow bold',
	dim: 'pink dim',
	italic: 'orange italic',
	invert: 'cyan invert',
	blink: 'red blink',
})

const definitionResults = {
	underline: 'ff0000',
	background: '008000',
	bold: 'ffff00',
	dim: 'ffc0cb',
	italic: 'ffa500',
	invert: '00ffff',
	blink: 'ff0000',
}

for (const target of Object.keys(definitionResults)) {
	test(`${heading}: Definitions : ${definitions[target].in}Test${definitions[target].out} is ${definitionResults[target]}`, t => {
		t.is(definitions[target].hex, definitionResults[target])
	})
}
