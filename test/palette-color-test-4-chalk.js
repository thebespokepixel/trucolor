import test from 'ava'
import {chalkish, simple} from '..'

const heading = `4bit palette via module`

const palette = chalkish(simple({force: 'color'}))

const results = {
	white: '\u001B[37mwhite\u001B[39m',
	black: '\u001B[30mblack\u001B[39m',
	red: '\u001B[31mred\u001B[39m',
	green: '\u001B[32mgreen\u001B[39m',
	blue: '\u001B[34mblue\u001B[39m',
	cyan: '\u001B[36mcyan\u001B[39m',
	yellow: '\u001B[33myellow\u001B[39m',
	magenta: '\u001B[35mmagenta\u001B[39m',
	brightWhite: '\u001B[97mbrightWhite\u001B[39m',
	brightRed: '\u001B[91mbrightRed\u001B[39m',
	brightGreen: '\u001B[92mbrightGreen\u001B[39m',
	brightBlue: '\u001B[94mbrightBlue\u001B[39m',
	brightCyan: '\u001B[96mbrightCyan\u001B[39m',
	brightYellow: '\u001B[93mbrightYellow\u001B[39m',
	brightMagenta: '\u001B[95mbrightMagenta\u001B[39m',
	dim: '\u001B[2mdim\u001B[22m',
	bold: '\u001B[1mbold\u001B[22m',
	italic: '\u001B[3mitalic\u001B[23m',
	invert: '\u001B[7minvert\u001B[27m',
	example: '\u001B[97mexample\u001B[39m',
	command: '\u001B[96mcommand\u001B[39m',
	argument: '\u001B[96margument\u001B[39m',
	option: '\u001B[97moption\u001B[39m',
	operator: '\u001B[97moperator\u001B[39m',
	grey: '\u001B[37mgrey\u001B[39m',
	title: '\u001B[97;1mtitle\u001B[22;39m',
	normal: '\u001B[0mnormal\u001B[m',
	reset: '\u001B[0mreset\u001B[m'
}

Object.keys(results).forEach(target => {
	test(`${heading}: Chalkish : ${palette[target](target)} is ${target}`, t => {
		t.is(`${palette[target](target)}`, results[target])
	})
})

test(`${heading}: Chalkish : \u001B[37mwhite \u001B[31mred\u001B[37m white\u001B[39m`, t => {
	const str = palette.white('white ' + palette.red('red') + ' white')
	t.is(str, '\u001B[37mwhite \u001B[31mred\u001B[37m white\u001B[39m')
})

test(`${heading}: Chalkish : \u001B[34mblue \u001B[3mitalic\u001B[23m blue\u001B[39m`, t => {
	const str = palette.blue('blue ' + palette.italic('italic') + ' blue')
	t.is(str, '\u001B[34mblue \u001B[3mitalic\u001B[23m blue\u001B[39m')
})
