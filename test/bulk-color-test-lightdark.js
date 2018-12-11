import test from 'ava'
import {palette} from '..'

const heading = 'values via module'

const definitions = palette({}, {
	red: 'dark red',
	green: 'light green',
	blue: 'blue lighten 20',
	violet: 'violet desaturate 40',
	violetS: 'violet desat 20',
	firebrick: 'firebrick saturate 30',
	firebrickS: 'firebrick sat 10'
})

const definitionResults = {
	red: '990000',
	green: '00e600',
	blue: '6666ff',
	violet: 'd29ed2',
	violetS: 'e090e0',
	firebrick: 'd20202',
	firebrickS: 'bd1717'
}

Object.keys(definitionResults).forEach(target => {
	test(`${heading}: Light/Dark : ${definitions[target].toSwatch()} is ${definitionResults[target]}`, t => {
		t.is(definitions[target].hex, definitionResults[target])
	})
})
