import {promisify} from 'node:util'
import {exec} from 'node:child_process'
import test from 'ava'

const execPromise = promisify(exec)

test('Named color is red = ff0000', async t => {
	const {stdout} = await execPromise('./trucolor.js --color=16m red')
	t.is(stdout, 'ff0000')
})

test('Named color is green = 008000', async t => {
	const {stdout} = await execPromise('./trucolor.js --color=16m green')
	t.is(stdout, '008000')
})

test('Named color is blue = 0000ff', async t => {
	const {stdout} = await execPromise('./trucolor.js --color=16m blue')
	t.is(stdout, '0000ff')
})

test('rgb:128,0,128 = 800080', async t => {
	const {stdout} = await execPromise('./trucolor.js --color=16m rgb:128,0,128')
	t.is(stdout, '800080')
})

test('hsl:120,100,50 = 00ff00', async t => {
	const {stdout} = await execPromise('./trucolor.js --color=16m hsl:120,100,50')
	t.is(stdout, '00ff00')
})

test('hwb:240,0,0 = 0000ff', async t => {
	const {stdout} = await execPromise('./trucolor.js --color=16m hwb:240,0,0')
	t.is(stdout, '0000ff')
})

test('rgb:128,0,128 lighten 10 spin 5 = a400b3', async t => {
	const {stdout} = await execPromise('./trucolor.js --color=16m rgb:128,0,128 lighten 10 spin 5')
	t.is(stdout, 'a400b3')
})

test('hsl:120,100,50 desaturate 50 = 40bf40', async t => {
	const {stdout} = await execPromise('./trucolor.js --color=16m hsl:120,100,50 desaturate 50')
	t.is(stdout, '40bf40')
})

test('blanchedalmond spin -195 lighten 5 desaturate 10 = e8ebfe', async t => {
	const {stdout} = await execPromise('./trucolor.js --color=16m blanchedalmond spin -195 lighten 5 desaturate 10')
	t.is(stdout, 'e8ebfe')
})

test('bold red = --bold ff0000', async t => {
	const {stdout} = await execPromise('./trucolor.js --color=16m bold red')
	t.is(stdout, '--bold ff0000')
})

test('red as rgb() = rgb(255, 0, 0)', async t => {
	const {stdout} = await execPromise('./trucolor.js --color=16m --rgb red')
	t.is(stdout, 'rgb(255, 0, 0)')
})
