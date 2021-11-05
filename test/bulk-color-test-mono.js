import test from 'ava'
import {palette} from '../index.js'

const heading = 'values via module'

const hues = palette({}, {
	orange: 'orange mono',
	chocolate: 'chocolate mono',
	goldenrod: 'goldenrod mono',
})

const huesResults = {
	orange: '808080',
	chocolate: '787878',
	goldenrod: '7d7d7d',
}

for (const target of Object.keys(huesResults)) {
	test(`${heading}: Mono : ${hues[target].toSwatch()} is ${huesResults[target]}`, t => {
		t.is(hues[target].hex, huesResults[target])
	})
}
