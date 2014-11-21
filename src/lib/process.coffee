'use strict'
###
 trucolor (v0.0.6-38) 24bit color tools for the command line
 Color process object
###

class Process
	type: 'color'
	haveColor: false
	add:
		saturate: (args) ->
			verbose? and console.log "Process::saturate", args.percent
		desaturate: (args) ->
			verbose? and console.log "Process::desaturate", args.percent
		lighten: (args) ->
			verbose? and console.log "Process::lighten", args.percent
		darken: (args) ->
			verbose? and console.log "Process::darken", args.percent
		spin: (args) ->
			verbose? and console.log "Process::spin", args.rotation
		mix: (args) ->
			verbose? and console.log "Process::mix", args.color
		multiply: (args) ->
			verbose? and console.log "Process::multiply", args.color
		screen: (args) ->
			verbose? and console.log "Process::screen", args.color
		overlay: (args) ->
			verbose? and console.log "Process::overlay", args.color
		softlight: (args) ->
			verbose? and console.log "Process::softlight", args.color
		hardlight: (args) ->
			verbose? and console.log "Process::hardlight", args.color
		difference: (args) ->
			verbose? and console.log "Process::difference", args.color
		exclusion: (args) ->
			verbose? and console.log "Process::exclusion", args.color
		average: (args) ->
			verbose? and console.log "Process::average", args.color
		negation: (args) ->
			verbose? and console.log "Process::negation", args.color
		contrast: (args) ->
			verbose? and console.log "Process::contrast", args.color_dark, args.color_light, args.threshold

	constructor: (@name) ->
		verbose? and console.log "New Process:", @name
	setName: (@name) ->
		verbose? and console.log "Process name set:", @name
	setVar: (@name) ->
		verbose? and console.log "Process set to variable type:", @name
		@type ='variable'
	setColor: (@color) ->
		verbose? and console.log "Process base color set:", @color
		@haveColor = true

module.exports = Process


