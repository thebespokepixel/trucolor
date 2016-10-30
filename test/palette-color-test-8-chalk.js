import test from 'ava'
import {chalkish, simple} from '..'

const heading = `8bit palette via module`

const palette = chalkish(simple({force: '256'}))

const results = {
	white: '\u001b[38;5;249mwhite\u001b[39m',
	black: '\u001b[38;5;233mblack\u001b[39m',
	red: '\u001b[38;5;160mred\u001b[39m',
	green: '\u001b[38;5;40mgreen\u001b[39m',
	blue: '\u001b[38;5;62mblue\u001b[39m',
	cyan: '\u001b[38;5;44mcyan\u001b[39m',
	yellow: '\u001b[38;5;184myellow\u001b[39m',
	magenta: '\u001b[38;5;164mmagenta\u001b[39m',
	brightWhite: '\u001b[38;5;231mbrightWhite\u001b[39m',
	brightRed: '\u001b[38;5;203mbrightRed\u001b[39m',
	brightGreen: '\u001b[38;5;83mbrightGreen\u001b[39m',
	brightBlue: '\u001b[38;5;63mbrightBlue\u001b[39m',
	brightCyan: '\u001b[38;5;87mbrightCyan\u001b[39m',
	brightYellow: '\u001b[38;5;227mbrightYellow\u001b[39m',
	brightMagenta: '\u001b[38;5;207mbrightMagenta\u001b[39m',
	dim: '\u001b[2mdim\u001b[22m',
	bold: '\u001b[1mbold\u001b[22m',
	italic: '\u001b[3mitalic\u001b[23m',
	invert: '\u001b[7minvert\u001b[27m',
	example: '\u001b[38;5;183mexample\u001b[39m',
	command: '\u001b[38;5;75mcommand\u001b[39m',
	argument: '\u001b[38;5;117margument\u001b[39m',
	option: '\u001b[38;5;187moption\u001b[39m',
	operator: '\u001b[38;5;231moperator\u001b[39m',
	grey: '\u001b[38;5;244mgrey\u001b[39m',
	title: '\u001b[38;5;151;1mtitle\u001b[22;39m',
	normal: '\u001b[0mnormal\u001b[m',
	reset: '\u001b[0mreset\u001b[m'
}

Object.keys(results).forEach(target => {
	test(`${heading}: Chalkish : ${palette[target](target)} is ${target}`, t => {
		t.is(`${palette[target](target)}`, results[target])
	})
})

test(`${heading}: Chalkish : \u001b[38;5;249mwhite \u001b[38;5;160mred\u001b[38;5;249m white\u001b[39m`, t => {
	const str = palette.white('white ' + palette.red('red') + ' white')
	t.is(str, '\u001b[38;5;249mwhite \u001b[38;5;160mred\u001b[38;5;249m white\u001b[39m')
})

test(`${heading}: Chalkish : \u001b[38;5;62mblue \u001b[3mitalic\u001b[23m blue\u001b[39m`, t => {
	const str = palette.blue('blue ' + palette.italic('italic') + ' blue')
	t.is(str, '\u001b[38;5;62mblue \u001b[3mitalic\u001b[23m blue\u001b[39m')
})
