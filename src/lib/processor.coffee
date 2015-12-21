'use strict'
###
 trucolor (v0.0.18) 24bit color tools for the command line
 Color process object
###
console = global.vconsole

class Processor
	constructor: (@name) ->
		@type = 'color'
		@haveColor = no
		@hasLess = no
		@prefix = ''
		@suffix = ''
		console.debug "\nNew Process:", @name

	setName: (@name) ->
		console.debug "Process name set:", @name

	setVar: (varname_) ->
		@name = "#{varname_}"
		@type ='variable'
		console.debug "Variable set:", varname_
		return

	setColor: (@color) ->
		console.debug "Process base color set:", @color
		if @name.match /color_[0-9]+/
			console.debug "Color renamed:", @name, @color._name
			@name = @name.replace(/color_[0-9]+/, "#{@color._name}")

		@haveColor = true
		return

	background: ->
		@name = "bg-#{@name}"
		console.debug "Special::background"
	bold: ->
		@name = "bd-#{@name}"
		console.debug "Special::bold"
	faint: ->
		@name = "ft-#{@name}"
		console.debug "Special::faint"
	standout: ->
		@name = "so-#{@name}"
		console.debug "Special::bold"
	inverse: ->
		@name = "in-#{@name}"
		console.debug "Special::bold"

	saturate: (args) ->
		@prefix = "saturate(#{@prefix}"
		@suffix = "#{@suffix}, #{args.percent}%)"
		@name = "sat-#{@name}-#{args.percent}"
		@hasLess = yes
		console.debug "Process::saturate", args.percent
	desaturate: (args) ->
		@prefix = "desaturate(#{@prefix}"
		@suffix = "#{@suffix}, #{args.percent}%)"
		@name = "des-#{@name}-#{args.percent}"
		@hasLess = yes
		console.debug "Process::desaturate", args.percent
	lighten: (args) ->
		@prefix = "lighten(#{@prefix}"
		@suffix = "#{@suffix}, #{args.percent}%)"
		@name = "lte-#{@name}-#{args.percent}"
		@hasLess = yes
		console.debug "Process::lighten", args.percent
	darken: (args) ->
		@prefix = "darken(#{@prefix}"
		@suffix = "#{@suffix}, #{args.percent}%)"
		@name = "drk-#{@name}-#{args.percent}"
		@hasLess = yes
		console.debug "Process::darken", args.percent
	spin: (args) ->
		@prefix = "spin(#{@prefix}"
		@suffix = "#{@suffix}, #{args.rotation})"
		@name = "spn-#{@name}-#{args.rotation}"
		@hasLess = yes
		console.debug "Process::spin", args.rotation
	mix: (args) ->
		@prefix = "mix(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color}, 50%)"
		@name = "mix-#{@name}-#{args.color}"
		@hasLess = yes
		console.debug "Process::mix", args.color
	multiply: (args) ->
		@prefix = "multiply(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@name = "mul-#{@name}-#{args.color}"
		@hasLess = yes
		console.debug "Process::multiply", args.color
	screen: (args) ->
		@prefix = "screen(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@name = "scr-#{@name}-#{args.color}"
		@hasLess = yes
		console.debug "Process::screen", args.color
	overlay: (args) ->
		@prefix = "overlay(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@name = "oly-#{@name}-#{args.color}"
		@hasLess = yes
		console.debug "Process::overlay", args.color
	softlight: (args) ->
		@prefix = "softlight(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@name = "sft-#{@name}-#{args.color}"
		@hasLess = yes
		console.debug "Process::softlight", args.color
	hardlight: (args) ->
		@prefix = "hardlight(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@name = "hdl-#{@name}-#{args.color}"
		@hasLess = yes
		console.debug "Process::hardlight", args.color
	difference: (args) ->
		@prefix = "difference(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@name = "dif-#{@name}-#{args.color}"
		@hasLess = yes
		console.debug "Process::difference", args.color
	exclusion: (args) ->
		@prefix = "exclusion(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@name = "exc-#{@name}-#{args.color}"
		@hasLess = yes
		console.debug "Process::exclusion", args.color
	average: (args) ->
		@prefix = "average(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@name = "ave-#{@name}-#{args.color}"
		@hasLess = yes
		console.debug "Process::average", args.color
	negation: (args) ->
		@prefix = "negation(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color})"
		@name = "neg-#{@name}-#{args.color}"
		@hasLess = yes
		console.debug "Process::negation", args.color
	contrast: (args) ->
		@prefix = "contrast(#{@prefix}"
		@suffix = "#{@suffix}, #{args.color_dark})" if args.color_dark?
		@suffix = "#{@suffix}, #{args.color_dark}, #{args.color_light})" if args.color_light?
		@suffix = "#{@suffix}, #{args.color_dark}, #{args.color_light}, #{args.threshold}%)" if args.threshold?
		@name = "cnt-#{@name}-#{args.color_dark}"
		@hasLess = yes
		console.debug "Process::contrast", args.color_dark, args.color_light, args.threshold

module.exports = Processor
