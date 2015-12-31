'use strict'


vows = require 'vows'
assert = require 'assert'
_package = require '../package.json'
trucolor = require('../../trucolor')
exec = require('child_process').exec
bin = _package.bin[_package.name.split('/')[1]]

vows
	.describe("#{_package.name} Color Confimations")
	.addBatch
		'Check Named Primaries':
			"Red?":
				topic: ->
					exec "#{bin} red", @callback
					return
				"Should equal FF0000": (error, output) ->
					assert.isNull error
					assert output is 'FF0000'
			"Green?":
				topic: ->
					exec "#{bin} green", @callback
					return
				"Should equal 008000": (error, output) ->
					assert.isNull error
					assert output is '008000'
			"Blue?":
				topic: ->
					exec "#{bin} blue", @callback
					return
				"Should equal 0000FF": (error, output) ->
					assert.isNull error
					assert output is '0000FF'
		'Check Conversion':
			"rgb:128,0,128?":
				topic: ->
					exec "#{bin} rgb:128,0,128", @callback
					return
				"Should equal 800080": (error, output) ->
					assert.isNull error
					assert output is '800080'
			"hsl:120,100,50?":
				topic: ->
					exec "#{bin} hsl:120,100,50", @callback
					return
				"Should equal 00FF00": (error, output) ->
					assert.isNull error
					assert output is '00FF00'
			"hwb:240,0,0?":
				topic: ->
					exec "#{bin} hwb:240,0,0", @callback
					return
				"Should equal 0000FF": (error, output) ->
					assert.isNull error
					assert output is '0000FF'
		'Check Processing':
			"rgb:128,0,128 lighten 10 spin 5?":
				topic: ->
					exec "#{bin} rgb:128,0,128 lighten 10 spin 5", @callback
					return
				"Should equal b300a4": (error, output) ->
					assert.isNull error
					assert output is 'b300a4'
			"hsl:120,100,50 desaturate 50?":
				topic: ->
					exec "#{bin} hsl:120,100,50 desaturate 50", @callback
					return
				"Should equal 40bf40": (error, output) ->
					assert.isNull error
					assert output is '40bf40'
			"blanchedalmond spin -195 lighten 5 desaturate 10?":
				topic: ->
					exec "#{bin} blanchedalmond spin -195 lighten 5 desaturate 10", @callback
					return
				"Should equal fceed0": (error, output) ->
					assert.isNull error
					assert output is 'fceed0'
	.addBatch
		'Check Options':
			"Red as rgb()?":
				topic: ->
					exec "#{bin} -r red", @callback
					return
				"Should equal rgb(255, 0, 0)": (error, output) ->
					assert.isNull error
					assert output is 'rgb(255, 0, 0)'
.export(module)
