import test from 'ava'
import {simple} from '..'

const heading = `8bit palette via module`

const palette = simple({force: '256'})

const results = {
	white: ['#BBB', '\u001b[38;5;249m', '\u001b[39m'],
	black: ['#111', '\u001b[38;5;233m', '\u001b[39m'],
	red: ['#B00', '\u001b[38;5;160m', '\u001b[39m'],
	green: ['#0B0', '\u001b[38;5;40m', '\u001b[39m'],
	blue: ['#44B', '\u001b[38;5;62m', '\u001b[39m'],
	cyan: ['#0BB', '\u001b[38;5;44m', '\u001b[39m'],
	yellow: ['#BB0', '\u001b[38;5;184m', '\u001b[39m'],
	magenta: ['#B0B', '\u001b[38;5;164m', '\u001b[39m'],
	brightWhite: ['#FFF', '\u001b[38;5;231m', '\u001b[39m'],
	brightRed: ['#F33', '\u001b[38;5;203m', '\u001b[39m'],
	brightGreen: ['#3F3', '\u001b[38;5;83m', '\u001b[39m'],
	brightBlue: ['#44F', '\u001b[38;5;63m', '\u001b[39m'],
	brightCyan: ['#3FF', '\u001b[38;5;87m', '\u001b[39m'],
	brightYellow: ['#FF3', '\u001b[38;5;227m', '\u001b[39m'],
	brightMagenta: ['#F3F', '\u001b[38;5;207m', '\u001b[39m'],
	dim: ['dim', '\u001b[2m', '\u001b[22m'],
	bold: ['bold', '\u001b[1m', '\u001b[22m'],
	italic: ['italic', '\u001b[3m', '\u001b[23m'],
	invert: ['invert', '\u001b[7m', '\u001b[27m'],
	example: ['#CC99FF', '\u001b[38;5;183m', '\u001b[39m'],
	command: ['#31A0FF', '\u001b[38;5;75m', '\u001b[39m'],
	argument: ['#7DC3FF', '\u001b[38;5;117m', '\u001b[39m'],
	option: ['#C1BA89', '\u001b[38;5;187m', '\u001b[39m'],
	operator: ['#FFFFFF', '\u001b[38;5;231m', '\u001b[39m'],
	grey: ['#808080', '\u001b[38;5;244m', '\u001b[39m'],
	title: ['bold #80C480', '\u001b[38;5;151;1m', '\u001b[22;39m'],
	normal: ['normal', '\u001b[0m', '\u001b[m'],
	reset: ['reset', '\u001b[0m', '\u001b[m']
}

Object.keys(results).forEach(target => {
	test(`${heading}: Palette : ${palette[target].toSwatch()} is ${results[target][0]}`, t => {
		t.is(palette[target].in, results[target][1])
		t.is(palette[target].out, results[target][2])
	})
})
