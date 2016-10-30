import test from 'ava'
import {chalkish, simple} from '..'

const heading = `4bit palette via module`

const palette = chalkish(simple({force: 'color'}))

const results = {
	white: '\u001b[37mwhite\u001b[39m',
	black: '\u001b[30mblack\u001b[39m',
	red: '\u001b[31mred\u001b[39m',
	green: '\u001b[32mgreen\u001b[39m',
	blue: '\u001b[34mblue\u001b[39m',
	cyan: '\u001b[36mcyan\u001b[39m',
	yellow: '\u001b[33myellow\u001b[39m',
	magenta: '\u001b[35mmagenta\u001b[39m',
	brightWhite: '\u001b[97mbrightWhite\u001b[39m',
	brightRed: '\u001b[91mbrightRed\u001b[39m',
	brightGreen: '\u001b[92mbrightGreen\u001b[39m',
	brightBlue: '\u001b[94mbrightBlue\u001b[39m',
	brightCyan: '\u001b[96mbrightCyan\u001b[39m',
	brightYellow: '\u001b[93mbrightYellow\u001b[39m',
	brightMagenta: '\u001b[95mbrightMagenta\u001b[39m',
	dim: '\u001b[2mdim\u001b[22m',
	bold: '\u001b[1mbold\u001b[22m',
	italic: '\u001b[3mitalic\u001b[23m',
	invert: '\u001b[7minvert\u001b[27m',
	example: '\u001b[97mexample\u001b[39m',
	command: '\u001b[96mcommand\u001b[39m',
	argument: '\u001b[96margument\u001b[39m',
	option: '\u001b[97moption\u001b[39m',
	operator: '\u001b[97moperator\u001b[39m',
	grey: '\u001b[37mgrey\u001b[39m',
	title: '\u001b[97;1mtitle\u001b[22;39m',
	normal: '\u001b[0mnormal\u001b[m',
	reset: '\u001b[0mreset\u001b[m'
}

Object.keys(results).forEach(target => {
	test(`${heading}: Chalkish : ${palette[target](target)} is ${target}`, t => {
		t.is(`${palette[target](target)}`, results[target])
	})
})

test(`${heading}: Chalkish : \u001b[37mwhite \u001b[31mred\u001b[37m white\u001b[39m`, t => {
	const str = palette.white('white ' + palette.red('red') + ' white')
	t.is(str, '\u001b[37mwhite \u001b[31mred\u001b[37m white\u001b[39m')
})

test(`${heading}: Chalkish : \u001b[34mblue \u001b[3mitalic\u001b[23m blue\u001b[39m`, t => {
	const str = palette.blue('blue ' + palette.italic('italic') + ' blue')
	t.is(str, '\u001b[34mblue \u001b[3mitalic\u001b[23m blue\u001b[39m')
})
