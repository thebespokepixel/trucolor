'use strict'
###
 trucolor (v0.1.4-alpha.2) 24bit color tools for the command line
 Resolve Colour to simple RGB Array: [ r, g, b ]
###
console = global.vConsole
_named_colors = require './palettes/named'
converter = require 'color-convert'

class Interpreter
	constructor: (raw_) ->

		@source = switch
			when /^[0-9a-f]{3}$/i.test raw_
				input: /^([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec raw_
				human: raw_
				space: 'HEX'

			when /^#[0-9a-fA-F]{3}$/i.test raw_
				input: /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec raw_
				human: raw_
				space: '#HEX'

			when /^[0-9a-fA-F]{6}$/.test raw_
				input: raw_
				human: raw_
				space: 'HEXHEX'

			when /^#[0-9a-f]{6}$/i.test raw_
				input: raw_
				human: raw_
				space: '#HEXHEX'

			when /^rgb[\(:]+\s?\d+,\s?\d+,\s?\d+\s?[\)]*$/.test raw_
				input: raw_.replace(/rgb[\(:]/, '').replace(/[ \)]/g, '').split ','
				human: raw_.replace(/rgb[\(:]/, 'rgb-').replace(/,/g, '-').replace(/[ \)]/g, '')
				space: 'RGB'

			when /^hsl:\d+,\d+,\d+$/.test raw_
				input: raw_.replace(/hsl[\(:]/, '').replace(/[ \)]/g, '').split ','
				human: raw_.replace('hsl:', 'hsl-').replace(/,/g, '-').replace(/[ \)]/g, '')
				space: 'HSL'

			when /^hsv:\d+,\d+,\d+$/.test raw_
				input: raw_.replace(/hsv[\(:]/, '').replace(/[ \)]/g, '').split ','
				human: raw_.replace('hsv:', 'hsv-').replace(/,/g, '-').replace(/[ \)]/g, '')
				space: 'HSV'

			when /^hwb:\d+,\d+,\d+$/.test raw_
				input: raw_.replace(/hwb[\(:]/, '').replace(/[ \)]/g, '').split ','
				human: raw_.replace('hwb:', 'hwb-').replace(/,/g, '-').replace(/[ \)]/g, '')
				space: 'HWB'

			when raw_ in ['normal', 'reset']
				input: raw_
				human: raw_
				space: 'SGR'

			when raw_ in _named_colors
				input: raw_
				human: raw_
				space: 'named'

			else throw new Error "Unrecognised color space: " + raw_

		@RGB = switch @source.space
			when 'HEX'
				r = @source.input[1]
				g = @source.input[2]
				b = @source.input[3]
				@name = String(r + r + g + g + b + b)
				converter.hex2rgb @name
			when '#HEX'
				r = @source.input[1]
				g = @source.input[2]
				b = @source.input[3]
				@name = String(r + r + g + g + b + b)
				converter.hex2rgb @name
			when 'HEXHEX'
				@name = @source.input
				converter.hex2rgb @name
			when '#HEXHEX'
				@name = @source.input
				converter.hex2rgb @name
			when 'RGB'
				@name = converter.rgb2hex @source.input
				converter.hex2rgb @name
			when 'HSL'
				@name = converter.hsl2hex @source.input
				converter.hsl2rgb @source.input
			when 'HSV'
				@name = converter.hsv2hex @source.input
				converter.hsv2rgb @source.input
			when 'HWB'
				@name = converter.hwb2hex @source.input
				converter.hwb2rgb @source.input
			when 'SGR'
				@name = @source.input
				[0,0,0]
			when 'named'
				@name = converter.keyword2hex @source.input
				converter.keyword2rgb @source.input

		console.debug "Colour (#{@name}) RGB:#{@RGB} from #{@source.space} as #{@source.human}"

	getName: -> @name
	getRGB: -> @RGB
	getInput: -> @source.input
	getHuman: -> @source.human
	getSpace: -> @source.space
	toString: -> converter.rgb2hex @RGB

module.exports = Interpreter
