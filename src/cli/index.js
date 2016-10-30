/* ─────────╮
 │ trucolor │ CLI
 ╰──────────┴─────────────────────────────────────────────────────────────────── */
/* eslint unicorn/no-process-exit:0 */

import {format} from 'util'

import _ from 'lodash'
import yargs from 'yargs'
// import getStdin from 'get-stdin'
import updateNotifier from 'update-notifier'
import {box} from '@thebespokepixel/string'
import deepAssign from 'deep-assign'
import {stripIndent} from 'common-tags'
import {trucolor, console, pkg, metadata} from '../index'
import {clr, colorReplacer} from '../lib/colour'
import help from './help'

yargs.strict().options({
	h: {
		alias: 'help',
		describe: 'Display this help.'
	},
	v: {
		alias: 'version',
		count: true,
		describe: 'Return the current version on stdout. -vv Return name & version.'
	},
	V: {
		alias: 'verbose',
		count: true,
		describe: 'Be verbose. -VV Be loquacious.'
	},
	m: {
		alias: 'message',
		nargs: 1,
		describe: 'Format message with SGR codes',
	},
	i: {
		alias: 'in',
		boolean: true,
		describe: 'Output SGR color escape code.'
	},
	o: {
		alias: 'out',
		boolean: true,
		describe: 'Output cancelling SGR color escape code.'
	},
	t: {
		alias: 'type',
		choices: ['none', 'direct', 'fish'],
		describe: 'CLI styling flags output.',
		default: 'none',
		requiresArg: true
	},
	r: {
		alias: 'rgb',
		boolean: true,
		describe: 'Output color as rgb(r, g, b).'
	},
	s: {
		alias: 'swatch',
		boolean: true,
		describe: 'Output an isolated color swatch.'
	},
	color: {
		describe: 'Force color depth --color=256|16m. Disable with --no-color'
	}
}).showHelpOnFail(false, `Use 'trucolor --help' for help.`)

const argv = yargs.argv

const outStream = argv.stderr ? process.stderr : process.stdout

if (argv.version) {
	process.stdout.write(`${metadata.version(argv.version)}\n`)
	process.exit(0)
}

if (argv.verbose) {
	const settings = {
		borderColor: 'green',
		margin: {
			bottom: 1,
			top: 1
		},
		padding: {
			bottom: 0,
			top: 0,
			left: 2,
			right: 2
		}
	}

	const titling = mode => stripIndent(colorReplacer)`
		${`title|${metadata.name}`}${`dim| │ v${metadata.version()}`}
		Mode: ${mode}
	`
	switch (argv.verbose) {
		case 1:
			console.verbosity(4)
			console.log(box(titling('Verbose'), settings))
			break
		case 2:
			console.verbosity(5)
			console.log(box(titling('Some might say loquacious'), settings))
			console.yargs(argv)
			console.debug('')
			break
		default:
			console.verbosity(3)
	}
}

if (!(process.env.USER === 'root' && process.env.SUDO_USER !== process.env.USER)) {
	updateNotifier({
		pkg
	}).notify()
}

if (argv.help) {
	help(yargs)
	process.exit(0)
}

const viewSettings = {
	left: argv.left,
	right: argv.right,
	mode: argv.mode,
	tabWidth: argv.tab,
	outStream
}

if (argv.regex) {
	viewSettings.tokenRegex = new RegExp(argv.regex, 'g')
}

if (argv.width) {
	viewSettings.width = argv.width
}

const renderer = truwrap(viewSettings)

if (argv.stamp) {
	renderer.write(format.apply(null, argv._))
	process.exit(0)
}

// getStdin().then(input => {
// 	if (argv.panel) {
// 		const panel = parsePanel(input, argv.delimiter, renderer.getWidth())
// 		renderer.panel(panel.content, {
// 			maxLineWidth: renderer.getWidth(),
// 			showHeaders: false,
// 			truncate: argv.truncate,
// 			config: panel.configuration
// 		})
// 	} else {
// 		renderer.write(input)
// 	}
// })
