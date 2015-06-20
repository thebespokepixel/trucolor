'use strict'
###
 trucolor (v0.0.6-45) 24bit color tools for the command line
 Color Parser
###
_ = require "lodash"
_named_colors = require "../node_modules/less/lib/less/data/colors"

class Color
	_type: false

	constructor: (raw) ->
		@_type = switch
			when raw.match(/^#[0-9a-fA-F]{6}$/) then '#xxxxxx'
			when raw.match(/^#[0-9a-fA-F]{3}$/) then '#xxx'
			when raw.match(/^[0-9a-fA-F]{6}$/) then 'xxxxxx'
			when raw.match(/^[0-9a-fA-F]{3}$/) then 'xxx'
			when raw.match(/^rgb,\s?\d+,\s?\d+,\s?\d+$/) then 'rgb'
			when raw.match(/^hsl,\s?\d+,\s?\d+,\s?\d+$/) then 'hsl'
			when raw.match(/^hsv,\s?\d+,\s?\d+,\s?\d+$/) then 'hsv'
			when _.has(_named_colors, raw) then do ->
				return 'named'

		if @_type
			@_base_color = raw
			console.log 'Color', @_base_color, 'type', @_type
		else
			throw "Unrecognised color: " + raw


module.exports = Color
