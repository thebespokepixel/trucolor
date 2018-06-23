import test from 'ava'
import {palette} from '..'

const heading = `values via module`

const mixes = palette({}, {
	reset: 'reset',
	normal: 'normal',
	normalReset: 'reset'
})

const mixResults = {
	reset: '\u001B[0m',
	normal: '\u001B[0m',
	normalReset: '\u001B[0m'
}

Object.keys(mixResults).forEach(target => {
	test(`${heading}: Resets : ${mixes[target]} is SGR reset`, t => {
		t.is(mixes[target].in, mixResults[target])
	})
})
