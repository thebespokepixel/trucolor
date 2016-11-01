import test from 'ava'
import {simple} from '..'

const heading = `4bit palette via module`

const palette = simple({force: 'color'})

const results = {
	white: ['#BBB', '\u001b[37m', '\u001b[39m'],
	black: ['#111', '\u001b[30m', '\u001b[39m'],
	red: ['#B00', '\u001b[31m', '\u001b[39m'],
	green: ['#0B0', '\u001b[32m', '\u001b[39m'],
	blue: ['#44B', '\u001b[34m', '\u001b[39m'],
	cyan: ['#0BB', '\u001b[36m', '\u001b[39m'],
	yellow: ['#BB0', '\u001b[33m', '\u001b[39m'],
	magenta: ['#B0B', '\u001b[35m', '\u001b[39m'],
	brightWhite: ['#FFF', '\u001b[97m', '\u001b[39m'],
	brightRed: ['#F33', '\u001b[91m', '\u001b[39m'],
	brightGreen: ['#3F3', '\u001b[92m', '\u001b[39m'],
	brightBlue: ['#44F', '\u001b[94m', '\u001b[39m'],
	brightCyan: ['#3FF', '\u001b[96m', '\u001b[39m'],
	brightYellow: ['#FF3', '\u001b[93m', '\u001b[39m'],
	brightMagenta: ['#F3F', '\u001b[95m', '\u001b[39m'],
	dim: ['dim', '\u001b[2m', '\u001b[22m'],
	bold: ['bold', '\u001b[1m', '\u001b[22m'],
	italic: ['italic', '\u001b[3m', '\u001b[23m'],
	invert: ['invert', '\u001b[7m', '\u001b[27m'],
	example: ['#CC99FF', '\u001b[97m', '\u001b[39m'],
	command: ['#31A0FF', '\u001b[96m', '\u001b[39m'],
	argument: ['#7DC3FF', '\u001b[96m', '\u001b[39m'],
	option: ['#C1BA89', '\u001b[97m', '\u001b[39m'],
	operator: ['#FFFFFF', '\u001b[97m', '\u001b[39m'],
	grey: ['#808080', '\u001b[37m', '\u001b[39m'],
	title: ['bold #80C480', '\u001b[97;1m', '\u001b[22;39m'],
	normal: ['normal', '\u001b[0m', '\u001b[m'],
	reset: ['reset', '\u001b[0m', '\u001b[m']
}

Object.keys(results).forEach(target => {
	test(`${heading}: Palette : ${palette[target].toSwatch()} is ${results[target][0]}`, t => {
		t.is(palette[target].in, results[target][1])
		t.is(palette[target].out, results[target][2])
	})
})
