'use strict'
###
 trucolor (v0.0.11) 24bit color tools for the command line
 Color process object
###

class Process

	type: 'color'
	haveColor: false
	add:
		saturate: (args) ->
			console.log "Process::saturate", args.percent
		desaturate: (args) ->
			console.log "Process::desaturate", args.percent
		lighten: (args) ->
			console.log "Process::lighten", args.percent
		darken: (args) ->
			console.log "Process::darken", args.percent
		spin: (args) ->
			console.log "Process::spin", args.rotation
		mix: (args) ->
			console.log "Process::mix", args.color
		multiply: (args) ->
			console.log "Process::multiply", args.color
		screen: (args) ->
			console.log "Process::screen", args.color
		overlay: (args) ->
			console.log "Process::overlay", args.color
		softlight: (args) ->
			console.log "Process::softlight", args.color
		hardlight: (args) ->
			console.log "Process::hardlight", args.color
		difference: (args) ->
			console.log "Process::difference", args.color
		exclusion: (args) ->
			console.log "Process::exclusion", args.color
		average: (args) ->
			console.log "Process::average", args.color
		negation: (args) ->
			console.log "Process::negation", args.color
		contrast: (args) ->
			console.log "Process::contrast", args.color_dark, args.color_light, args.threshold

	constructor: (@name) ->
		console.log "New Process:", @name
	setName: (@name) ->
		console.log "Process name set:", @name
	setVar: (@name) ->
		console.log "Process set to variable type:", @name
		@type ='variable'
		return
	setColor: (@color) ->
		console.log "Process base color set:", @color
		@haveColor = true
		return

module.exports = Process


