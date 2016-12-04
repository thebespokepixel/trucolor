
import shell from 'shelljs'
import test from 'ava'

test.cb(`Named color is red = ff0000`, t => {
	shell.exec('./bin/trucolor --color=16m red', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, 'ff0000')
		t.end()
	})
})

test.cb(`Named color is green = 008000`, t => {
	shell.exec('./bin/trucolor --color=16m green', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, '008000')
		t.end()
	})
})

test.cb(`Named color is blue = 0000ff`, t => {
	shell.exec('./bin/trucolor --color=16m blue', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, '0000ff')
		t.end()
	})
})

test.cb(`rgb:128,0,128 = 800080`, t => {
	shell.exec('./bin/trucolor --color=16m rgb:128,0,128', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, '800080')
		t.end()
	})
})

test.cb(`hsl:120,100,50 = 00ff00`, t => {
	shell.exec('./bin/trucolor --color=16m hsl:120,100,50', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, '00ff00')
		t.end()
	})
})

test.cb(`hwb:240,0,0 = 0000ff`, t => {
	shell.exec('./bin/trucolor --color=16m hwb:240,0,0', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, '0000ff')
		t.end()
	})
})

test.cb(`rgb:128,0,128 lighten 10 spin 5 = a400b3`, t => {
	shell.exec('./bin/trucolor --color=16m rgb:128,0,128 lighten 10 spin 5', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, 'a400b3')
		t.end()
	})
})

test.cb(`hsl:120,100,50 desaturate 50 = 40bf40`, t => {
	shell.exec('./bin/trucolor --color=16m hsl:120,100,50 desaturate 50', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, '40bf40')
		t.end()
	})
})

test.cb(`blanchedalmond spin -195 lighten 5 desaturate 10 = e8ebfe`, t => {
	shell.exec('./bin/trucolor --color=16m blanchedalmond spin -195 lighten 5 desaturate 10', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, 'e8ebfe')
		t.end()
	})
})

test.cb(`bold red = --bold ff0000`, t => {
	shell.exec('./bin/trucolor --color=16m bold red', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, '--bold ff0000')
		t.end()
	})
})

test.cb(`red as rgb() = rgb(255, 0, 0)`, t => {
	shell.exec('./bin/trucolor --color=16m --rgb red', {
		silent: true
	}, (code_, out_) => {
		t.is(code_, 0)
		t.is(out_, 'rgb(255, 0, 0)')
		t.end()
	})
})
