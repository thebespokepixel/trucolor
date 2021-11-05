import test from 'ava'
import {chalkish, simple} from '../index.js'

const heading = '8bit palette via module'

const palette = chalkish(simple({force: '256'}))

const results = {
	white: '\u001B[38;5;249mwhite\u001B[39m',
	black: '\u001B[38;5;233mblack\u001B[39m',
	red: '\u001B[38;5;160mred\u001B[39m',
	green: '\u001B[38;5;40mgreen\u001B[39m',
	blue: '\u001B[38;5;62mblue\u001B[39m',
	cyan: '\u001B[38;5;44mcyan\u001B[39m',
	yellow: '\u001B[38;5;184myellow\u001B[39m',
	magenta: '\u001B[38;5;164mmagenta\u001B[39m',
	brightWhite: '\u001B[38;5;231mbrightWhite\u001B[39m',
	brightRed: '\u001B[38;5;203mbrightRed\u001B[39m',
	brightGreen: '\u001B[38;5;83mbrightGreen\u001B[39m',
	brightBlue: '\u001B[38;5;63mbrightBlue\u001B[39m',
	brightCyan: '\u001B[38;5;87mbrightCyan\u001B[39m',
	brightYellow: '\u001B[38;5;227mbrightYellow\u001B[39m',
	brightMagenta: '\u001B[38;5;207mbrightMagenta\u001B[39m',
	dim: '\u001B[2mdim\u001B[22m',
	bold: '\u001B[1mbold\u001B[22m',
	italic: '\u001B[3mitalic\u001B[23m',
	invert: '\u001B[7minvert\u001B[27m',
	example: '\u001B[38;5;183mexample\u001B[39m',
	command: '\u001B[38;5;75mcommand\u001B[39m',
	argument: '\u001B[38;5;117margument\u001B[39m',
	option: '\u001B[38;5;187moption\u001B[39m',
	operator: '\u001B[38;5;231moperator\u001B[39m',
	grey: '\u001B[38;5;244mgrey\u001B[39m',
	title: '\u001B[38;5;151;1mtitle\u001B[22;39m',
	normal: '\u001B[0mnormal\u001B[m',
	reset: '\u001B[0mreset\u001B[m',
}

for (const target of Object.keys(results)) {
	test(`${heading}: Chalkish : ${palette[target](target)} is ${target}`, t => {
		t.is(`${palette[target](target)}`, results[target])
	})
}

test(`${heading}: Chalkish : \u001B[38;5;249mwhite \u001B[38;5;160mred\u001B[38;5;249m white\u001B[39m`, t => {
	const result = palette.white('white ' + palette.red('red') + ' white')
	t.is(result, '\u001B[38;5;249mwhite \u001B[38;5;160mred\u001B[38;5;249m white\u001B[39m')
})

test(`${heading}: Chalkish : \u001B[38;5;62mblue \u001B[3mitalic\u001B[23m blue\u001B[39m`, t => {
	const result = palette.blue('blue ' + palette.italic('italic') + ' blue')
	t.is(result, '\u001B[38;5;62mblue \u001B[3mitalic\u001B[23m blue\u001B[39m')
})
