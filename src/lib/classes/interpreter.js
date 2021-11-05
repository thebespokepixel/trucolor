/* ─────────╮
 │ trucolor │ Resolve Colour to simple RGB Array: [ r, g, b ]
 ╰──────────┴─────────────────────────────────────────────────────────────────── */
/* eslint no-case-declarations:0, complexity: 0 */

import {tinycolor, names} from '@thebespokepixel/es-tinycolor'
import converter from 'color-convert'

class Interpreter {
	constructor(raw) {
		this.source = (raw_ => {
			switch (true) {
				case /^[\da-f]{3}$/i.test(raw_):
					return {
						input: /^([\da-f])([\da-f])([\da-f])$/i.exec(raw_),
						human: raw_,
						space: 'HEX',
					}

				case /^#[\da-f]{3}$/i.test(raw_):
					return {
						input: /^#([\da-f])([\da-f])([\da-f])$/i.exec(raw_),
						human: raw_,
						space: '#HEX',
					}

				case /^[\da-f]{4}$/i.test(raw_):
					return {
						input: /^([\da-f])([\da-f])([\da-f])[\da-f]$/i.exec(raw_),
						human: raw_,
						space: 'HEX',
					}

				case /^#[\da-f]{4}$/i.test(raw_):
					return {
						input: /^#([\da-f])([\da-f])([\da-f])[\da-f]$/i.exec(raw_),
						human: raw_,
						space: '#HEX',
					}

				case /^[\da-f]{6}$/i.test(raw_):
					return {
						input: raw_,
						human: raw_,
						space: 'HEXHEX',
					}

				case /^#[\da-f]{6}$/i.test(raw_):
					return {
						input: raw_,
						human: raw_,
						space: '#HEXHEX',
					}

				case /^[\da-f]{8}$/i.test(raw_):
					return {
						input: raw_.slice(0, 6),
						human: raw_.slice(0, 6),
						space: 'HEXHEX',
					}

				case /^#[\da-f]{8}$/i.test(raw_):
					return {
						input: raw_.slice(0, 7),
						human: raw_.slice(0, 7),
						space: '#HEXHEX',
					}

				case /^rgb[(:]+(?:\s?\d+,){2}\s?\d+\s?\)*$/.test(raw_):
					return {
						input: raw_.replace(/rgb[(:]/, '').replace(/[ )]/g, '').split(','),
						human: raw_.replace(/rgb[(:]/, 'rgb-').replace(/,/g, '-').replace(/[ )]/g, ''),
						space: 'RGB',
					}

				case /^hsl:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsl:/, '').split(','),
						human: raw_.replace('hsl:', 'hsl-').replace(/,/g, '-'),
						space: 'HSL',
					}

				case /^hsv:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsv:/, '').split(','),
						human: raw_.replace('hsv:', 'hsv-').replace(/,/g, '-'),
						space: 'HSV',
					}

				case /^hsb:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsb:/, '').split(','),
						human: raw_.replace('hsb:', 'hsb-').replace(/,/g, '-'),
						space: 'HSV',
					}

				case /^hwb:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hwb:/, '').split(','),
						human: raw_.replace('hwb:', 'hwb-').replace(/,/g, '-'),
						space: 'HWB',
					}

				case (raw_ in {
					normal: 'normal',
					reset: 'reset',
				}):
					return {
						input: raw_,
						human: raw_,
						space: 'SGR',
					}

				case (raw_ in names):
					return {
						input: raw_,
						human: raw_,
						space: 'named',
					}

				default:
					throw new Error(`Unrecognised color space: ${raw_}`)
			}
		})(raw)

		const source = (source => {
			switch (source.space) {
				case 'HEX':
				case '#HEX':
					const [input, r, g, b] = source.input
					return {
						name: `${r}${r}${g}${g}${b}${b}`,
						rgb: converter.hex.rgb(`${r}${r}${g}${g}${b}${b}`),
						input,
					}
				case 'HEXHEX':
				case '#HEXHEX':
					return {
						name: source.input,
						rgb: converter.hex.rgb(this.name),
					}
				case 'RGB':
					return {
						name: converter.rgb.hex(source.input),
						rgb: converter.hex.rgb(this.name),
					}
				case 'HSL':
					return {
						name: converter.hsl.hex(source.input),
						rgb: converter.hsl.rgb(source.input),
					}
				case 'HSV':
					return {
						name: converter.hsv.hex(source.input),
						rgb: converter.hsv.rgb(source.input),
					}
				case 'HWB':
					return {
						name: converter.hwb.hex(source.input),
						rgb: converter.hwb.rgb(source.input),
					}
				case 'SGR':
					return {
						name: source.input,
						rgb: source.input,
					}
				case 'named':
					return {
						name: converter.keyword.hex(source.input),
						rgb: converter.keyword.rgb(source.input),
					}
				default:
					throw new Error(`Unrecognised color space: ${source.space}`)
			}
		})(this.source)

		if (source.input) {
			this.source.input = source.input
		}

		this.baseName = source.name
		this.baseColor = source.space === 'SGR' ? source.name : tinycolor(source.rgb ? `rgb(${source.rgb})` : source.name)
	}

	get name() {
		return this.baseName
	}

	set name(n) {
		this.baseName = n
	}

	get rgb() {
		return this.baseColor
	}

	set rgb(rgb) {
		this.baseColor = tinycolor(rgb)
	}

	get input() {
		return this.source.input
	}

	get human() {
		return this.source.human
	}

	get space() {
		return this.source.space
	}

	toString() {
		return converter.rgb.hex(this.baseColor)
	}
}

export default function interpreter(raw) {
	return new Interpreter(raw)
}
