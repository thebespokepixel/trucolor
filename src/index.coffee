'use strict'
###
	trucolor (v0.0.17)
	24bit color tools for the command line

	Copyright (c) 2015 CryptoComposite

	Permission is hereby granted, free of charge, to any person
	obtaining a copy of this software and associated documentation
	files (the "Software"), to deal in the Software without
	restriction, including without limitation the rights to use, copy,
	modify, merge, publish, distribute, sublicense, and/or sell copies
	of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be
	included in all copies or substantial portions of the Software.

   THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
	IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
	CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
	TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
	SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
###

console = global.vconsole ?= require('@thebespokepixel/verbosity').console
	out: process.stderr

global.supportsColor = require 'supports-color'
# supportsColor.has16m = true if (process.env.TERM_COLOR is '24 bit') or (process.env.fish_term24bit)
global._iTerm = process.env.ITERM_SESSION_ID and (process.env.TERM_PROGRAM is 'iTerm.app')

path = require 'path'
less = require 'less'
_cache = require "./lib/cache"

try
	cache = new _cache
		auto_save: true
		filename: path.join process.env.HOME, '/.rgbCache'
catch error
	console.log "Error Setting up new cache"

if cache.load()
	console.debug "Cache loaded."
else
	console.warn "Cache cleared."
	cache.clear()

_package = require "./package.json"
_less_package = require "less/package.json"
_batch = require './lib/batch'
_colorIn = require "./lib/colorIn"
_colorOut = require "./lib/colorOut"
_processor = require "./lib/processor"
_ansiColourSpace = require "./lib/ANSIPalette"
_basicPalette = require "./lib/palette"

_defined_vars = []

# _ansiColourSpace.find 23, 74, 32
# _ansiColourSpace.find 95, 95, 215
# _ansiColourSpace.find 90, 210, 192

exports.getName = ->
	return _package.name

exports.getVersion = (long_) ->
	switch long_
		when 3 then "#{_package.name} v#{_package.version} (lessc v#{_less_package.version})"
		when 2 then "#{_package.name} v#{_package.version}"
		else "#{_package.version}"

exports.cacheGet = (name_) ->
	cache.get name_

exports.cachePut = (name_, value_) ->
	cache.set name_, value_

exports.addProcessor = (name_) ->
	colorProcess = new _processor name_
	_batch.add colorProcess
	colorProcess

exports.basicPalette = ->
	_basicPalette

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

exports.trackVar = (varname_) -> _defined_vars.push varname_

exports.hasVar = (varname_) -> varname_ in _defined_vars

exports.runBatch = _batch.run


