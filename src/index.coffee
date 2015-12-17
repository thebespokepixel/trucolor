'use strict'
###
	trucolor (v0.0.18-alpha.47)
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
_ = require 'underscore'
supportsColor = require 'supports-color'

# Set some globals
global.colorSupport = _.clone supportsColor
if (process.env.TERM_COLOR is '24 bit') or (process.env.fish_term24bit)
	colorSupport.has16m = true
	colorSupport.level = 3

global._iTerm = process.env.ITERM_SESSION_ID and (process.env.TERM_PROGRAM is 'iTerm.app')

console = global.vconsole ?= require('@thebespokepixel/verbosity').console
	out: process.stderr

_core = require './lib/core'

exports.SGRout = ->
	_core.setMode 'SGR'
	_core

exports.RGBout = ->
	_core.setMode 'RGB'
	_core

exports.HEXout = ->
	_core.setMode 'HEX'
	_core

exports.simplePalette = require './lib/simple'
