import test from 'ava'
import semverRegex from 'semver-regex'
import {readPackageSync} from 'read-pkg'

const pkg = readPackageSync()

test(`Module version '${pkg.version}' is semver.`, t => {
	t.truthy(semverRegex().test(pkg.version))
})
