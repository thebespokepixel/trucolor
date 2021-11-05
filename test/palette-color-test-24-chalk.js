import test from 'ava'
import {chalkish, simple} from '../index.js'

const heading = '24bit palette via module'

const palette = chalkish(simple({force: 'millions'}))

const results = {
	white: '\u001B[38;2;187;187;187mwhite\u001B[39m',
	black: '\u001B[38;2;17;17;17mblack\u001B[39m',
	red: '\u001B[38;2;187;0;0mred\u001B[39m',
	green: '\u001B[38;2;0;187;0mgreen\u001B[39m',
	blue: '\u001B[38;2;68;68;187mblue\u001B[39m',
	cyan: '\u001B[38;2;0;187;187mcyan\u001B[39m',
	yellow: '\u001B[38;2;187;187;0myellow\u001B[39m',
	magenta: '\u001B[38;2;187;0;187mmagenta\u001B[39m',
	brightWhite: '\u001B[38;2;255;255;255mbrightWhite\u001B[39m',
	brightRed: '\u001B[38;2;255;51;51mbrightRed\u001B[39m',
	brightGreen: '\u001B[38;2;51;255;51mbrightGreen\u001B[39m',
	brightBlue: '\u001B[38;2;68;68;255mbrightBlue\u001B[39m',
	brightCyan: '\u001B[38;2;51;255;255mbrightCyan\u001B[39m',
	brightYellow: '\u001B[38;2;255;255;51mbrightYellow\u001B[39m',
	brightMagenta: '\u001B[38;2;255;51;255mbrightMagenta\u001B[39m',
	dim: '\u001B[2mdim\u001B[22m',
	bold: '\u001B[1mbold\u001B[22m',
	italic: '\u001B[3mitalic\u001B[23m',
	invert: '\u001B[7minvert\u001B[27m',
	example: '\u001B[38;2;204;153;255mexample\u001B[39m',
	command: '\u001B[38;2;49;160;255mcommand\u001B[39m',
	argument: '\u001B[38;2;125;195;255margument\u001B[39m',
	option: '\u001B[38;2;193;186;137moption\u001B[39m',
	operator: '\u001B[38;2;255;255;255moperator\u001B[39m',
	grey: '\u001B[38;2;128;128;128mgrey\u001B[39m',
	title: '\u001B[38;2;128;196;128;1mtitle\u001B[22;39m',
	normal: '\u001B[0mnormal\u001B[m',
	reset: '\u001B[0mreset\u001B[m',
}

for (const target of Object.keys(results)) {
	test(`${heading}: Chalkish : ${palette[target](target)} is ${target}`, t => {
		t.is(`${palette[target](target)}`, results[target])
	})
}

test(`${heading}: Chalkish : \u001B[37mwhite \u001B[31mred\u001B[37m white\u001B[39m`, t => {
	const result = palette.white('white ' + palette.red('red') + ' white')
	t.is(result, '\u001B[38;2;187;187;187mwhite \u001B[38;2;187;0;0mred\u001B[38;2;187;187;187m white\u001B[39m')
})

test(`${heading}: Chalkish : \u001B[34mblue \u001B[3mitalic\u001B[23m blue\u001B[39m`, t => {
	const result = palette.blue('blue ' + palette.italic('italic') + ' blue')
	t.is(result, '\u001B[38;2;68;68;187mblue \u001B[3mitalic\u001B[23m blue\u001B[39m')
})
