/* ─────────╮
 │ trucolor │ Chalk-style nested functions
 ╰──────────┴─────────────────────────────────────────────────────────────────── */
/* eslint no-proto:0 */

import escStringRE from 'escape-string-regexp'

class Chalkish {
	constructor(styles) {
		const styleFactory = (collection => {
			for (const key of Object.keys(styles)) {
				styles[key].closeRE = new RegExp(escStringRE(styles[key].out), 'g')
				collection[key] = {
					get: () => makePainter.call([...this._styles, ...key]),
				}
			}

			return collection
		})({})

		const proto = Object.defineProperties(() => {}, styleFactory)

		function applyPaint(content) {
			let i = this._styles.length
			while (i--) {
				const sgrPair = styles[this._styles[i]]
				content = sgrPair.in + content.replace(sgrPair.closeRE, sgrPair.in) + sgrPair.out
			}

			return content
		}

		function makePainter(styles) {
			const painter = (...args) => applyPaint.apply(painter, args)
			painter._styles = styles
			painter.__proto__ = proto
			return painter
		}

		Object.defineProperties(Chalkish.prototype, (collection => {
			for (const name of Object.keys(styles)) {
				collection[name] = {
					get: () => makePainter.call(this, [name]),
				}
			}

			return collection
		})({}))
	}
}

export default function chalk(palette) {
	return new Chalkish(palette)
}
