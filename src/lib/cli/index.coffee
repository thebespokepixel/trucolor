'use strict'
###
 trucolor (v0.0.7) : 24bit color tools for the command line
 Command line functionality
###

_trucolor = require "../trucolor"
_color = require "../color"

yargs = require 'yargs'
	.strict()
	.options
		help:
			alias: 'h'
			describe: 'Display this help.'
		version:
			alias: 'v'
			count: true
			describe: 'Return a long version decription.'
		verbose:
			alias: 'V'
			boolean: true
			describe: 'Be verbose. Useful for debugging, not great for actual use.\n'
		hex:
			alias: 'x'
			boolean: true
			describe: 'Output color as hex RGB triplet, i.e. cc3342'
		rgb:
			alias: 'r'
			boolean: true
			describe: 'Output color as CSS RGB declaration, i.e. rgb(204, 51, 66)'
	.showHelpOnFail false, "Use 'trucolor --help' for user manual"
argv = yargs.argv

if argv.version
	console.log _trucolor.getVersion(argv.version > 1)
	process.exit 0

if argv.verbose
	console.log 'Verbose mode:'
	console.dir argv._
	global.verbose = true

if argv.help
	require('./help')(yargs, argv.help)
	process.exit 0

if argv._.length == 0
	console.error 'At least one color must be specified.'
	process.exit 1


current_auto_name = 1
current_process = new _process 'color_' + current_auto_name++

commands = argv._
while commands
	nextElement = commands.shift()
	commands = null if commands.length == 0
	switch nextElement
		when 'saturate', 'sat'
			current_process.add.saturate
				percent: commands.shift()
		when 'desaturate', 'desat'
			current_process.add.desaturate
				percent: commands.shift()
		when 'light'
			current_process.add.lighten
				percent: 20
		when 'dark'
			current_process.add.darken
				percent: 20
		when 'lighten'
			current_process.add.lighten
				percent: commands.shift()
		when 'darken'
			current_process.add.darken
				percent: commands.shift()
		when 'spin'
			current_process.add.spin
				rotation: commands.shift()
		when 'mix'
			current_process.add.mix
				color: commands.shift()
		when 'multiply'
			current_process.add.multiply
				color: commands.shift()
		when 'screen'
			current_process.add.screen
				color: commands.shift()
		when 'overlay'
			current_process.add.overlay
				color: commands.shift()
		when 'softlight', 'soft'
			current_process.add.softlight
				color: commands.shift()
		when 'hardlight', 'hard'
			current_process.add.hardlight
				color: commands.shift()
		when 'difference', 'diff'
			current_process.add.difference
				color: commands.shift()
		when 'exclusion', 'excl'
			current_process.add.exclusion
				color: commands.shift()
		when 'average', 'ave'
			current_process.add.average
				color: commands.shift()
		when 'negation', 'neg'
			current_process.add.negation
				color: commands.shift()
		when 'contrast'
			current_process.add.contrast
				color_dark: commands.shift()
				color_light: commands.shift()
				threshold: commands.shift()
		else
			if nextElement.match(/^\w+:$/)
				if current_process.haveColor
					_batch.push current_process
					current_process = new _process nextElement
				current_process.setName nextElement
			else if nextElement.match(/^@\w+$/)
				if current_process.haveColor
					_batch.push current_process
					current_process = new _process nextElement
				current_process.setVar nextElement
			else
				if current_process.haveColor
					_batch.push current_process
					current_process = new _process 'color_' + current_auto_name++
				current_process.setColor new _color nextElement
