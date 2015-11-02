'use strict'
###
 trucolor (v0.0.17) 24bit color tools for the command line
 Color Demand Parser
###
console = global.vconsole
_named_colors = require "../node_modules/less/lib/less/data/colors"

class ColorIn
	constructor: (raw) ->
		@_type = switch
			when raw.match(/^#[0-9a-fA-F]{6}$/)          then '#xxxxxx'
			when raw.match(/^#[0-9a-fA-F]{3}$/)          then '#xxx'
			when raw.match(/^[0-9a-fA-F]{6}$/)           then 'xxxxxx'
			when raw.match(/^[0-9a-fA-F]{3}$/)           then 'xxx'
			when raw.match(/^rgb,\s?\d+,\s?\d+,\s?\d+$/) then 'rgb'
			when raw.match(/^hsl,\s?\d+,\s?\d+,\s?\d+$/) then 'hsl'
			when raw.match(/^hsv,\s?\d+,\s?\d+,\s?\d+$/) then 'hsv'
			when raw.match(/^@\w+$/)                     then 'var'
			when _named_colors[raw]                      then 'named'
			else throw new Error "Unrecognised color: " + raw

		arg = raw.split ','

		@_base_color = switch @_type
			when '#xxxxxx', '#xxx'
				@_name = "x#{arg[0][1..]}"
				"#{arg[0]}"
			when 'xxxxxx', 'xxx'
				@_name = "x#{arg[0]}"
				"##{arg[0]}"
			when 'rgb'
				@_name = ("rgb#{arg[1].toString 16}#{arg[2].toString 16}#{arg[3].toString 16}").replace(/0x/g, '')
				"rgb(#{arg[1]}, #{arg[2]}, #{arg[3]})"
			when 'hsl'
				@_name = ("hsl#{arg[1]}-#{arg[2]}-#{arg[3]}").replace(/0x/g, '')
				"hsl(#{arg[1]}, #{arg[2]}%, #{arg[3]}%)"
			when 'hsv'
				@_name = ("hsv#{arg[1]}-#{arg[2]}-#{arg[3]}").replace(/0x/g, '')
				"hsv(#{arg[1]}, #{arg[2]}%, #{arg[3]}%)"
			when 'named'
				@_name = arg[0]
				"#{_named_colors[arg[0]]}"
			when 'var'
				@_name = arg[0]
				"#{arg[0]}"

		console.debug 'Colour in: name:', @_name, 'color:', @_base_color, 'type:', @_type

	valueOf: ->
		@_base_color

	toString: ->
		@_base_color



module.exports = ColorIn
