'use strict'
###
 trucolor
 Command line functionality
###

trucolor = require "../.."
updateNotifier = require 'update-notifier'
console = global.vConsole
_parser = require '../parser'
_package = require '../../package.json'

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
		t:
			alias: 'type'
			choices: ['none', 'direct', 'fish']
			describe: 'CLI styling flags output.'
		r:
			alias: 'rgb'
			boolean: true
			describe: 'Output color as rgb(r, g, b)'
		s:
			alias: 'swatch'
			boolean: true
			describe: 'Output an isolated color swatch.'
	.showHelpOnFail false, "'trucolor --help [named, special]' for usage."
argv = yargs.argv

unless process.env.USER is 'root' and process.env.SUDO_USER isnt process.env.USER
	do updateNotifier
		pkg: _package
	.notify

if argv.version
	process.stdout.write trucolor.getVersion(argv.version)
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

global.trucolor_CLI_type = argv.type ? "default"

if argv._.length == 0
	console.error 'At least one color must be specified.'
	process.exit 1

do trucolor.reset

_parser argv._

trucolor.route {}, (output_) ->
	if console.canWrite 4
		console.pretty output_,
			depth: 2
	switch
		when argv.message
			sgr = do output_.toSGR
			process.stdout.write "#{sgr.in}#{argv.message}#{sgr.out}"
		when argv.in
			process.stdout.write "#{output_.toSGR().in}"
		when argv.out
			process.stdout.write "#{output_.toSGR().out}"
		when argv.rgb
			process.stdout.write "#{output_.toString()}"
		when argv.swatch
			process.stdout.write "#{output_.toSwatch()}"
		else process.stdout.write "#{output_}"
