/* ─────────╮
 │ trucolor │ Command parser
 ╰──────────┴─────────────────────────────────────────────────────────────────── */
/* eslint complexity: 0 */

import createProcessor from './classes/processor.js'
import createInterpreter from './classes/interpreter.js'

let currentAutoName = 1

export default function parser(color) {
	const queue = []
	let processor = createProcessor(`color_${currentAutoName++}`)
	const refreshProcessor = processor_ => {
		if (processor_.hasSource) {
			queue.push(processor_)
			return createProcessor(`color_${currentAutoName++}`)
		}

		return processor_
	}

	const tokens = color.split(' ')

	while (tokens.length > 0) {
		const token = tokens.shift()
		switch (token) {
			// Character types
			case 'background':
				processor.background()
				break
			case 'bold':
				processor.bold()
				break
			case 'faint':
				processor.dim()
				break
			case 'dim':
				processor.dim()
				break
			case 'italic':
				processor.italic()
				break
			case 'invert':
				processor.invert()
				break
			case 'underline':
				processor.underline()
				break
			case 'blink':
				processor.blink()
				break

			// Colour processes
			case 'saturate':
			case 'sat':
				processor.saturate({
					percent: tokens.shift(),
				})
				break
			case 'desaturate':
			case 'desat':
				processor.desaturate({
					percent: tokens.shift(),
				})
				break
			case 'light':
				processor.lighten({
					percent: 20,
				})
				break
			case 'dark':
				processor.darken({
					percent: 20,
				})
				break
			case 'lighten':
				processor.lighten({
					percent: tokens.shift(),
				})
				break
			case 'darken':
				processor.darken({
					percent: tokens.shift(),
				})
				break
			case 'spin':
				processor.spin({
					rotation: tokens.shift(),
				})
				break
			case 'mono':
				processor.mono()
				break
			case 'mix':
				processor.mix({
					color: tokens.shift(),
				})
				break
			default:
				if (/^[\w-]+:$/.test(token)) {
					processor = refreshProcessor(processor)
					processor.lock(token.trim().replace(':', ''))
				} else {
					processor = refreshProcessor(processor)
					processor.source = createInterpreter(token)
				}
		}
	}

	queue.push(processor)
	return queue
}
