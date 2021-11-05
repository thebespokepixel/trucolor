/* ─────────────╮
 │ trucolor CLI │
 ╰──────────────┴────────────────────────────────────────────────────────────── */
/* eslint node/prefer-global/process: [error] */

import {join, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'
import _ from 'lodash'
import terminalFeatures from 'term-ng'
import {stripIndent} from 'common-tags'
import {truwrap, createImage} from 'truwrap'
import {names} from '@thebespokepixel/es-tinycolor'
import {clr, colorReplacer, spectrum} from '../lib/colour.js'
import {metadata, palette} from '..'

/**
 * Render help when asked for.
 * @param  {yargs} yargs - yargs object defined in cli
 * @param {Object} helpPage Object of page sections
 * @return {undefined} Writes help to stdout.
 */
export default function help(yargs, helpPage) {
	const images = (function () {
		if (terminalFeatures.images) {
			return {
				space: '\t',
				cc: createImage({
					name: 'logo',
					file: join(dirname(fileURLToPath(import.meta.url)), '/../media/CCLogo.png'),
					height: 3,
				}),
			}
		}

		return {
			space: '',
			cc: {
				render: () => '',
			},
		}
	})()

	const header = (() => {
		if (!terminalFeatures.color.has16m) {
			return () => stripIndent(colorReplacer)`
				${`title|${metadata.name}`}
				${images.space}${metadata.description}
				${images.space}${`grey|${metadata.version(3)}`}
			`
		}

		const headerText = (() => {
			switch (true) {
				case terminalFeatures.font.enhanced:
					return [
						colorReplacer`${'red| ━┳━╸     '}${'bright|╭──╮  ╷'}`,
						colorReplacer`${'blue|  ┃ ┏━┓╻ ╻'}${'bright|│  ╭─╮│╭─╮╭─╮'}`,
						colorReplacer`${'green|  ╹ ╹  ┗━┛'}${'bright|╰──╰─╯╵╰─╯╵  '}`,
					]
				case terminalFeatures.font.basic:
					return [
						colorReplacer`${'red| ─┬─      '}${'bright|┌──┐  ┐'}`,
						colorReplacer`${'blue|  │ ┌─ ┐ ┌'}${'bright|│  ┌─┐│┌─╮┌─┐'}`,
						colorReplacer`${'green|  └ ┘  └─┘'}${'bright|└──└─┘└╰─┘┘  '}`,
					]
				default:
					return [
						`${clr.red} ___${clr.red.out}        __`,
						`${clr.blue}  | ,_${clr.green.out}     |     |   ,_`,
						`${clr.green}  | |  |_|${clr.blue.out} |__(_)|(_)|  `,
					]
			}
		})()

		return () => stripIndent(colorReplacer)`
			${headerText[0]}
			${images.space}${headerText[1]} ${`normal|${metadata.description}`}
			${images.space}${headerText[2]} ${`grey|${metadata.version(3)}`}
		`
	})()

	const synopsis = stripIndent(colorReplacer)`
		${'title|Synopsis:'}
		${`command|${metadata.bin}`} ${'option|[options]'} "${'argument|color description'}"
	`

	const epilogue = stripIndent(colorReplacer)`
		${`title|${metadata.copyright}`}. ${`grey|Released under the ${metadata.license} License.`}
		${`grey|Issues?: ${metadata.bugs}`}
	`
	const pages = {
		default: {
			usage: stripIndent(colorReplacer)`
				${'title|Usage:'}
				In it's simplest form, '${`command|${metadata.bin}`} ${'argument|color'}', will take any of the color expressions listed below and transform it into a simple hexadecimal triplet string, i.e '${'argument|AA00BB'}', ideal for passing into the 'set_color' built-in in fish-shell, or providing the basis of further color processing.

				It can return a wide range of color assignment and manipulations. See the examples below.

				When outputting SGR codes, colors will be shifted to the availalble 256 or ansi color palette if 24 bit color is unavailable or will be omitted in a monochromatic terminal to make usage across environments safe.

				The CLI command respects ${'option|--color=16m'}, ${'option|--color=256'}, ${'option|--color'} and ${'option|--no-color'} flags.

				It does not affect value based output, such as the default or ${'option|--rgb'} output, it only effects the ${'option|--in'}, ${'option|--out'}, ${'option|--message'} and ${'option|--swatch'} outputs.

				The motivation for this is to allow more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added 24 bit support.

				The ${'argument|color'} can be defined in any the following formats:

				CSS Hexadecimal
					${'argument|[#]RRGGBB'} or ${'argument|[#]RGB'} where R, G and B are '0'-'F'.

				CSS Named Colors
					${'red|Red'}, ${'green|green'}, ${'hotpink|hotpink'}, ${'chocolate|chocolate'}... (see '${'option|--help named'}')

				RGB
					${'argument|rgb:R,G,B'} or ${'argument|rgb(R,G,B)'} where ${'red|R'}, ${'green|G'} and${'blue|B'} are 0-255.
					Spaces require quoting/escaping on the CLI. i.e '${'argument|rgb(R, G, B)'}'

				HSL (${'red|H'}${'green|u'}${'blue|e'} ${'dark|Sat'}${'msat|ura'}${'red|tion'} ${'dark|Lig'}${'mlight|htn'}${'bright|ess'})
					${'argument|hsl:H,S,L'} where H is 0-360, S 0-100 and L 0-100

				HSV (${'red|H'}${'green|u'}${'blue|e'} ${'dark|Sat'}${'msat|ura'}${'red|tion'} ${'dark|V'}${'mlight|al'}${'bright|ue'})
					${'argument|hsv:H,S,V'} where H is 0-360, S 0-100 and V 0-100

				HSB (${'red|H'}${'green|u'}${'blue|e'} ${'dark|Sat'}${'msat|ura'}${'red|tion'} ${'dark|Bri'}${'mlight|ght'}${'bright|ness'})
					${'argument|hsb:H,S,B'} where H is 0-360, S 0-100 and B 0-100 (actually just an alias for HSV)

				HWB (${'red|H'}${'green|u'}${'blue|e'} ${'bright|White'} ${'dark|Black'})
					${'argument|hwb:H,W,B'} where H is 0-360, W 0-100 and B 0-100

				Styles and Resets
					'reset', 'normal', ${'ul|underline'}, ${'invert|invert'}, ${'bold|bold'}... (see '${'option|--help special'}')

				A number of color ${'argument|operations'} can be specified, either before or after the base color declaration.

					${'argument|light'}: lighten by 20%
					${'argument|dark'}: darken by 20%
					${'argument|lighten'} ${'option|percent'}: lighten by ${'option|percent'}
					${'argument|darken'} ${'option|percent'}: darken by ${'option|percent'}
					${'argument|mono'}: make monochrome
					${'argument|saturate or sat'} ${'option|percent'}: saturate by ${'option|percent'}
					${'argument|desaturate or des'} ${'option|percent'}: desaturate by ${'option|percent'}
					${'argument|spin'} ${'option|degrees'}: spin hue by by ${'option|degrees'}
					${'option|color'} ${'argument|mix'} ${'option|color'}: mix colors
			`,
			examples: () => [
				{
					Margin: ' ',
					Command: colorReplacer`${`command|${metadata.bin}`} ${'argument|purple'}`,
					Result: colorReplacer`${'grey|→'} 800080`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'argument|bold purple'}`,
					Result: colorReplacer`→ --bold 800080`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m label'} ${'argument|purple'}`,
					Result: colorReplacer`→ a colored, isolated message, ${'purple|label'}.`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--in'} ${'argument|purple'}`,
					Result: colorReplacer`→ ^[[38;2;128;0;128m setting the terminal ${'purple|color'}.`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--rgb'} ${'argument|purple'}`,
					Result: colorReplacer`→ rgb(128, 0, 128)`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--swatch'} ${'argument|purple'}`,
					Result: colorReplacer`→ ${'purple|\u2588\u2588'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--swatch'} ${'argument|purple desat 70'}`,
					Result: colorReplacer`→ ${'purpleSwatch|\u2588\u2588'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'argument|hsb:45,100,100'}`,
					Result: colorReplacer`→ FFBF00`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m label'} ${'argument|hsb:45,100,100'}`,
					Result: colorReplacer`→ a colored, isolated message, ${'orange|label'}.`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--in'} ${'argument|hsb:45,100,100'}`,
					Result: colorReplacer`→ ^[[38;2;255;191;0m setting the terminal ${'orange|color'}.`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--rgb'} ${'argument|hsb:45,100,100'}`,
					Result: colorReplacer`→ rgb(255, 191, 0)`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--swatch'} ${'argument|hsb:45,100,100'}`,
					Result: colorReplacer`→ ${'orange|\u2588\u2588'}`,
				},
			],
			layout: width => ({
				showHeaders: false,
				config: {
					Margin: {
						minWidth: 1,
						maxWidth: 1,
					},
					Command: {
						minWidth: 30,
						maxWidth: 80,
					},
					Result: {
						maxWidth: width - 34,
					},
				},
			}),
			more: stripIndent(colorReplacer)`
				${'title|Custom Names:'}
				Any color definition can be prefixed with a 'name:' so palettes can be output.

					> ${`command|${metadata.bin}`} ${clr.argument}bob: black lighten 50 saturate 50 spin 180${clr.normal}
					40BFBF

					> ${`command|${metadata.bin}`} ${'option|--rgb'} ${'argument|bob:'}
					rgb(64, 191, 191)

					> ${`command|${metadata.bin}`} ${'option|--swatch'} ${clr.argument}bob:${clr.normal}
					${clr.bob}\u2588\u2588${clr.normal}
			`,
		},
		named: {
			usage: stripIndent(colorReplacer)`
				${'title|Named Colors:'}
				All standard CSS names are accepted.
			`,
			examples: width => {
				const namedPalette = palette({}, _.mapValues(names, color => `#${color}`))
				const namedArray = Object.keys(names)
				const columns = Math.floor(width / 28)
				const table = []
				while (namedArray.length > 0) {
					const cell = {
						margin: ' ',
					}
					for (let c = 0; c < columns; c++) {
						const src = namedArray.shift()
						if (src) {
							cell[`color_${c}`] = namedPalette[src].toSwatch()
							cell[`name_${c}`] = src
						}
					}

					table.push(cell)
				}

				return table
			},
			layout: width => {
				const columns = Math.floor(width / 28)
				const grid = {
					margin: {
						minWidth: 2,
					},
				}
				for (let c = 0; c < columns; c++) {
					grid[`color_${c}`] = {
						minWidth: 2,
					}
					grid[`name_${c}`] = {
						minWidth: 16,
					}
				}

				return {
					showHeaders: false,
					config: grid,
				}
			},
			more: '',
		},
		special: {
			usage: stripIndent(colorReplacer)`
				${'title|Special Formatters:'}
				The following keywords modify the meaning or destination of the color, or provide enhanced foramtting. They only work when used with the command switches that actually output SGR codes, namely: ${'option|--message'}, ${'option|--swatch'}, ${'option|--in'} and ${'option|--out'}.

				When used with the default command or with the ${'option|--rgb'} switch, they have no effect and the value of the base color (plus any processing) will be output.

				${'argument|background'}: Set the background color, rather than the foreground.

				${'argument|normal'}: Set the color to the default foreground and background.
				${'argument|reset'}: Sets colors and special formatting back to the default.

				${'argument|bold'}: Set the font to bold.
				${'argument|italic'}: Set the font to italic.
				${'argument|underline'}: Set underline.
				${'argument|faint'}: Set the colour to 50% opacity.
				${'argument|invert'}: Invert the foreground and background.
				${'argument|blink'}: Annoying as a note in Comic Sans, attached to a dancing, purple dinosaur with a talking paperclip.

				All of the above formatters need the correct code to end the range, either provided by using the ${'option|--out'} switch, using the 'reset' keyword, or simply use the ${'option|--message'} option to automatically set the end range SGR code. Using 'normal' alone won't fully clear the formatting.
			`,
			examples: () => [
				{
					Margin: ' ',
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m "Bold yellow text"'} ${'argument|bold yellow'}`,
					Result: colorReplacer`${'grey|→'} ${'exBold|Bold yellow text'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m "Faint yellow text"'} ${'argument|faint yellow'}`,
					Result: colorReplacer`${'grey|→'} ${'exFaint|Faint yellow text'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--swatch'} ${'argument|faint yellow'}`,
					Result: colorReplacer`${'grey|→'} ${'exFaint|\u2588\u2588'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m Italics'} ${'argument|italic #33FF33'}`,
					Result: colorReplacer`${'grey|→'} ${'exItalic|Italics'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m " -Inverted- "'} ${'argument|invert #7B00B1'}`,
					Result: colorReplacer`${'grey|→'} ${'exInvert| -Inverted- '}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m " Background "'} ${'argument|background dark red'}`,
					Result: colorReplacer`${'grey|→'} ${'exBackground| Background '}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m "Underlined"'} ${'argument|underline #fff'}`,
					Result: colorReplacer`${'grey|→'} ${'exUnderline|Underlined'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m "Flashy Thing"'} ${'argument|blink orange'}`,
					Result: colorReplacer`${'grey|→'} ${'exBlink|Flashy Thing'}`,
				},
			],
			layout: width => ({
				showHeaders: false,
				config: {
					Margin: {
						minWidth: 1,
						maxWidth: 1,
					},
					Command: {
						minWidth: 30,
						maxWidth: 80,
					},
					Result: {
						maxWidth: width - 34,
					},
				},
			}),
			more: stripIndent(colorReplacer)`
				${'title|Note:'}
				Obviously all this depends on your terminals support for the extended formatting.

				The latest iTerm2 builds and X's XTerm have full support for everything ${`command|${metadata.bin}`} can do, and anything that supports a terminal type of 'xterm-256color' will cover a fairly complete subset.

				For example, Apple's Terminal.app doesn't have 24 bit color support nor does it have support for italics, but everything else works well.
			`,
		},
	}
	const container = truwrap({
		mode: 'container',
		outStream: process.stderr,
	})
	const windowWidth = container.getWidth()

	const renderer = truwrap({
		left: 2,
		right: 0,
		tabWidth: 2,
		outStream: process.stderr,
	})
	const contentWidth = renderer.getWidth()

	const page = (section => {
		switch (section) {
			case 'named':
				return pages.named
			case 'special':
				return pages.special
			default:
				return pages.default
		}
	})(helpPage)

	yargs.usage('')
	yargs.wrap(contentWidth)

	container.break()
	container.write(images.cc.render({
		nobreak: false,
		align: 2,
	}))
	container.write(header()).break()
	container.write(spectrum(windowWidth, '—')).break()
	renderer.write(synopsis)
	renderer.write(yargs.getUsageInstance().help()).break(2)
	renderer.write(page.usage).break(2)
	renderer.write(colorReplacer`${'title|Examples:'}`).break()
	renderer.panel(page.examples(contentWidth), page.layout(contentWidth)).break(2)
	renderer.write(page.more).break(2)
	container.write(`${clr.dark.in}${'—'.repeat(windowWidth)}${clr.dark.out}`)
	renderer.write(epilogue).end()
}
