'use strict'
###
 trucolor (v0.0.18) 24bit color tools for the command line
 Color Output Parser
###
console = global.vconsole

class ColorOut
	constructor: (@name, @_hex) ->

		console.debug "Colour out: #{@name}: #{@_hex}"
		switch
			when @name.match 'bg-' then @isBackground = yes
			when @name.match 'bg-' then @isBold = yes
			when @name.match 'ft-' then @isFaint = yes
			when @name.match 'so-' then @isStandout = yes
			when @name.match 'in-' then @isBackground = yes
		rgb = switch
			when @_hex.toString().match /^[#][0-9a-fA-F]{6}$/
				JSON.parse @_hex.toString().replace /^[#]([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/, '{"red": "0x$1", "green": "0x$2", "blue": "0x$3" }'
			when @_hex.toString().match /^[#][0-9a-fA-F]{3}$/
				JSON.parse @_hex.toString().replace /^[#]([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])$/, '{"red": "0x$1$1", "green": "0x$2$2", "blue": "0x$3$3" }'

		@red = parseInt(rgb.red, 16)
		@green = parseInt(rgb.green, 16)
		@blue = parseInt(rgb.blue, 16)

	valueOf: ->
		@_hex

	toString: ->
		"rgb(#{@red},#{@green},#{@blue})"

	toSGR: ->
		if supportsColor.has16m
			"\x1b[38;2;#{@red};#{@green};#{@blue}m"
		else


	toHex: ->
		@_hex

	toRGB: ->

module.exports = ColorOut
