'use strict'
###
 trucolor (v0.0.19) 24bit color tools for the command line
 Color Demand Parser
###
console = global.vconsole
_trucolor = require("../index").SGRout()

module.exports = ->
		if colorSupport.has16m
			example  : '\x1b[38;2;178;98;255m'
			command  : '\x1b[38;2;65;135;215m'
			argument : '\x1b[38;2;20;175;255m'
			option   : '\x1b[38;2;175;175;45m'
			operator : '\x1b[38;2;255;255;255m'
			grey     : '\x1b[38;2;100;100;100m'
			title    : '\x1b[38;2;128;196;126m'
			normal   : '\x1b[30m\x1b[m'
		else if colorSupport.has256
			example  : '\x1b[38;5;93m'
			command  : '\x1b[38;5;68m'
			argument : '\x1b[38;5;39m'
			option   : '\x1b[38;5;142m'
			operator : '\x1b[38;5;231m'
			grey     : '\x1b[38;5;247m'
			title    : '\x1b[38;5;114m'
			normal   : '\x1b[30m\x1b[m'
		else if colorSupport
			example  : '\x1b[33m'
			command  : '\x1b[36m'
			argument : '\x1b[94m'
			option   : '\x1b[93m'
			operator : '\x1b[95m'
			grey     : '\x1b[90m'
			title    : '\x1b[92m'
			normal   : '\x1b[30m\x1b[m'
		else
			example        : ''
			command        : ''
			argument       : ''
			option         : ''
			operator       : ''
			grey           : ''
			cc             : ''
			normal         : ''
