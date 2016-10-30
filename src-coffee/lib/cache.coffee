'use strict'

_ = require 'lodash'
fs = require 'fs'
path = require 'path'

# default value
DEFAULT =
	LIMIT_BYTES: '100K'
	AUTO_SAVE: true
	FILENAME: path.join process.env.HOME, '/.rgbCache'

# the size units
SIZE_UNITS =
	'B' : 1
	'K' : 1024
	'M' : 1048576
	'G' : 1073741824

# The file size notation convert to bytes.
_getNotationToBytes = (notation) ->
	if not _.isString notation
		throw new Exception "The size notation isn't String type."

	matches = /(\d+)([B|K|M|G])/.exec(notation.toUpperCase())

	if matches?
		return matches[1] * SIZE_UNITS[matches[2]]
	else
		console.log "Could not to exchange the notation."

	return 0

###
	Exception class
###
class Exception
	constructor: (msg) ->
		@msg = msg
		@name = 'Exception'

###
	Cache class
###
class Cache
	constructor: (opt = {}) ->
		@_queue = []
		@_cache = {}

		@limit_bytes = opt.limit_bytes || DEFAULT.LIMIT_BYTES
		@auto_save = opt.auto_save || DEFAULT.AUTO_SAVE
		@filename = opt.filename || DEFAULT.FILENAME


		# Check the cache size is enough to add a new data.
		@_isCouldAdd = (needBytes) ->
			cache_bytes = @content().length
			limit_bytes = @_getNotationToBytes @limit_bytes

			return (cache_bytes + needBytes) < limit_bytes

		# Invoke the package function.
		@_getNotationToBytes = (notation) ->
			return _getNotationToBytes notation


		# Return the length of that the object converts to a  JSON string.
		@_getContentBytes = (obj) ->
			if not _.isObject obj
				throw new Exception "Could not the know the content size , because is not object type."

			return JSON.stringify(obj).length

		# Clean unused cache objects.
		@_gc = (needBytes) ->
			# false if the needBytes big than limit bytes or the cache is empty
			return false if needBytes > @limit_bytes || @_queue.length is 0

			# apply LRU algorithm via Array
			until @_queue.length > 0 and @_isCouldAdd(needBytes)

				releaseKey = @_queue.pop()
				delete @_cache[releaseKey]

			return true

		# Move this key to begin of the queue.
		@_update = (key) ->
			@_queue = _.without @_queue, key
			@_queue.unshift key
			return

		# Calculate how many free size to satisfy this data.
		@_calculateNeedBytes = (key, val) ->
			# current cache size
			cache_bytes = @content().length

			# clone a cache to append new data for calculate size
			clone_q = _.map @_queue, _.clone
			clone_c = _.map @_cache, _.clone
			clone_q.push key
			clone_c[key] = val

			clone_content =
				q: clone_q
				c: clone_c


			return @_getContentBytes(clone_content) - cache_bytes

		# autoload the cache file at first time
		@load(yes)

	# Put data into cache.
	set: (key, val) ->
		needBytes =  @_calculateNeedBytes key, val

		# the key already exist
		if key in @_queue and @_getContentBytes(key:@_cache[key]) <= needBytes
			@_cache[key] = val

			@_update key
			return

		# check the cache buffer size
		if not @_isCouldAdd needBytes
			console.log "Need more cache buffer."

			# remove some data if the cache buffer over than limit bytes.
			@_gc needBytes

		@_update key
		@_cache[key] = val

		# auto save if enable
		@save() if @auto_save is true

		return

	# Get data via key.
	get: (key) ->
		return null if not @_cache[key]?
		@_update key
		return @_cache[key]

	# Write the cache into the file.
	save: ->
		fs.writeFileSync @filename, @content()
		return true


	# Remove the data via key.
	# Clear all data in the cache if you invoke this method without any arguments
	clear: (key) ->
		_isCorrect = false

		# clear all cache objects
		if not key?
			@_cache = {}
			@_queue = []
			_isCorrect = true

		# remove the cache object by key
		if key? and _.has @_cache, key
			@_queue = _.without @_queue, key
			delete @_cache[key]
			_isCorrect = true

		@save() if @auto_save and _isCorrect

		return _isCorrect


	# Load the cache from file.
	load: (hush_) ->
		try
			obj = JSON.parse fs.readFileSync(@filename)
			@_cache = obj.c
			@_queue = obj.q
		catch e
			console.error e.toString() if not hush_?
			return false
		return true

	# Return the number of data in the cache.
	size: ->
		return _.size(@_cache)


	# Return the JSON string of cache.
	content: ->
		_content =
			q: @_queue
			c: @_cache
		return JSON.stringify _content

module.exports = Cache
module.exports.getNotationToBytes = _getNotationToBytes
