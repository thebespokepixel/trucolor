'use strict'
###
 trucolor
 Color Output
###
console =          global.vConsole
_package =         require '../package.json'
terminalFeatures = require 'term-ng'
converter =        require 'color-convert'
SGRcomposer =      require 'sgr-composer'

colorOptionsSelected = _package.config.cli.selected
colorOptions =     _package.config.cli[colorOptionsSelected]
colorLevel =       terminalFeatures.color.level ? 0

class Output
	constructor: (color_, styles_, options_ = {}) ->
		@hasRGB = no
		if color_?
			styles_.color = switch
				when /^[#][0-9a-f]{6}$/i.test color_
					@hasRGB = yes
					converter.hex.rgb color_
				when Array.isArray color_
					@hasRGB = yes
					color_
				when color_ in ['reset', 'normal']
					@hasReset = yes
					color_
				else throw new Error "Unrecognised color: #{color_}"

		if global.trucolor_CLI_type? and global.trucolor_CLI_type not in ['default', colorOptionsSelected]
			colorOptionsSelected = global.trucolor_CLI_type
			colorOptions = _package.config.cli[colorOptionsSelected]

		@_buffer = new SGRcomposer options_.force ? colorLevel, styles_

		console.info if @hasRGB
			style = if style = @_buffer.style
				sgr = @_buffer.sgr()
				" + #{sgr.in}#{style}#{sgr.out}"
			else ''
			"Color:\tR:#{@_buffer.red}\tG:#{@_buffer.green}\tB:#{@_buffer.blue}\t#{@toSwatch()}#{style}"
		else if @hasReset
			"Reset: #{@_buffer.color} #{@toSwatch()}"
		else
			sgr = @_buffer.sgr()
			"Style: #{sgr.in}#{@_buffer.style}#{sgr.out}"

	valueOf: ->
		if global.trucolor_CLI_type?
			styling = (colorOptions[style] for style in @_buffer.styleArray).join ' '
			styling += ' ' if styling.length
			if @hasRGB
				switch colorOptions.color
					when 'hex' then "#{styling}#{@_buffer.hex}"
					else "#{@_buffer.red} #{@_buffer.green} #{@_buffer.blue}"
			else if @hasReset
				switch @_buffer.color
					when 'normal' then colorOptions.normal
					else colorOptions.reset
			else
				@_buffer.sgr().in
		else if @hasRGB
			@_buffer.hex
		else if @hasReset
			@_buffer.color
		else
			@_buffer.sgr().in

	toString: ->
		if @hasRGB
			"rgb(#{@_buffer.red}, #{@_buffer.green}, #{@_buffer.blue}" + ')'
		else if @hasReset
			@_buffer.color
		else
			colorOptions.reset

	toSwatch: ->
		sgr = @_buffer.sgr ['bold','italic','underline','invert']
		if colorLevel > 0
			"#{sgr.in}\u2588\u2588#{sgr.out}"
		else ''

	toSGR: -> @_buffer.sgr()

module.exports = Output
