/* ─────────╮
 │ trucolor │ 24bit color tools for the command line
 ╰──────────┴─────────────────────────────────────────────────────────────────── */

import {resolve} from 'path'
import _ from 'lodash'
import readPkg from 'read-pkg'
import {createConsole} from 'verbosity'
import meta from '@thebespokepixel/meta'
import parse from './lib/parser'
import render from './lib/renderer'
import chalk from './lib/classes/chalkish'
import simplePalette from './lib/palettes/simple'

export const console = createConsole({outStream: process.stderr})
export const pkg = readPkg.sync(resolve(__dirname, '..'))
export const metadata = meta(__dirname)

/**
 * Color retreival API. Will return different values if called with a cli or sgr context.
 * @name Trucolor
 * @typedef {Trucolor}
 * @property {string} name       - Human readable color name.
 * @property {string} in         - Opening SGR code
 * @property {string} out        - Closing SGR code
 * @property {string} hex        - #RRGGBB Hexadecimal color value (or SGR reset name)
 * @property {string} rgb        - 'rgb(red, green, blue)' CSS format (or SGR reset name)
 * @property {function} toString - Returns a Hex code, SGR in code or CLI
 *                                 arguments with formatting flags, depending on
 *                                 format.
 * @property {function} toSwatch - Returns a graphic swatch of the color.
 */

/**
 * Create an SGR-aware color from a loose text definition.
 * @param  {string} color   A color definition.
 * @param  {Object} options Options.
 * @property {string} options.format Output collection format. [ default | sgr | cli ]
 * @property {string} options.force Force a colour depth [ (4|color}, (8|256), (24|16m) ]
 * @return {Trucolor} A Trucolor instance.
 */
export function trucolor(color, options = {}) {
	const queue = parse(color)
	if (queue.length > 1) {
		return queue.map(color => render(color, options))
	}
	return render(queue[0], options)
}

/**
 * Create a map of trucolor instances from a map of name/color values.
 * @param  {Object} options Options to pass to trucolor creation.
 * @param  {Object} palette A map of name/color definitions.
 * @return {Object} The resultant name/trucolor map.
 */
export function palette(options, palette) {
	return _.mapValues(palette, color => trucolor(color, options))
}

/**
 * Create a map of nestable functions, allowing color to be applied a-lá-chalk.
 * @param  {Object} palette A map of name/color definitions.
 * @return {function} The resultant name/function map.
 */
export function chalkish(palette) {
	return chalk(palette)
}

/**
 * Create a simple, sharable palette
 * @param  {Object} options Options to pass to trucolor creation.
 * @return {Object} The resultant name/trucolor map.
 * @example
 * {
 *   white: '#BBB',
 *   black: '#111',
 *   red: '#B00',
 *   green: '#0B0',
 *   blue: '#44B',
 *   cyan: '#0BB',
 *   yellow: '#BB0',
 *   magenta: '#B0B',
 *   brightWhite: '#FFF',
 *   brightRed: '#F33',
 *   brightGreen: '#3F3',
 *   brightBlue: '#44F',
 *   brightCyan: '#3FF',
 *   brightYellow: '#FF3',
 *   brightMagenta: '#F3F',
 *   dim: 'dim',
 *   bold: 'bold',
 *   italic: 'italic',
 *   invert: 'invert',
 *   example: '#CC99FF',
 *   command: '#31A0FF',
 *   argument: '#7DC3FF',
 *   option: '#C1BA89',
 *   operator: '#FFFFFF',
 *   grey: '#808080',
 *   title: 'bold #80C480',
 *   normal: 'normal',
 *   reset: 'reset'
 * }
 */
export function simple(options) {
	return palette(options, simplePalette)
}

export {parse, render}
