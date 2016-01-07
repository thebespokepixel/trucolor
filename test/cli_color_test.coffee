'use strict'


vows = require 'vows'
assert = require 'assert'
_package = require '../package.json'
trucolor = require('..')
exec = require('child_process').exec
bin = _package.bin[_package.name.split('/')[1]]

vows
	.describe("#{_package.name} CLI Color Tests (forced 24 bit color)")
	.addBatch
		'Check Named Primaries':
			"Red?":
				topic: ->
					exec "#{bin} --color=16m red", @callback
					return
				"Should equal FF0000": (error, output) ->
					assert.isNull error
					assert.equal output, 'FF0000'
			"Green?":
				topic: ->
					exec "#{bin} --color=16m green", @callback
					return
				"Should equal 008000": (error, output) ->
					assert.isNull error
					assert.equal output, '008000'
			"Blue?":
				topic: ->
					exec "#{bin} --color=16m blue", @callback
					return
				"Should equal 0000FF": (error, output) ->
					assert.isNull error
					assert.equal output, '0000FF'
		'Check Conversion':
			"rgb:128,0,128?":
				topic: ->
					exec "#{bin} --color=16m rgb:128,0,128", @callback
					return
				"Should equal 800080": (error, output) ->
					assert.isNull error
					assert.equal output, '800080'
			"hsl:120,100,50?":
				topic: ->
					exec "#{bin} --color=16m hsl:120,100,50", @callback
					return
				"Should equal 00FF00": (error, output) ->
					assert.isNull error
					assert.equal output, '00FF00'
			"hwb:240,0,0?":
				topic: ->
					exec "#{bin} --color=16m hwb:240,0,0", @callback
					return
				"Should equal 0000FF": (error, output) ->
					assert.isNull error
					assert.equal output, '0000FF'
		'Check Processing':
			"rgb:128,0,128 lighten 10 spin 5?":
				topic: ->
					exec "#{bin} --color=16m  rgb:128,0,128 lighten 10 spin 5", @callback
					return
				"Should equal B300A4": (error, output) ->
					assert.isNull error
					assert.equal output, 'B300A4'
			"hsl:120,100,50 desaturate 50?":
				topic: ->
					exec "#{bin} --color=16m hsl:120,100,50 desaturate 50", @callback
					return
				"Should equal 40BF40": (error, output) ->
					assert.isNull error
					assert.equal output, '40BF40'
			"blanchedalmond spin -195 lighten 5 desaturate 10?":
				topic: ->
					exec "#{bin} --color=16m blanchedalmond spin -195 lighten 5 desaturate 10", @callback
					return
				"Should equal FCEED0": (error, output) ->
					assert.isNull error
					assert.equal output, 'FCEED0'
	.addBatch
		'Check Options':
			"Red as rgb()?":
				topic: ->
					exec "#{bin} --color=16m -r red", @callback
					return
				"Should equal rgb(255, 0, 0)": (error, output) ->
					assert.isNull error
					assert.equal output, 'rgb(255, 0, 0)'
.export(module)
