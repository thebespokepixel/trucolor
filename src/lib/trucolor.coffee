'use strict'
###
 trucolor (v0.0.3)
 24bit color tools for the command line
###
_version = '0.0.3'

exec = require('child_process').exec

yargs = require 'yargs'
	.usage 'trucolor [OPTIONS] [FILE]'
	.option 'version',
		alias: 'v'
		describe: 'Return the current version'
	.option 'libs',
		alias: 'l'
		describe: 'Specify additional function folders to include'
	.help 'help'
	.alias 'help', 'h'
argv = yargs.argv

argv.version? and do (v_ = _version) ->
	console.info "trucolor v#{v_}"
	process.exit 1
