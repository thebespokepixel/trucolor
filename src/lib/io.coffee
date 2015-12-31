'use strict'
###
 trucolor (v0.0.24) 24bit color tools for the command line
 Output Collection
###

console = global.vConsole
_output = require "./output"

class IOCollection
	constructor: ->
		@shrinkwrapped = no
		@collection = new Map()

	addInput: (id_, content_, attrs_) ->
		unless @shrinkwrapped
			@principal ?= id_
			@collection.set id_, new _output(content_, attrs_)
		else throw new Error "Can't add new items to a shrinkwrapped IOCollection"

	shrinkwrap: ->
		unless @collection.size is 0
			@shrinkwrapped = yes
		else throw new Error "Can't shrinkwrap an empty IOCollection"

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

	toString: -> do @collection.get(@principal).toString

module.exports = IOCollection
