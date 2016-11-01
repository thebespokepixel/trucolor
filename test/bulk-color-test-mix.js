import test from 'ava'
import {palette} from '..'

const heading = `values via module`

const mixes = palette({}, {
	redBlue: 'red mix blue',
	hexMix: '#123456 mix #226644',
	hsbMix: 'hsb:135,100,100 mix rgb(100,100,100)'
})

const mixResults = {
	redBlue: '800080',
	hexMix: '1a4d4d',
	hsbMix: '32b252'
}

Object.keys(mixResults).forEach(target => {
	test(`${heading}: Mix : ${mixes[target].toSwatch()} is ${mixResults[target]}`, t => {
		t.is(mixes[target].hex, mixResults[target])
	})
})
