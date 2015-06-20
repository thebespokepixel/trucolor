'use strict'
###
 trucolor (v0.0.6-45)
 24bit color tools for the command line
###

_package = require "../package.json"
_less = require "less"

exports.getVersion = (isLong) ->
	return if isLong then _package.name + " v" + _package.version else _package.version


