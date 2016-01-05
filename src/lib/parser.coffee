'use strict'
###
 trucolor (v0.1.0) : 24bit color tools for the command line
 Command parser
###

_root = require("../index")
console = global.vConsole
current_auto_name = 1

module.exports = (tokens_) ->

	current_processor = _root.newProcessor "color_#{current_auto_name++}"

	until tokens_.length == 0
		token = do tokens_.shift

		switch token
			# Character types
			when 'background'
				do current_processor.background
			when 'bold'
				do current_processor.bold
			when 'faint'
				do current_processor.faint
			when 'italic'
				do current_processor.italic
			when 'invert'
				do current_processor.invert
			when 'underline'
				do current_processor.underline
			when 'blink'
				do current_processor.blink

			# Colour processes
			when 'saturate', 'sat'
				current_processor.saturate
					percent: do tokens_.shift
			when 'desaturate', 'desat'
				current_processor.desaturate
					percent: do tokens_.shift
			when 'light'
				current_processor.lighten
					percent: 20
			when 'dark'
				current_processor.darken
					percent: 20
			when 'lighten'
				current_processor.lighten
					percent: do tokens_.shift
			when 'darken'
				current_processor.darken
					percent: do tokens_.shift
			when 'spin'
				current_processor.spin
					rotation: do tokens_.shift
			when 'mix'
				current_processor.mix
					color: do tokens_.shift
			when 'multiply'
				current_processor.multiply
					color: do tokens_.shift
			when 'screen'
				current_processor.screen
					color: do tokens_.shift
			when 'overlay'
				current_processor.overlay
					color: do tokens_.shift
			when 'softlight', 'soft'
				current_processor.softlight
					color: do tokens_.shift
			when 'hardlight', 'hard'
				current_processor.hardlight
					color: do tokens_.shift
			when 'difference', 'diff'
				current_processor.difference
					color: do tokens_.shift
			when 'exclusion', 'excl'
				current_processor.exclusion
					color: do tokens_.shift
			when 'average', 'ave'
				current_processor.average
					color: do tokens_.shift
			when 'negation', 'not'
				current_processor.negation
					color: do tokens_.shift
			when 'contrast'
				current_processor.contrast
					color_dark: do tokens_.shift if commands[0]?
					color_light: do tokens_.shift if commands[0]?
					threshold: do tokens_.shift if commands[0]?
			else
				if /^[A-Za-z0-9_-]+:$/.test token
					if do current_processor.hasSource
						current_processor = _root.newProcessor "color_#{current_auto_name++}"
					current_processor.lock token[..-2]
				else
					if do current_processor.hasSource
						current_processor = _root.newProcessor "color_#{current_auto_name++}"
					current_processor.setSource _root.interpret token
