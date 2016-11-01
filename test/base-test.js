import test from 'ava'
import semverRegex from 'semver-regex'
import pkg from '../package'
import {metadata} from '..'

const expectedVersion = (pkg.buildNumber === 0 && pkg.version) || `${pkg.version}-Δ${pkg.buildNumber}`

test(`Module version is '${expectedVersion}'.`, t => {
	t.is(`${expectedVersion}`, metadata.version())
})

test(`Module version '${pkg.version}' is semver.`, t => {
	t.truthy(semverRegex().test(metadata.version()))
})
