'use strict'
###
 trucolor
 Output Collection
###

console = global.vConsole
deepAssign = require 'deep-assign'
_output = require "./output"

class IOCollection
	constructor: (routes_, options_ = {}) ->
		@collection = new Map()
		console.info "\nDerived Colours"
		for id, color of routes_.fast
			@principal ?= id
			@collection.set id, new _output(color, routes_.attr[id], options_)

	valueOf: ->
		if @collection.size is 1
			"#{@collection.get @principal}"
		else
			primitive = []
			@collection.forEach (value_, key_) ->
				primitive.push "#{key_} #{value_}"
			primitive.join '\n'

	toSGR: -> do @collection.get(@principal).toSGR

	toSwatch: -> do @collection.get(@principal).toSwatch

	toString: -> do @collection.get(@principal).toString

	exportCollection: -> @collection

module.exports = IOCollection
