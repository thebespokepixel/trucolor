'use strict'
###
 trucolor (v0.0.20) 24bit color tools for the command line
 Batch Output Processor
###
_ = require 'underscore'
_colorOut = require "./colorOut"
_controller = require './core'
console = global.vconsole
_batch = []

exports.add = (processor_) ->
	_batch.push processor_

exports.run = (callback_) ->
	colorList = {}

	lessLineRawArray = for process_ in _batch
		do (process_) ->
			if process_.type is 'variable'
				if process_.color._type in ['named', 'xxx', '#xxx', 'xxxxxx', '#xxxxxx']
					"#{process_.name}: #{process_.prefix}color(#{process_.color})#{process_.suffix}"
				else
					"#{process_.name}: #{process_.prefix}#{process_.color}#{process_.suffix}"
			else
				inCache = _controller.cacheGet process_.name
				if not inCache
					if process_.color._type in ['named', 'xxx', '#xxx', 'xxxxxx', '#xxxxxx']
						if process_.hasLess is no
							console.info "From declared color: #{process_.name} #{process_.color}"
							colorList[process_.name] = process_.color
							return
						else
							console.info "Adding to Less: #{process_.name} #{process_.color}"
							"#{process_.name}: #{process_.prefix}color(#{process_.color})#{process_.suffix}"

					"#{process_.name}: #{process_.prefix}#{process_.color}#{process_.suffix}"
				else
					console.info "From cache: #{process_.name} #{process_.color}"
					colorList[process_.name] = inCache
					return

	lessLineArray = _.compact lessLineRawArray

	for line_ in lessLineArray
		if line_[0] isnt '@' then lessHasColor = yes

	if lessLineArray.length > 0 and lessHasColor
		inputCSS = "out {\n#{lessLineArray.join ";\n"}\n}"
		if console.canWrite(4)
			console.log ''
			console.log "Compiled Input for Less Processing"
			console.pretty lessLineArray

		_less.render inputCSS
			.then (output_) ->
				rawCSS = output_.css.replace(/^out {/, '{').
					replace(/([0-9a-zA-Z_-]+):\s(#[0-9A-Fa-f]{3,6});/g, '"$1": "$2",').
					replace /,\n}/, '\n}'
				try
					parsedCSS = JSON.parse rawCSS
					for k, v of parsedCSS
						do (k, v) ->
							_controller.cachePut k, v
				catch error
					if console.canWrite 4
						console.trace(error.message)
					else console.error error.message
					process.exit 1
				finalise _.extend(colorList, parsedCSS), callback_
			(error) ->
				if console.canWrite 4
						console.trace(error.message)
					else console.error error.message
					process.exit 1
	else
		finalise colorList, callback_



finalise = (colorList_, callback_) ->
	processedColors = for name_, color_ of colorList_
		new _colorOut name_, color_

	callback_ processedColors
