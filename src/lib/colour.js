/* ─────────╮
 │ trucolor │ Internal color handling, here for optimisation
 ╰──────────┴────────────────────────────────────────────────────────────────── */

import {simple, palette} from '..'
import deepAssign from 'deep-assign'
import {TemplateTag, replaceSubstitutionTransformer} from 'common-tags'

export const clr = deepAssign(simple(), palette({}, {
	bright: 'bold rgb(255,255,255)',
	dark: '#333'
}))

export const colorReplacer = new TemplateTag(
	replaceSubstitutionTransformer(
		/([a-zA-Z]+?)[:/|](.+)/,
		(match, colorName, content) => `${clr[colorName]}${content}${clr[colorName].out}`
	)
)
