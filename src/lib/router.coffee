'use strict'
###
 trucolor (v0.0.22) 24bit color tools for the command line
 Processing Path Router
###

_root = require '..'
console = global.vConsole

lessc = require 'less'
deepAssign = require 'deep-assign'
_io = require "./io"

_routingTable = []

exports.add = (processor_) ->
	_routingTable.push processor_
	return processor_

exports.run = (callback_) ->
	fastRoutes = {}
	slowRoutes = {}
	attrRoutes = {}
	cacheIndex = {}

	for process_ in _routingTable
		do (process_) ->
			attrRoutes[process_.getHuman()] = process_.getAttrs()
			if process_.locked()
				if process_.hasSource()
					try _root.cacheClear process_.getName()
					catch
						console.error "Could not clear cache key #{process_.getName()}"
				else
					console.info "Looking up from cache: #{process_.getName()}"

			inCache = _root.cacheGet process_.getName()

			if not inCache
				unless process_.hasSource() or process_.hasAttrs()
					console.error "Could not find cache key #{process_.getName()}"
					process.exit 1

				unless process_.needLess()
					console.info "From declared color: #{process_.getInput()}"
					fastRoutes[process_.getHuman()] = process_.getRGB()

					if process_.locked()
						try _root.cachePut process_.getName(), process_.getRGB()
						catch
							console.error "Could not write cache key #{process_.getName()}: #{process_.getRGB()}"
					return
				else
					console.info "Adding slow route via Less: #{process_.getLess()}"
					cacheIndex[process_.getHuman()] = process_.getName()
					slowRoutes[process_.getHuman()] = process_.getLess()
			else
				console.info "From cache: #{process_.getName()}"
				fastRoutes[process_.getHuman()] = inCache
				return

	if Object.keys(slowRoutes).length > 0
		routeLess = "out {\n#{([].concat "#{name}: #{color}" for name, color of slowRoutes).join ";\n"}\n}"
		console.dir routeLess
		lessc
			.render routeLess
			.then (output_) ->
				jsonify = JSON.parse(output_.css
							.replace /^out {/, '{'
							.replace /([0-9a-zA-Z_-]+):\s(#[0-9A-Fa-f]{3,6});/g, '"$1": "$2",'
							.replace /,\n}/, '\n}')

				_root.cachePut cacheIndex[id], content for id, content of jsonify
				finalise deepAssign(fastRoutes, jsonify), attrRoutes, callback_
			(error) -> abort error
	else
		finalise fastRoutes, attrRoutes, callback_

abort = (error) ->
	if console.canWrite 4 then console.trace error
	else console.error error.message
	process.exit 1


finalise = (routes_, attrs_, callback_) ->
	io = new _io
	for id, content of routes_
		io.addInput id, content, attrs_[id]
	do io.shrinkwrap
	callback_ io
