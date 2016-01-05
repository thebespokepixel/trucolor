'use strict'
###
 trucolor (v0.1.4-alpha.3) 24bit color tools for the command line
 Output Collection
###

console = global.vConsole
deepAssign = require 'deep-assign'
terminalFeatures = require '@thebespokepixel/term-ng'
_output = require "./output"

class IOCollection
	constructor: (routes_) ->
		@collection = new Map()
		console.info "\nDerived Colours (Level: #{terminalFeatures.color.level ? 0})"
		for id, content of routes_.fast
			@principal ?= id
			@collection.set id, new _output(content, routes_.attr[id])

	valueOf: ->
		if @collection.size is 1
			"#{@collection.get @principal}"
		else
			primitive = []
			@collection.forEach (value_, key_) ->
				primitive.push "#{key_} #{value_}"
			primitive.join '\n'

	SGRin: -> do @collection.get(@principal).SGRin

	SGRout: -> do @collection.get(@principal).SGRout

	swatch: -> do @collection.get(@principal).swatch

	toString: -> do @collection.get(@principal).toString

	exportCollection: -> @collection

module.exports = IOCollection
