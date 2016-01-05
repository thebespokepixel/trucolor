'use strict'
###
 trucolor (v0.1.2) 24bit color tools for the command line
 Color process object
###
console = global.vConsole

class Processor
	constructor: (@name) ->
		@attrs =
			background: no
			bold: no
			faint: no
			italic: no
			invert: no
			underline: no
			blink: no
		@haveAttrs = no
		@haveSource = no
		@useLess = no
		@prefix = ''
		@suffix = ''
		@namePrefix = ''
		@nameSuffix = ''
		console.debug "\nNew Process:", @name

	setSource: (@interpreter) ->
		@name = do @interpreter.getName
		@haveSource = true
		return

	hasSource: -> @haveSource
	needLess: -> @useLess
	getName: ->
		if @lockName?
			@name = @lockName
		else
			@namePrefix + @name + @nameSuffix
	lock: (@lockName) -> console.debug "Process name locked: #{@lockName}"
	locked: -> @lockName?
	getRGB: ->
		if @haveSource
			do @interpreter.getRGB
		else
			null
	getLess: ->
		"#{@prefix}rgb(#{@interpreter.getRGB()})#{@suffix}"
	getInput: ->
		if @haveSource
			do @interpreter.getInput
		else
			@name
	getHuman: ->
		if @haveSource
			@lockName ? do @interpreter.getHuman
		else
			@lockName ? @name
	hasAttrs: -> @haveAttrs
	getAttrs: -> @attrs
	setAttr: (attr_) ->
		if attr_ in ['background','bold','faint','italic','invert','underline','blink']
			@haveAttrs = yes
			@attrs[attr_] = yes

	background: ->
		@setAttr 'background'
		console.debug "Special::background"
	bold: ->
		@setAttr 'bold'
		console.debug "Special::bold"
	faint: ->
		@setAttr 'faint'
		console.debug "Special::faint"
	italic: ->
		@setAttr 'italic'
		console.debug "Special::italic"
	invert: ->
		@setAttr 'invert'
		console.debug "Special::invert"
	underline: ->
		@setAttr 'underline'
		console.debug "Special::underline"
	blink: ->
		@setAttr 'blink'
		console.debug "Special::blink"

	saturate: (args) ->
		@prefix = "saturate(#{@prefix}"
		@suffix = "#{@suffix}, #{args.percent}%)"
		@namePrefix = "sat-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.percent}"
		@useLess = yes
		console.debug "Process::saturate", args.percent
	desaturate: (args) ->
		@prefix = "desaturate(#{@prefix}"
		@suffix = "#{@suffix}, #{args.percent}%)"
		@namePrefix = "des-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.percent}"
		@useLess = yes
		console.debug "Process::desaturate", args.percent
	lighten: (args) ->
		@prefix = "lighten(#{@prefix}"
		@suffix = "#{@suffix}, #{args.percent}%)"
		@namePrefix = "lte-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.percent}"
		@useLess = yes
		console.debug "Process::lighten", args.percent
	darken: (args) ->
		@prefix = "darken(#{@prefix}"
		@suffix = "#{@suffix}, #{args.percent}%)"
		@namePrefix = "drk-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.percent}"
		@useLess = yes
		console.debug "Process::darken", args.percent
	spin: (args) ->
		@prefix = "spin(#{@prefix}"
		@suffix = "#{@suffix}, #{args.rotation})"
		@namePrefix = "spn-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.rotation}"
		@useLess = yes
		console.debug "Process::spin", args.rotation
	mix: (args) ->
		@prefix = "mix(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color}, 50%)"
		@namePrefix = "mix-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.color}"
		@useLess = yes
		console.debug "Process::mix", args.color
	multiply: (args) ->
		@prefix = "multiply(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@namePrefix = "mul-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.color}"
		@useLess = yes
		console.debug "Process::multiply", args.color
	screen: (args) ->
		@prefix = "screen(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@namePrefix = "scr-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.color}"
		@useLess = yes
		console.debug "Process::screen", args.color
	overlay: (args) ->
		@prefix = "overlay(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@namePrefix = "oly-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.color}"
		@useLess = yes
		console.debug "Process::overlay", args.color
	softlight: (args) ->
		@prefix = "softlight(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@namePrefix = "sft-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.color}"
		@useLess = yes
		console.debug "Process::softlight", args.color
	hardlight: (args) ->
		@prefix = "hardlight(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@namePrefix = "hdl-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.color}"
		@useLess = yes
		console.debug "Process::hardlight", args.color
	difference: (args) ->
		@prefix = "difference(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@namePrefix = "dif-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.color}"
		@useLess = yes
		console.debug "Process::difference", args.color
	exclusion: (args) ->
		@prefix = "exclusion(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@namePrefix = "exc-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.color}"
		@useLess = yes
		console.debug "Process::exclusion", args.color
	average: (args) ->
		@prefix = "average(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@namePrefix = "ave-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.color}"
		@useLess = yes
		console.debug "Process::average", args.color
	negation: (args) ->
		@prefix = "negation(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@namePrefix = "neg-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.color}"
		@useLess = yes
		console.debug "Process::negation", args.color
	contrast: (args) ->
		@prefix = "contrast(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color_dark})" if args.color_dark?
		@suffix = "#{@suffix}, #{args.color_dark}, #{args.color_light})" if args.color_light?
		@suffix = "#{@suffix}, #{args.color_dark}, #{args.color_light}, #{args.threshold}%)" if args.threshold?
		@namePrefix = "cnt-#{@namePrefix}"
		@nameSuffix = "#{@nameSuffix}-#{args.color_dark}"
		@useLess = yes
		console.debug "Process::contrast", args.color_dark, args.color_light, args.threshold

module.exports = Processor
