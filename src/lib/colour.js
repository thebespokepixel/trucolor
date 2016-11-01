/* ─────────╮
 │ trucolor │ Internal color handling, here for optimisation
 ╰──────────┴────────────────────────────────────────────────────────────────── */
import _ from 'lodash'
import terminalFeatures from 'term-ng'
import {simple, palette} from '..'
import deepAssign from 'deep-assign'
import {TemplateTag, replaceSubstitutionTransformer} from 'common-tags'

export const clr = deepAssign(simple({
	format: 'sgr'
}), palette({
	format: 'sgr'
}, {
	purple: 'purple',
	purpleSwatch: 'purple desaturate 70',
	orange: 'hsb:45,100,100',
	orangeSwatch: 'hsb:45,100,100 desaturate 70',
	red: 'red lighten 10',
	green: 'green lighten 10',
	blue: 'blue lighten 20',
	hotpink: 'hotpink',
	chocolate: 'chocolate',
	dark: 'red desaturate 100 darken 20',
	msat: 'red desaturate 60',
	mlight: 'rgb(255,255,255) darken 25',
	bright: 'rgb(255,255,255)',
	bob: 'black lighten 50 saturate 50 spin 180',
	ul: 'underline',
	invert: 'invert',
	exBackground: 'background dark red',
	exBold: 'bold yellow',
	exFaint: 'faint yellow',
	exItalic: 'italic #33FF33',
	exInvert: 'invert #7B00B1',
	exUnderline: 'underline #fff',
	exBlink: 'blink orange'
}))

export const colorReplacer = new TemplateTag(
	replaceSubstitutionTransformer(
		/([a-zA-Z]+?)[:/|](.+)/,
		(match, colorName, content) => `${clr[colorName]}${content}${clr[colorName].out}`
	)
)

export function spectrum(width, char) {
	if (terminalFeatures.color.has16m) {
		return _.map(Array(width), (val, col) => {
			const scos = Math.cos((col / width) * (Math.PI / 2))
			const ssin = Math.sin((col / width) * (Math.PI))
			const red = (scos > 0) ? Math.floor(scos * 255) : 0
			const green = (ssin > 0) ? Math.floor(ssin * 255) : 0
			const blue = (scos > 0) ? Math.floor((1 - scos) * 255) : 0
			return `\u001b[38;2;${red};${green};${blue}m${char}`
		}).join('')
	}
	return `${char.repeat(width)}\n${clr.red.in}  Your terminal currently doesn't support 24 bit color.`
}
