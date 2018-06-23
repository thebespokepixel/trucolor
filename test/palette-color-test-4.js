import test from 'ava'
import {simple} from '..'

const heading = `4bit palette via module`

const palette = simple({force: 'color'})

const results = {
	white: ['#BBB', '\u001B[37m', '\u001B[39m'],
	black: ['#111', '\u001B[30m', '\u001B[39m'],
	red: ['#B00', '\u001B[31m', '\u001B[39m'],
	green: ['#0B0', '\u001B[32m', '\u001B[39m'],
	blue: ['#44B', '\u001B[34m', '\u001B[39m'],
	cyan: ['#0BB', '\u001B[36m', '\u001B[39m'],
	yellow: ['#BB0', '\u001B[33m', '\u001B[39m'],
	magenta: ['#B0B', '\u001B[35m', '\u001B[39m'],
	brightWhite: ['#FFF', '\u001B[97m', '\u001B[39m'],
	brightRed: ['#F33', '\u001B[91m', '\u001B[39m'],
	brightGreen: ['#3F3', '\u001B[92m', '\u001B[39m'],
	brightBlue: ['#44F', '\u001B[94m', '\u001B[39m'],
	brightCyan: ['#3FF', '\u001B[96m', '\u001B[39m'],
	brightYellow: ['#FF3', '\u001B[93m', '\u001B[39m'],
	brightMagenta: ['#F3F', '\u001B[95m', '\u001B[39m'],
	dim: ['dim', '\u001B[2m', '\u001B[22m'],
	bold: ['bold', '\u001B[1m', '\u001B[22m'],
	italic: ['italic', '\u001B[3m', '\u001B[23m'],
	invert: ['invert', '\u001B[7m', '\u001B[27m'],
	example: ['#CC99FF', '\u001B[97m', '\u001B[39m'],
	command: ['#31A0FF', '\u001B[96m', '\u001B[39m'],
	argument: ['#7DC3FF', '\u001B[96m', '\u001B[39m'],
	option: ['#C1BA89', '\u001B[97m', '\u001B[39m'],
	operator: ['#FFFFFF', '\u001B[97m', '\u001B[39m'],
	grey: ['#808080', '\u001B[37m', '\u001B[39m'],
	title: ['bold #80C480', '\u001B[97;1m', '\u001B[22;39m'],
	normal: ['normal', '\u001B[0m', '\u001B[m'],
	reset: ['reset', '\u001B[0m', '\u001B[m']
}

Object.keys(results).forEach(target => {
	test(`${heading}: Palette : ${palette[target].toSwatch()} is ${results[target][0]}`, t => {
		t.is(palette[target].in, results[target][1])
		t.is(palette[target].out, results[target][2])
	})
})
