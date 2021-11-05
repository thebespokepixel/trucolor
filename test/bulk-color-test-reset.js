import test from 'ava'
import {palette} from '../index.js'

const heading = 'values via module'

const mixes = palette({}, {
	reset: 'reset',
	normal: 'normal',
	normalReset: 'reset',
})

const mixResults = {
	reset: '\u001B[0m',
	normal: '\u001B[0m',
	normalReset: '\u001B[0m',
}

for (const target of Object.keys(mixResults)) {
	test(`${heading}: Resets : ${target} is SGR reset`, t => {
		t.is(mixes[target].in, mixResults[target])
	})
}
