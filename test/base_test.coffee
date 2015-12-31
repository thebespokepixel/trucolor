'use strict'
vows = require  'vows'
assert = require  'assert'
_package = require '../package.json'
testSubject = require('../../trucolor')

vows
	.describe("#{_package.name} module")
	.addBatch
		'Module':
			"name is #{_package.name}?":
				topic: testSubject.getName()
				"#{_package.name}": (topic) ->
					assert topic is _package.name

	.addBatch
		'Module version':
			"is semvar?":
				topic: testSubject.getVersion 1
				"#{_package.version} matches /[0-9]+.[0-9]+.[0-9]+[0-9a-z.-]*/": (topic) ->
					assert.match topic, /[0-9]+.[0-9]+.[0-9]+[0-9a-z.-]*/

			"is #{_package.version}?":
				topic: testSubject.getVersion 1
				"Should === #{_package.version}": (topic) ->
					assert topic is _package.version

			"(long) is #{_package.name} v#{_package.version}":
				topic: testSubject.getVersion 2
				"Should === #{_package.name} v#{_package.version}": (topic) ->
					assert topic is "#{_package.name} v#{_package.version}"

.export(module)
