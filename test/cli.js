import {exec} from 'child_process'
import test from 'ava'
import pkg from '../package'

const expectedVersion = pkg.version

test.cb(`Module name/version is '${pkg.name} v${expectedVersion}'.`, t => {
	exec('./bin/trucolor -vv', (code_, out_) => {
		t.is(code_, null)
		t.is(out_.trim(), `${pkg.name} v${expectedVersion}`)
		t.end()
	})
})
