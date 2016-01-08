'use strict'
###
 trucolor
 Color Output
###
console = global.vConsole
terminalFeatures = require 'term-ng'
converter = require 'color-convert'

sgr =
	start: [
		''
		'\x1b['
		'\x1b['
		'\x1b['
	][terminalFeatures.color.level ? 0]
	normal: '39;49'
	reset: '0'
	mode: [
		''
		''
		'5'
		'2'
	][terminalFeatures.color.level ? 0]
	bold:
		in:  '1'
		out: '22'
	faint:
		in:  '2'
		out: '22'
	italic:
		in:  '3'
		out: '23'
	underline:
		in:  '4'
		out: '24'
	blink:
		in:  '5'
		out: '25'
	invert:
		in:  '7'
		out: '27'
	end: 'm'

class Output
	constructor: (rgbIn, @attrs) ->
		if rgbIn?
			if /^[0-9a-f]{6}$/i.test rgbIn
				@rgb = converter.hex.rgb rgbIn
				@hex = rgbIn
			else if /^#[0-9a-f]{6}$/i.test rgbIn
				@rgb = converter.hex.rgb rgbIn
				@hex = rgbIn[1..]
			else
				@rgb = rgbIn
				@hex = converter.rgb.hex rgbIn

			@red = @rgb[0]
			@green = @rgb[1]
			@blue = @rgb[2]

			console.info "Colour:\tR:#{@red}\tG:#{@green}\tB:#{@blue}\t#{@swatch()}"

	valueOf: -> @hex ? 'normal'

	toString: ->
		if @rgb?
			"rgb(#{@red}, #{@green}, #{@blue})"
		else
			"normal"

	swatch: ->
		outSGR = []
		if @attrs.faint then outSGR.push sgr.faint.in
		if @attrs.blink then outSGR.push sgr.blink.in
		if @rgb? and terminalFeatures.color.level?
			sgr.code = [
				''
				converter.rgb.ansi16 @rgb
				converter.rgb.ansi256 @rgb
				@rgb.join ';'
			][terminalFeatures.color.level ? 0]
			sgr.selector = [
				''
				''
				"38;#{sgr.mode};"
				"38;#{sgr.mode};"
			][terminalFeatures.color.level ? 0]
			outSGR.unshift (sgr.selector + sgr.code)
		if outSGR.length > 0 and terminalFeatures.color.level?
			"#{sgr.start + (outSGR.join ';') + sgr.end}\u2588\u2588#{sgr.start + sgr.reset + sgr.end}"
		else ""

	hasAttr: -> @attrs.bold or @attrs.faint or @attrs.italic or @attrs.invert or @attrs.underline or @attrs.blink

	SGRin: ->
		outSGR = []
		if @attrs.bold then outSGR.push sgr.bold.in
		if @attrs.faint then outSGR.push sgr.faint.in
		if @attrs.italic then outSGR.push sgr.italic.in
		if @attrs.invert then outSGR.push sgr.invert.in
		if @attrs.underline then outSGR.push sgr.underline.in
		if @attrs.blink then outSGR.push sgr.blink.in

		if @rgb? and terminalFeatures.color.level?
			sgr.code = [
				''
				converter.rgb.ansi16 @rgb
				converter.rgb.ansi256 @rgb
				@rgb.join ';'
			][terminalFeatures.color.level ? 0]

			unless @attrs.background
				sgr.selector = [
					''
					''
					"38;#{sgr.mode};"
					"38;#{sgr.mode};"
				][terminalFeatures.color.level ? 0]
			else
				sgr.selector = [
					''
					''
					"48;#{sgr.mode};"
					"48;#{sgr.mode};"
				][terminalFeatures.color.level ? 0]

			outSGR.unshift sgr.selector + sgr.code

		if outSGR.length > 0 and terminalFeatures.color.level?
			sgr.start + (outSGR.join ';') + sgr.end
		else ""

	SGRout: ->
		outSGR = []
		if @attrs.bold then outSGR.push sgr.bold.out
		if @attrs.faint then outSGR.push sgr.faint.out
		if @attrs.italic then outSGR.push sgr.italic.out
		if @attrs.invert then outSGR.push sgr.invert.out
		if @attrs.underline then outSGR.push sgr.underline.out
		if @attrs.blink then outSGR.push sgr.blink.out

		outSGR.unshift sgr.normal if @rgb?

		if outSGR.length > 0 and terminalFeatures.color.level?
			sgr.start + (outSGR.join ';') + sgr.end
		else ""

module.exports = Output
