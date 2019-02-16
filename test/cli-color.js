import {exec} from 'child_process'
import test from 'ava'

test.cb('Named color is red = ff0000', t => {
	exec('./bin/trucolor --color=16m red', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, 'ff0000')
		t.end()
	})
})

test.cb('Named color is green = 008000', t => {
	exec('./bin/trucolor --color=16m green', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, '008000')
		t.end()
	})
})

test.cb('Named color is blue = 0000ff', t => {
	exec('./bin/trucolor --color=16m blue', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, '0000ff')
		t.end()
	})
})

test.cb('rgb:128,0,128 = 800080', t => {
	exec('./bin/trucolor --color=16m rgb:128,0,128', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, '800080')
		t.end()
	})
})

test.cb('hsl:120,100,50 = 00ff00', t => {
	exec('./bin/trucolor --color=16m hsl:120,100,50', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, '00ff00')
		t.end()
	})
})

test.cb('hwb:240,0,0 = 0000ff', t => {
	exec('./bin/trucolor --color=16m hwb:240,0,0', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, '0000ff')
		t.end()
	})
})

test.cb('rgb:128,0,128 lighten 10 spin 5 = a400b3', t => {
	exec('./bin/trucolor --color=16m rgb:128,0,128 lighten 10 spin 5', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, 'a400b3')
		t.end()
	})
})

test.cb('hsl:120,100,50 desaturate 50 = 40bf40', t => {
	exec('./bin/trucolor --color=16m hsl:120,100,50 desaturate 50', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, '40bf40')
		t.end()
	})
})

test.cb('blanchedalmond spin -195 lighten 5 desaturate 10 = e8ebfe', t => {
	exec('./bin/trucolor --color=16m blanchedalmond spin -195 lighten 5 desaturate 10', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, 'e8ebfe')
		t.end()
	})
})

test.cb('bold red = --bold ff0000', t => {
	exec('./bin/trucolor --color=16m bold red', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, '--bold ff0000')
		t.end()
	})
})

test.cb('red as rgb() = rgb(255, 0, 0)', t => {
	exec('./bin/trucolor --color=16m --rgb red', (error_, out_) => {
		t.is(error_, null)
		t.is(out_, 'rgb(255, 0, 0)')
		t.end()
	})
})
