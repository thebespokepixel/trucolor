'use strict'
###
 trucolor
 Processing Path Router
###

trucolor = require '..'
console = global.vConsole
less = require 'less'
converter = require 'color-convert'
_io = require './io'
assert = require 'assert'


_routingTable = []

processRoutes = () ->
	routes =
		fast: {}
		slow: {}
		less: {}
		attr: {}
		cidx: {}

	console.debug "\nProcessing routes"
	for process_ in _routingTable
		name_ = process_.getName()
		humanName_ = process_.getHuman()

		routes.attr[humanName_] = process_.getAttrs()
		if process_.locked() and process_.hasSource()
			trucolor.cacheClear name_

		inCache = trucolor.cacheGet name_

		if not inCache
			unless process_.hasSource() or process_.hasAttrs()
				console.error "Could not find cache key #{name_}"
				process.exit 1

			unless process_.needLess()
				console.debug "From declared color: #{process_.getInput()}"
				routes.fast[humanName_] = process_.getRGB()
				trucolor.cachePut name_, process_.getRGB() if process_.locked()
			else
				console.debug "Adding slow route via Less: #{process_.getLess()}"
				routes.cidx[humanName_] = name_
				routes.slow[humanName_] = process_.getLess()
		else
			console.debug "From cache: #{name_}"
			routes.fast[humanName_] = inCache

	return routes

exports.reset = ->
	_routingTable = []

exports.add = (processor_) ->
	_routingTable.push processor_
	return processor_

exports.run = (callback_) ->
	routing = processRoutes()
	if Object.keys(routing.slow).length > 0
		lessIn = "out {\n#{([].concat "#{name}: #{color}" for name, color of routing.slow).join '; '};\n}"
		less.render lessIn, {}, (err, output_) ->


			routing.less = JSON.parse(output_.css
				.replace /^out {/, '{'
				.replace /([0-9a-zA-Z_-]+):\s(#[0-9A-Fa-f]{3,6});/g, '"$1": "$2",'
				.replace /,\n}/, '\n}')

			for id, content of routing.less
				routing.fast[id] = converter.hex.rgb content
				trucolor.cachePut(routing.cidx[id], routing.fast[id])

			callback_ new _io routing
	else
		callback_ new _io routing

