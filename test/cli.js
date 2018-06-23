
import shell from 'shelljs'
import test from 'ava'
import pkg from '../package'

const expectedVersion = pkg.version

test.cb(`Module name/version is '${pkg.name} v${expectedVersion}'.`, t => {
	shell.exec('./bin/trucolor -vv', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_.trim(), `${pkg.name} v${expectedVersion}`)
		t.end()
	})
})
