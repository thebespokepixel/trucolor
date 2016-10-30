'use strict'
###
	trucolor
	24bit color tools for the command line

	The MIT License (MIT)

	Copyright (c) 2016 Mark Griffiths

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

	Chalkish bits taken from Chalk, under the MIT license.
	(c) 2016 Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)
###

console = global.vConsole ?= require('verbosity').console
	out: process.stderr

_package =         require './package.json'
_less_package =    require 'less/package.json'
_convert_package = require 'color-convert/package.json'
_escStringRE =     require 'escape-string-regexp'

_interpreter =     require './lib/interpreter'
_processor =       require './lib/processor'
_router =          require './lib/router'
_parser =          require './lib/parser'
_cache =      new (require './lib/cache')

_simple = null
_functions = null

unless _cache.load(yes) then _cache.clear()

exports.getName =                -> _package.name
exports.getBin =                 -> Object.keys(_package.bin)[0]
exports.getDescription =         -> _package.description
exports.getCopyright =           -> "©#{_package.copyright.year} #{_package.copyright.owner}"
exports.getBugs =                -> _package.bugs.url
exports.getVersion = (long_ = 1) ->
	version = if _package.build_number > 0
		"#{_package.version}-Δ#{_package.build_number}"
	else
		"#{_package.version}"

	switch long_
		when 4 then "#{_package.name} v#{version} (color-convert v#{_convert_package.version}, less v#{_less_package.version})"
		when 3 then "v#{version} (color-convert v#{_convert_package.version}, less v#{_less_package.version})"
		when 2 then "#{_package.name} v#{version}"
		else "#{version}"

# Simple on-disk caching
exports.cacheGet =     (name_) -> _cache.get name_
exports.cachePut =     (name_, value_) -> _cache.set name_, value_
exports.cacheClear =   (name_) -> _cache.clear name_

# Processing
exports.newProcessor = (name_) -> _router.add new _processor name_
exports.interpret =    (input_) -> new _interpreter input_

exports.bulk = bulk =  (options_, object_) ->
	{type = 'sgr'} = options_
	do _router.reset

	for key_, value_ of object_
		_parser ["#{key_}:"].concat value_.split ' '

	collection = {}
	_router.run options_, (output_) ->
		output_.exportCollection().forEach (value_, key_) ->
			collection[key_] = switch type
				when 'value' then value_.valueOf()
				when 'swatch' then value_.toSwatch()
				else value_.toSGR()
	return collection

# Fast/Slow/Less/Caching Router
exports.route = _router.run
exports.reset = _router.reset

# Simple palette export for fast inclusion in other modules
simplePalette = exports.simplePalette = (options_ = {}) ->
	if options_.force?
		bulk options_, require './lib/palettes/simple'
	else
		_simple ?= bulk options_, require './lib/palettes/simple'

class Chalkish
	constructor: (styles) ->
		styleFactory = do (collection = {}) ->
			Object.keys(styles).forEach (key_) ->
				styles[key_].closeRE = new RegExp(_escStringRE(styles[key_].out), 'g');
				collection[key_] =
					get: -> makePainter.call this, @_styles.concat key_
				return
			collection

		proto = Object.defineProperties (->), styleFactory

		makePainter = (styles_) ->
			painter = () ->
				applyPaint.apply painter, arguments
			painter._styles = styles_
			painter.__proto__ = proto
			painter

		applyPaint = (content_) ->
			i = @_styles.length
			while i--
				sgrPair = styles[@_styles[i]];
				content_ = sgrPair.in + content_.replace(sgrPair.closeRE, sgrPair.in) + sgrPair.out;
			return content_

		Object.defineProperties this, do (collection = {}) ->
			Object.keys(styles).forEach (name) ->
				collection[name] =
					get: -> makePainter.call this, [name]
				return
			collection

chalkish = exports.chalkish = (styles_) -> new Chalkish styles_

# Function palette export for chalk-like nested functions
exports.chalkishPalette = (options_ = {}) ->
	if options_.force?
		do (source_ = simplePalette(options_)) ->
			chalkish source_
	else
		_functions ?= do (source_ = simplePalette(options_)) ->
			chalkish source_
