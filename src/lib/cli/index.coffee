'use strict'
###
 trucolor (v0.0.22) : 24bit color tools for the command line
 Command line functionality
###

_root = require("../..")
console = global.vConsole

yargs = require 'yargs'
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
		m:
			alias: 'message'
			nargs: 1
			describe: 'Format message with SGR codes'
		i:
			alias: 'in'
			boolean: true
			describe: 'Output SGR color escape code.'
		o:
			alias: 'out'
			boolean: true
			describe: 'Output cancelling SGR color escape code.'
		r:
			alias: 'rgb'
			boolean: true
			describe: 'Output color as CSS RGB declaration, i.e. rgb(204, 51, 66)'
	.showHelpOnFail false, "Use 'trucolor --help' for user manual"
argv = yargs.argv

if argv.version
	process.stdout.write _root.getVersion(argv.version)
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
current_processor = _root.newProcessor "color_#{current_auto_name++}"
tokens = argv._

until tokens.length == 0
	token = do tokens.shift

	switch token
		# Character types
		when 'background'
			do current_processor.background
		when 'bold'
			do current_processor.bold
		when 'faint'
			do current_processor.faint
		when 'italic'
			do current_processor.italic
		when 'invert'
			do current_processor.invert
		when 'underline'
			do current_processor.underline
		when 'blink'
			do current_processor.blink

		# Colour processes
		when 'saturate', 'sat'
			current_processor.saturate
				percent: do tokens.shift
		when 'desaturate', 'desat'
			current_processor.desaturate
				percent: do tokens.shift
		when 'light'
			current_processor.lighten
				percent: 20
		when 'dark'
			current_processor.darken
				percent: 20
		when 'lighten'
			current_processor.lighten
				percent: do tokens.shift
		when 'darken'
			current_processor.darken
				percent: do tokens.shift
		when 'spin'
			current_processor.spin
				rotation: do tokens.shift
		when 'mix'
			current_processor.mix
				color: do tokens.shift
		when 'multiply'
			current_processor.multiply
				color: do tokens.shift
		when 'screen'
			current_processor.screen
				color: do tokens.shift
		when 'overlay'
			current_processor.overlay
				color: do tokens.shift
		when 'softlight', 'soft'
			current_processor.softlight
				color: do tokens.shift
		when 'hardlight', 'hard'
			current_processor.hardlight
				color: do tokens.shift
		when 'difference', 'diff'
			current_processor.difference
				color: do tokens.shift
		when 'exclusion', 'excl'
			current_processor.exclusion
				color: do tokens.shift
		when 'average', 'ave'
			current_processor.average
				color: do tokens.shift
		when 'negation', 'neg'
			current_processor.negation
				color: do tokens.shift
		when 'contrast'
			current_processor.contrast
				color_dark: do tokens.shift if commands[0]?
				color_light: do tokens.shift if commands[0]?
				threshold: do tokens.shift if commands[0]?
		else
			if /^[A-Za-z0-9_-]+:$/.test token
				if do current_processor.hasSource
					current_processor = _root.newProcessor "color_#{current_auto_name++}"
				current_processor.lock token[..-2]
			else
				if do current_processor.hasSource
					current_processor = _root.newProcessor "color_#{current_auto_name++}"
				current_processor.setSource _root.interpret token

_root.route (output_) ->
	if console.canWrite 4
		console.pretty output_,
			depth: 2
	switch
		when argv.message
			process.stdout.write "#{output_.SGRin()}#{argv.message}#{output_.SGRout()}"
		when argv.in
			process.stdout.write "#{output_.SGRin()}"
		when argv.out
			process.stdout.write "#{output_.SGRout()}"
		when argv.rgb
			process.stdout.write "#{output_.toString()}"
		else process.stdout.write "#{output_}"
