/* ─────────╮
 │ trucolor │ Resolve Colour to simple RGB Array: [ r, g, b ]
 ╰──────────┴─────────────────────────────────────────────────────────────────── */
/* eslint complexity: 0 */

import _ from 'lodash'
import SGRcomposer from 'sgr-composer'
import terminal from 'term-ng'
import {readPackageSync} from 'read-pkg'

const pkg = readPackageSync()

const colorLevel = terminal.color.level || 0

export default function render(processor, options = {}) {
	const {
		format: outputFormat,
	} = options
	const color = processor.render()
	const isReset = ['normal', 'reset'].includes(processor.name)

	const sgrComposer = new SGRcomposer(
		options.force || colorLevel,
		Object.assign(processor.attrs, processor.hasSource ? {
			color: isReset ? processor.name : color.toRgbArray(),
		} : {}),
	)

	const fieldSelect = () => isReset || !processor.hasSource ? processor.name : false
	const stringSelect = () => isReset || !processor.hasSource ? '' : false

	const swatch = () => {
		if (colorLevel > 0) {
			const sgr = sgrComposer.sgr(['bold', 'italic', 'underline', 'invert'])
			return `${sgr.in}\u2588\u2588${sgr.out}`
		}

		return '$\u2588\u2588'
	}

	const colorOptions = (type => {
		switch (type) {
			case undefined:
				return {}
			case 'default':
				return pkg.config.cli[pkg.config.cli.selected]
			default:
				return pkg.config.cli[type]
		}
	})(global.trucolorCLItype)

	switch (outputFormat) {
		case 'cli':
			return {
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => stringSelect() || `${_.remove(
					_.map(processor.attrs, (active, attr) => active === true ? colorOptions[attr] : false),
				).join(' ')}${processor.hasAttrs ? ' ' : ''}${
					colorOptions.color === 'hex'
						? `${color.toHex()}`
						: `${color.toRgbArray().join(' ')}`
				}`,
				toSwatch: () => swatch(),
				...sgrComposer.sgr(),
			}
		case 'sgr':
			return {
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => stringSelect() || sgrComposer.sgr().in,
				toSwatch: () => swatch(),
				...sgrComposer.sgr(),
			}
		default:
			return {
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => fieldSelect() || color.toHex(),
				toSwatch: () => swatch(),
				...sgrComposer.sgr(),
			}
	}
}
