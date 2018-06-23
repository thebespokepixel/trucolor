/* ─────────╮
 │ trucolor │ CLI
 ╰──────────┴─────────────────────────────────────────────────────────────────── */
/* eslint unicorn/no-process-exit:0, no-process-exit:0 */

import yargs from 'yargs'
import updateNotifier from 'update-notifier'
import {box} from '@thebespokepixel/string'
import {stripIndent} from 'common-tags'
import {console, pkg, metadata, parse, render} from '../main'
import {colorReplacer} from '../lib/colour'
import help from './help'

yargs.strict().help(false).version(false).options({
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
		describe: 'Format message with SGR codes'
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
		default: 'direct',
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

const {argv} = yargs

global.trucolorCLItype = argv.type

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
	help(yargs, argv.help)
	process.exit(0)
}

if (argv._.length === 0) {
	console.error('At least one color must be specified.')
	process.exit(1)
}

const buffer = parse(argv._.join(' '))
	.map(color => render(color, {
		format: 'cli'
	}))

const isList = buffer.length > 1

buffer.forEach(color => {
	if (console.canWrite(4)) {
		console.log('')
		console.pretty(color, {
			depth: 2
		})
	}
	const output = isList ? `${color.name}: ` : ''
	const lineBreak = isList ? '\n' : ''

	switch (true) {
		case argv.message !== undefined:
			process.stdout.write(`${output}${color.in}${argv.message}${color.out}${lineBreak}`)
			break
		case argv.in:
			if (isList) {
				throw new Error('SGR output only makes sense for a single color.')
			}
			process.stdout.write(`${color.in}`)
			break
		case argv.out:
			if (isList) {
				throw new Error('SGR output only makes sense for a single color.')
			}
			process.stdout.write(`${color.out}`)
			break
		case argv.rgb:
			process.stdout.write(`${output}${color.rgb}${lineBreak}`)
			break
		case argv.swatch:
			process.stdout.write(`${output}${color.toSwatch()}${lineBreak}`)
			break
		default:
			process.stdout.write(`${output}${color}${lineBreak}`)
	}
})
