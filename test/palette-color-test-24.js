import test from 'ava'
import {simple} from '..'

const heading = `24bit palette via module`

const palette = simple({force: 'millions'})

const results = {
	white: ['#BBB', '\u001b[38;2;187;187;187m', '\u001b[39m'],
	black: ['#111', '\u001b[38;2;17;17;17m', '\u001b[39m'],
	red: ['#B00', '\u001b[38;2;187;0;0m', '\u001b[39m'],
	green: ['#0B0', '\u001b[38;2;0;187;0m', '\u001b[39m'],
	blue: ['#44B', '\u001b[38;2;68;68;187m', '\u001b[39m'],
	cyan: ['#0BB', '\u001b[38;2;0;187;187m', '\u001b[39m'],
	yellow: ['#BB0', '\u001b[38;2;187;187;0m', '\u001b[39m'],
	magenta: ['#B0B', '\u001b[38;2;187;0;187m', '\u001b[39m'],
	brightWhite: ['#FFF', '\u001b[38;2;255;255;255m', '\u001b[39m'],
	brightRed: ['#F33', '\u001b[38;2;255;51;51m', '\u001b[39m'],
	brightGreen: ['#3F3', '\u001b[38;2;51;255;51m', '\u001b[39m'],
	brightBlue: ['#44F', '\u001b[38;2;68;68;255m', '\u001b[39m'],
	brightCyan: ['#3FF', '\u001b[38;2;51;255;255m', '\u001b[39m'],
	brightYellow: ['#FF3', '\u001b[38;2;255;255;51m', '\u001b[39m'],
	brightMagenta: ['#F3F', '\u001b[38;2;255;51;255m', '\u001b[39m'],
	dim: ['dim', '\u001b[2m', '\u001b[22m'],
	bold: ['bold', '\u001b[1m', '\u001b[22m'],
	italic: ['italic', '\u001b[3m', '\u001b[23m'],
	invert: ['invert', '\u001b[7m', '\u001b[27m'],
	example: ['#CC99FF', '\u001b[38;2;204;153;255m', '\u001b[39m'],
	command: ['#31A0FF', '\u001b[38;2;49;160;255m', '\u001b[39m'],
	argument: ['#7DC3FF', '\u001b[38;2;125;195;255m', '\u001b[39m'],
	option: ['#C1BA89', '\u001b[38;2;193;186;137m', '\u001b[39m'],
	operator: ['#FFFFFF', '\u001b[38;2;255;255;255m', '\u001b[39m'],
	grey: ['#808080', '\u001b[38;2;128;128;128m', '\u001b[39m'],
	title: ['bold #80C480', '\u001b[38;2;128;196;128;1m', '\u001b[22;39m'],
	normal: ['normal', '\u001b[0m', '\u001b[m'],
	reset: ['reset', '\u001b[0m', '\u001b[m']
}

Object.keys(results).forEach(target => {
	test(`${heading}: Palette : ${palette[target].toSwatch()} is ${results[target][0]}`, t => {
		t.is(palette[target].in, results[target][1])
		t.is(palette[target].out, results[target][2])
	})
})
