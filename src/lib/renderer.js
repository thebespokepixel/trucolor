/* ─────────╮
 │ trucolor │ Resolve Colour to simple RGB Array: [ r, g, b ]
 ╰──────────┴─────────────────────────────────────────────────────────────────── */

import SGRcomposer from 'sgr-composer'
import terminal from 'term-ng'
// import {tinycolor} from '@thebespokepixel/es-tinycolor'
import {pkg} from '../index'

const colorLevel = terminal.color.level || 0
const colorOptionsSelected = pkg.config.cli.selected
const colorOptions = pkg.config.cli[colorOptionsSelected]

export default function render(processor, options = {}) {
	const color = processor.render()
	const isReset = ['normal', 'reset'].includes(processor.name)

	const sgrComposer = new SGRcomposer(
		options.force || colorLevel,
		Object.assign(processor.attrs, processor.hasSource ? {
			color: isReset ? processor.name : color.toRgbArray()
		} : {})
	)

	return Object.assign({
		hex: isReset || !processor.hasSource ? processor.name : color.toHex(),
		rgb: isReset || !processor.hasSource ? processor.name : color.toRgbString(),
		valueOf() {
			return sgrComposer.sgr().in
		},
		toString() {
			return isReset || !processor.hasSource ? processor.name : color.toHex()
		},
		toSwatch() {
			if (colorLevel > 0) {
				const sgr = sgrComposer.sgr(['bold', 'italic', 'underline', 'invert'])
				return `${sgr.in}\u2588\u2588${sgr.out}`
			}
			return `$\u2588\u2588`
		}
	}, sgrComposer.sgr())
}
