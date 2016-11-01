import test from 'ava'
import {chalkish, simple} from '..'

const heading = `24bit palette via module`

const palette = chalkish(simple({force: 'millions'}))

const results = {
	white: '\u001b[38;2;187;187;187mwhite\u001b[39m',
	black: '\u001b[38;2;17;17;17mblack\u001b[39m',
	red: '\u001b[38;2;187;0;0mred\u001b[39m',
	green: '\u001b[38;2;0;187;0mgreen\u001b[39m',
	blue: '\u001b[38;2;68;68;187mblue\u001b[39m',
	cyan: '\u001b[38;2;0;187;187mcyan\u001b[39m',
	yellow: '\u001b[38;2;187;187;0myellow\u001b[39m',
	magenta: '\u001b[38;2;187;0;187mmagenta\u001b[39m',
	brightWhite: '\u001b[38;2;255;255;255mbrightWhite\u001b[39m',
	brightRed: '\u001b[38;2;255;51;51mbrightRed\u001b[39m',
	brightGreen: '\u001b[38;2;51;255;51mbrightGreen\u001b[39m',
	brightBlue: '\u001b[38;2;68;68;255mbrightBlue\u001b[39m',
	brightCyan: '\u001b[38;2;51;255;255mbrightCyan\u001b[39m',
	brightYellow: '\u001b[38;2;255;255;51mbrightYellow\u001b[39m',
	brightMagenta: '\u001b[38;2;255;51;255mbrightMagenta\u001b[39m',
	dim: '\u001b[2mdim\u001b[22m',
	bold: '\u001b[1mbold\u001b[22m',
	italic: '\u001b[3mitalic\u001b[23m',
	invert: '\u001b[7minvert\u001b[27m',
	example: '\u001b[38;2;204;153;255mexample\u001b[39m',
	command: '\u001b[38;2;49;160;255mcommand\u001b[39m',
	argument: '\u001b[38;2;125;195;255margument\u001b[39m',
	option: '\u001b[38;2;193;186;137moption\u001b[39m',
	operator: '\u001b[38;2;255;255;255moperator\u001b[39m',
	grey: '\u001b[38;2;128;128;128mgrey\u001b[39m',
	title: '\u001b[38;2;128;196;128;1mtitle\u001b[22;39m',
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
	t.is(str, '\u001b[38;2;187;187;187mwhite \u001b[38;2;187;0;0mred\u001b[38;2;187;187;187m white\u001b[39m')
})

test(`${heading}: Chalkish : \u001b[34mblue \u001b[3mitalic\u001b[23m blue\u001b[39m`, t => {
	const str = palette.blue('blue ' + palette.italic('italic') + ' blue')
	t.is(str, '\u001b[38;2;68;68;187mblue \u001b[3mitalic\u001b[23m blue\u001b[39m')
})
