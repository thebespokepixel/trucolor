'use strict'
###
	trucolor (v0.1.4-alpha.4)
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

console = global.vConsole ?= require('@thebespokepixel/verbosity').console
	out: process.stderr

_package =         require './package.json'
_less_package =    require 'less/package.json'
_convert_package = require 'color-convert/package.json'

_interpreter =     require './lib/interpreter'
_processor =       require './lib/processor'
_router =          require './lib/router'
_parser =          require './lib/parser'
_cache =      new (require './lib/cache')

if _cache.load()
	console.debug "Cache loaded."
else
	console.warn "Cache invalidated."
	_cache.clear()

exports.getName =        -> return _package.name
exports.getDescription = -> return _package.description

exports.getVersion =   (long_) ->
	switch long_
		when 4 then "#{_package.name} v#{_package.version} (color-convert v#{_convert_package.version}, less v#{_less_package.version})"
		when 3 then "v#{_package.version} (color-convert v#{_convert_package.version}, less v#{_less_package.version})"
		when 2 then "#{_package.name} v#{_package.version}"
		else "#{_package.version}"

exports.simplePalette = require './lib/palettes/simple'

# Simple on-disk caching
exports.cacheGet =     (name_) -> _cache.get name_
exports.cachePut =     (name_, value_) -> _cache.set name_, value_
exports.cacheClear =   (name_) -> _cache.clear name_

# Processing
exports.newProcessor = (name_) -> _router.add new _processor name_
exports.interpret =    (input_) -> new _interpreter input_

exports.bulk =         (object_, options, callback_) ->
	{type = 'sgr'} = options
	do _router.reset

	for key_, value_ of object_
		_parser ["#{key_}:"].concat value_.split ' '

	_router.run (output_) ->
		collection = {}
		output_.exportCollection().forEach (value_, key_) ->
			switch key_
				when 'normal', 'reset'
					collection[key_] = "#{value_.SGRout()}"
				else
					collection[key_] = switch type
						when 'swatch' then value_.swatch()
						else value_.SGRin()

					collection["#{key_}Out"] = value_.SGRout() if value_.hasAttr()
		callback_ collection


# Fast/Slow/Less/Caching Router
exports.route = _router.run
