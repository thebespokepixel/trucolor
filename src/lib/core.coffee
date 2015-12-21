'use strict'
###
	trucolor (v0.0.19)
	Core logic
###

console = global.vconsole

_package = require "../package.json"
_less_package = require "less/package.json"

cache = require "./cache"
path = require "path"
_ = require 'underscore'

_cache = new cache
	auto_save: true
	filename: path.join process.env.HOME, '/.rgbCache'

if _cache.load()
	console.debug "Cache loaded."
else
	console.warn "Cache cleared."
	_cache.clear()

_batch = require './batch'
_colorIn = require "./colorIn"
_colorOut = require "./colorOut"
_processor = require "./processor"
_ansiPalette = require "./ANSIPalette"

_definedVars = []
_outputModes = [
	'HEX'
	'RGB'
	'SGR'
	]
_outputMode = 0

exports.getName = ->
	return _package.name

exports.getVersion = (long_) ->
	switch long_
		when 3 then "#{_package.name} v#{_package.version} (lessc v#{_less_package.version})"
		when 2 then "#{_package.name} v#{_package.version}"
		else "#{_package.version}"

exports.setMode = (mode_) ->
	newMode = _.indexOf _outputModes, mode_, yes
	if newMode > -1
		console.info "Output mode set to #{mode_}"
		_outputMode = newMode
	else throw new Error "Requested mode (#{mode_}) not found."

exports.cacheGet = (name_) ->
	_cache.get name_

exports.cachePut = (name_, value_) ->
	_cache.set name_, value_

exports.addProcessor = (name_) ->
	colorProcess = new _processor name_
	_batch.add colorProcess
	colorProcess

exports.addColor = (color_) ->
	try
		new _colorIn color_
	catch error
		if console.canWrite 4
			console.trace(error.message)
		else console.error error.message
		process.exit 1

exports.setColor = (color_) ->
	try
		new colorOut color_
	catch error
		if console.canWrite 4
			console.trace(error.message)
		else console.error error.message
		process.exit 1

exports.trackVar = (varname_) -> _definedVars.push varname_

exports.hasVar = (varname_) -> varname_ in _definedVars

exports.runBatch = _batch.run


