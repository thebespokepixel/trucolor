'use strict'
###
 trucolor (v0.0.18-alpha.47) : 24bit color tools for the command line
 Command line functionality
###

yargs = require 'yargs'
	.strict()
	.options
		h:
			alias: 'help'
			describe: 'Display this help.'
		v:
			alias: 'version'
			count: yes
			describe: 'Return the current version. -vv Return name & version.'
		V:
			alias: 'verbose'
			count: yes
			describe: 'Be verbose. -VV Be loquacious.'
		x:
			alias: 'hex'
			boolean: true
			describe: 'Output color as hex RGB triplet, i.e. cc3342'
		r:
			alias: 'rgb'
			boolean: true
			describe: 'Output color as CSS RGB declaration, i.e. rgb(204, 51, 66)'
	.showHelpOnFail false, "Use 'trucolor --help' for user manual"
argv = yargs.argv

_trucolor = switch
	when argv.hex then require("../..").HEXout()
	when argv.rgb then require("../..").RGBout()
	else require("../..").SGRout()

console = global.vconsole

if argv.version
	process.stdout.write _trucolor.getVersion(argv.version)
	process.exit 0

if argv.verbose
	switch argv.verbose
		when 1
			console.verbosity 4
			console.log ':Verbose mode:'
		when 2
			console.verbosity 5
			console.log ':Extra-Verbose mode:'
			console.yargs argv

if argv.help
	require('./help')(yargs, argv.help)
	process.exit 0

if argv._.length == 0
	console.error 'At least one color must be specified.'
	process.exit 1

current_auto_name = 1
current_processor = _trucolor.addProcessor "color_#{current_auto_name++}"
commands = argv._
until commands.length == 0
	nextElement = commands.shift().toString()
	switch nextElement
		# Character types
		when 'background'
			current_processor.background
		when 'bold'
			current_processor.bold
		when 'faint'
			current_processor.faint
		when 'standout'
			current_processor.standout
		when 'inverse'
			current_processor.inverse
		# Colour processes
		when 'saturate', 'sat'
			current_processor.saturate
				percent: commands.shift()
		when 'desaturate', 'desat'
			current_processor.desaturate
				percent: commands.shift()
		when 'light'
			current_processor.lighten
				percent: 20
		when 'dark'
			current_processor.darken
				percent: 20
		when 'lighten'
			current_processor.lighten
				percent: commands.shift()
		when 'darken'
			current_processor.darken
				percent: commands.shift()
		when 'spin'
			current_processor.spin
				rotation: commands.shift()
		when 'mix'
			current_processor.mix
				color: commands.shift()
		when 'multiply'
			current_processor.multiply
				color: commands.shift()
		when 'screen'
			current_processor.screen
				color: commands.shift()
		when 'overlay'
			current_processor.overlay
				color: commands.shift()
		when 'softlight', 'soft'
			current_processor.softlight
				color: commands.shift()
		when 'hardlight', 'hard'
			current_processor.hardlight
				color: commands.shift()
		when 'difference', 'diff'
			current_processor.difference
				color: commands.shift()
		when 'exclusion', 'excl'
			current_processor.exclusion
				color: commands.shift()
		when 'average', 'ave'
			current_processor.average
				color: commands.shift()
		when 'negation', 'neg'
			current_processor.negation
				color: commands.shift()
		when 'contrast'
			current_processor.contrast
				color_dark: commands.shift() if commands[0]?
				color_light: commands.shift() if commands[0]?
				threshold: commands.shift() if commands[0]?
		else

			if nextElement.match(/^[A-Za-z0-9_-]+:$/)
				if current_processor.haveColor
					current_processor = _trucolor.addProcessor nextElement
				current_processor.setName nextElement[..-2]

			else if nextElement.match(/^@\w+$/)
				if current_processor.haveColor
					current_processor = _trucolor.addProcessor nextElement

				unless _trucolor.hasVar nextElement
					_trucolor.trackVar nextElement
					current_processor.setVar nextElement
				else
					current_processor.setColor _trucolor.addColor nextElement

			else
				if current_processor.haveColor
					current_processor = _trucolor.addProcessor "color_#{current_auto_name++}"
				current_processor.setColor _trucolor.addColor nextElement

_trucolor.runBatch (output_) ->
	console.log ''
	console.log "Output:"
	console.pretty output_,
		depth: 2
