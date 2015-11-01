'use strict'

_ = require 'underscore'
fs = require 'fs'

# default value
DEFAULT =
	LIMIT_BYTES: '100K'
	AUTO_SAVE: false
	FILENAME: 'ds_cache.json'

# the size units
SIZE_UNITS =
	'B' : 1
	'K' : 1024
	'M' : 1048576
	'G' : 1073741824

# ###
# The file size notation convert to bytes.

# @example Rule
# 	100K = 100 * 1024 Bytes

# @param notation [String] the file size notation.
# @return [Number] file size (bytes) .
# @private
# ###
_getNotationToBytes = (notation) ->
	if not _.isString notation
		throw new Exception "The size notation isn't String type."

	notation = notation.toUpperCase()

	pattern = /(\d+)([B|K|M|G])/
	matches = pattern.exec(notation)

	if matches?
		return matches[1] * SIZE_UNITS[matches[2]]
	else
		console.log "Could not to exchange the notation."

	return 0

# ###
# Exception class
# ###
class Exception
	constructor: (msg) ->
		@msg = msg
		@name = 'Exception'

# ###
# Cache class
# ###
class Cache

# ###
# Constructor function.
# @param opt [Object]  options
# @option opt [String] limit_bytes    limit the cache file size. Default: '100K'
# @option opt [Boolean] auto_save     enable auto save cache. Default: false
# @option opt [String] filename       full name of save file. Default: 'ds_cache.json'
# ###
	constructor: (opt) ->
		opt = {} if not opt?
		@_queue = []
		@_cache = {}

		# @todo check the unit of size (K,M,G)
		@limit_bytes = opt.limit_bytes || DEFAULT.LIMIT_BYTES
		@auto_save = opt.auto_save || DEFAULT.AUTO_SAVE
		@filename = opt.filename || DEFAULT.FILENAME


# private method begin

# ###
# Check the cache size is enough to add a new data.
# @param needBytes [Number] need the free size
# @return [Boolean] true if enough, otherwise false.
# @private
# ###
		@_isCouldAdd = (needBytes) ->
			cache_bytes = @content().length
			limit_bytes = @_getNotationToBytes @limit_bytes

			return (cache_bytes + needBytes) < limit_bytes

# ###
# Invoke the package function.
# @param notation [String] the file size notation.
# @return [Number] file size (bytes) .
# @private
# ###
		@_getNotationToBytes = (notation) ->
			return _getNotationToBytes notation

# ###
# Return the length of that the object converts to a  JSON string.
# @param obj [Object] the object.
# @return [Number] the length of the object converts to a JSON string.
# ###
		@_getContentBytes = (obj) ->
			if not _.isObject obj
				throw new Exception "Could not the know the content size , because is not object type."

			return JSON.stringify(obj).length

# ###
# Clean unused cache objects.
# @param needBytes [Number] need the free size
# @return [Boolean] true if clean up success, otherwise false.
# ###
		@_gc = (needBytes) ->
			# false if the needBytes big than limit bytes or the cache is empty
			return false if needBytes > @limit_bytes || @_queue.length is 0

			# apply LRU algorithm via Array
			until @_queue.length > 0 and @_isCouldAdd(needBytes)

				releaseKey = @_queue.pop()
				delete @_cache[releaseKey]

			return true

# ###
# Move this key to begin of the queue.
# @param key [String] update the quere content via the key.
# @private
# ###
		@_update = (key) ->
			@_queue = _.without @_queue, key
			@_queue.unshift key
			return

# ###
# Calculate how many free size to satisfy this data.
# @param key [String] the key of data
# @param val [Object] the value of data
# @return [Number] require free size.
# @private
# ###
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

		# private method end

		# autoload the cache file at first time
		@load()

# ###
# Put data into cache.

# @example
# 	cache.set('name','Donald');

# @param key [String] the key of data.
# @param val [Object] the value of data.
# ###
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

# ###
# Catch data via key.
# @example
# 	cache.get('name');
# @param key [String] the key that you want to catch the data.
# @return [Object] the value via Key, otherwise return null if the key not exist.
# ###
	get: (key) ->
		return null if not @_cache[key]?

		@_update key
		return @_cache[key]


# Write the cache into the file.
# @return [Boolean] true.
# @todo modify the return value .
	save: ->
		fs.writeFileSync(@filename, @content())
		return true


# Remove the data via key. Clear all data in the cache if you invoke this method without any arguments
# @example
# 	cache.clear('name');
# 	// or
# 	cache.clear();
# @param key [String] optional. You could remove the data by key, either remove all data without any arguments.
# @return [Boolean] true if clear success, otherwise false.
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
# @return [Boolean] true if success, otherwise false.
	load: ->
		try
			obj = JSON.parse fs.readFileSync(@filename)
			@_cache = obj.c
			@_queue = obj.q

		catch e
			console.log e.toString()
			return false

		return true

# Return the number of data in the cache.
# @return [Number] the number of cache object.
	size: ->
		return _.size(@_cache)


# Return the JSON string of cache.
# @return [String] the JSON string.
	content: ->
		_content =
			q: @_queue
			c: @_cache

		return JSON.stringify _content

module.exports = Cache
module.exports.getNotationToBytes = _getNotationToBytes
