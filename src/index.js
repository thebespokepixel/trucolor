/* ─────────╮
 │ trucolor │ 24bit color tools for the command line
 ╰──────────┴─────────────────────────────────────────────────────────────────── */

import {resolve} from 'path'
import _ from 'lodash'
import readPkg from 'read-pkg'
import {createConsole} from 'verbosity'
// import {stripIndent} from 'common-tags'
import meta from '@thebespokepixel/meta'
import parse from './lib/parser'
import render from './lib/renderer'
import chalk from './lib/classes/chalkish'
import simplePalette from './lib/palettes/simple'

export const console = createConsole({outStream: process.stderr})
export const pkg = readPkg.sync(resolve(__dirname, '..'))
export const metadata = meta(__dirname)

export function trucolor(color, options = {}) {
	const queue = parse(color)
	if (queue.length > 1) {
		return queue.map(color => render(color, options))
	}
	return render(queue[0], options)
}

export function palette(options, palette) {
	return _.mapValues(palette, color => trucolor(color, options))
}

export function simple(options) {
	return palette(options, simplePalette)
}

export function chalkish(palette) {
	return chalk(palette)
}

export {parse, render}
