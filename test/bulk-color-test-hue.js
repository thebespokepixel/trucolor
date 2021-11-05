import test from 'ava'
import {palette} from '../index.js'

const heading = 'values via module'

const hues = palette({}, {
	orange: 'orange spin 120',
	chocolate: 'chocolate spin -30',
	goldenrod: 'goldenrod spin 0',
})

const huesResults = {
	orange: 'a500ff',
	chocolate: 'd2c31e',
	goldenrod: 'daa520',
}

for (const target of Object.keys(huesResults)) {
	test(`${heading}: Hues : ${hues[target].toSwatch()} is ${huesResults[target]}`, t => {
		t.is(hues[target].hex, huesResults[target])
	})
}
