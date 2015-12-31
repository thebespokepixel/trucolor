'use strict'
###
	trucolor (v0.0.24)
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
# External dependencies

terminalFeatures = require '@thebespokepixel/term-ng'
console = global.vConsole ?= require('@thebespokepixel/verbosity').console
	out: process.stderr

path =             require "path"
_ =                require 'underscore'
cache =            require "./lib/cache"

_package =         require './package.json'
_less_package =    require 'less/package.json'
_convert_package = require 'color-convert/package.json'

_interpreter =     require './lib/interpreter'
_processor =       require './lib/processor'
_router =          require './lib/router'
_output =          require './lib/output'

_cache = new cache
	auto_save: true
	filename: path.join process.env.HOME, '/.rgbCache'

if _cache.load()
	console.debug "Cache loaded."
else
	console.warn "Cache invalidated."
	_cache.clear()

exports.getName = -> return _package.name

exports.getVersion =   (long_) ->
	switch long_
		when 3 then "#{_package.name} v#{_package.version} (color-convert v#{_convert_package.version}, less v#{_less_package.version})"
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

# Fast/Slow/Less/Caching Router
exports.route = _router.run
