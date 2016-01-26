'use strict'
vows = require  'vows'
assert = require  'assert'
semverRegex = require 'semver-regex'
_package = require '../package.json'
trucolor = require '..'

vows
	.describe("#{_package.name} module")
	.addBatch
		'Module':
			"name is #{_package.name}?":
				topic: trucolor.getName()
				"#{_package.name}": (topic) ->
					assert topic is _package.name

	.addBatch
		'Module version':
			"is semver?":
				topic: trucolor.getVersion 1
				"#{_package.version} matches semver-regex": (topic) ->
					assert.isTrue semverRegex().test topic

			"is #{_package.version}?":
				topic: trucolor.getVersion 1
				"Should === #{_package.version}": (topic) ->
					assert topic is _package.version

			"(long) is #{_package.name} v#{_package.version}":
				topic: trucolor.getVersion 2
				"Should === #{_package.name} v#{_package.version}": (topic) ->
					assert topic is "#{_package.name} v#{_package.version}"

.export(module)
