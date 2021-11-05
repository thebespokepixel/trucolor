import test from 'ava'
import {palette} from '../index.js'

const heading = 'values via module'

const primaries = palette({}, {
	red: 'red',
	green: 'green',
	blue: 'blue',
	yellow: 'yellow',
	cyan: 'cyan',
	magenta: 'magenta',
})

const primaryResults = {
	red: 'ff0000',
	green: '008000',
	blue: '0000ff',
	yellow: 'ffff00',
	cyan: '00ffff',
	magenta: 'ff00ff',
}

for (const target of Object.keys(primaryResults)) {
	test(`${heading}: Primaries : ${primaries[target].toSwatch()} is ${primaryResults[target]}`, t => {
		t.is(primaries[target].hex, primaryResults[target])
	})
}
