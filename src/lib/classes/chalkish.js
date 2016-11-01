/* ─────────╮
 │ trucolor │ Chalk-style nested functions
 ╰──────────┴─────────────────────────────────────────────────────────────────── */

import escStringRE from 'escape-string-regexp'

class Chalkish {
	constructor(styles) {
		const styleFactory = (collection => {
			Object.keys(styles).forEach(key => {
				styles[key].closeRE = new RegExp(escStringRE(styles[key].out), 'g')
				collection[key] = {
					get: () => makePainter.call(this._styles.concat(key))
				}
			})
			return collection
		})({})

		const proto = Object.defineProperties(function () {}, styleFactory)

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

			/* eslint-disable no-proto */
			painter.__proto__ = proto
			return painter
		}

		Object.defineProperties(Chalkish.prototype, (collection => {
			Object.keys(styles).forEach(name => {
				collection[name] = {
					get: () => makePainter.call(this, [name])
				}
			})
			return collection
		})({}))
	}
}

export default function chalk(palette) {
	return new Chalkish(palette)
}
