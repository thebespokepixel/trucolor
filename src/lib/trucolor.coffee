'use strict'
###
 trucolor (v0.0.9-alpha.63)
 24bit color tools for the command line
###

_package = require "../package.json"
_less = require "less/package.json"

exports.getVersion = (long) ->
	switch long
		when 3 then "#{_package.name} v#{_package.version} (lessc v#{_less.version})"
		when 2 then "#{_package.name} v#{_package.version}"
		else "#{_package.version}"
