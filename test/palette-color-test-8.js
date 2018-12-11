import test from 'ava'
import {simple} from '..'

const heading = '8bit palette via module'

const palette = simple({force: '256'})

const results = {
	white: ['#BBB', '\u001B[38;5;249m', '\u001B[39m'],
	black: ['#111', '\u001B[38;5;233m', '\u001B[39m'],
	red: ['#B00', '\u001B[38;5;160m', '\u001B[39m'],
	green: ['#0B0', '\u001B[38;5;40m', '\u001B[39m'],
	blue: ['#44B', '\u001B[38;5;62m', '\u001B[39m'],
	cyan: ['#0BB', '\u001B[38;5;44m', '\u001B[39m'],
	yellow: ['#BB0', '\u001B[38;5;184m', '\u001B[39m'],
	magenta: ['#B0B', '\u001B[38;5;164m', '\u001B[39m'],
	brightWhite: ['#FFF', '\u001B[38;5;231m', '\u001B[39m'],
	brightRed: ['#F33', '\u001B[38;5;203m', '\u001B[39m'],
	brightGreen: ['#3F3', '\u001B[38;5;83m', '\u001B[39m'],
	brightBlue: ['#44F', '\u001B[38;5;63m', '\u001B[39m'],
	brightCyan: ['#3FF', '\u001B[38;5;87m', '\u001B[39m'],
	brightYellow: ['#FF3', '\u001B[38;5;227m', '\u001B[39m'],
	brightMagenta: ['#F3F', '\u001B[38;5;207m', '\u001B[39m'],
	dim: ['dim', '\u001B[2m', '\u001B[22m'],
	bold: ['bold', '\u001B[1m', '\u001B[22m'],
	italic: ['italic', '\u001B[3m', '\u001B[23m'],
	invert: ['invert', '\u001B[7m', '\u001B[27m'],
	example: ['#CC99FF', '\u001B[38;5;183m', '\u001B[39m'],
	command: ['#31A0FF', '\u001B[38;5;75m', '\u001B[39m'],
	argument: ['#7DC3FF', '\u001B[38;5;117m', '\u001B[39m'],
	option: ['#C1BA89', '\u001B[38;5;187m', '\u001B[39m'],
	operator: ['#FFFFFF', '\u001B[38;5;231m', '\u001B[39m'],
	grey: ['#808080', '\u001B[38;5;244m', '\u001B[39m'],
	title: ['bold #80C480', '\u001B[38;5;151;1m', '\u001B[22;39m'],
	normal: ['normal', '\u001B[0m', '\u001B[m'],
	reset: ['reset', '\u001B[0m', '\u001B[m']
}

Object.keys(results).forEach(target => {
	test(`${heading}: Palette : ${palette[target].toSwatch()} is ${results[target][0]}`, t => {
		t.is(palette[target].in, results[target][1])
		t.is(palette[target].out, results[target][2])
	})
})
