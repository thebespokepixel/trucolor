'use strict';
var vows = require('vows'),
	assert = require('assert'),
	trucolor = require('../../trucolor')

vows.describe('trucolor node module').addBatch({
	'Get version': {
		'Short version number?': {
			topic: trucolor.getVersion(),
			'Should result in a short version number x.x.x-x': function (topic) {
				assert.match(topic, /[0-9]+.[0-9]+.[0-9]+[0-9-]*/)
			}
		},
		'Long version message?': {
			topic: trucolor.getVersion(true),
			'Should result in a version message: trucolor vx.x.x-x': function (topic) {
				assert.match(topic, /@thebespokepixel\/trucolor v[0-9]+.[0-9]+.[0-9]+[0-9-]*/)
			}
		},
	}
}).export(module);
