'use strict'

Object.defineProperty(exports, '__esModule', {
	value: true
})

function _interopDefault(ex) {
	return (ex && (typeof ex === 'object') && 'default' in ex) ? ex.default : ex
}

var _mapValues = _interopDefault(require('lodash/mapValues'))
var path = require('path')
var readPkg = _interopDefault(require('read-pkg'))
var verbosity = require('verbosity')
var meta = _interopDefault(require('@thebespokepixel/meta'))
var _reduce = _interopDefault(require('lodash/reduce'))
var _thebespokepixel_esTinycolor = require('@thebespokepixel/es-tinycolor')
var converter = _interopDefault(require('color-convert'))
var _map = _interopDefault(require('lodash/map'))
var _remove = _interopDefault(require('lodash/remove'))
var SGRcomposer = _interopDefault(require('sgr-composer'))
var terminal = _interopDefault(require('term-ng'))
var escStringRE = _interopDefault(require('escape-string-regexp'))

function createCommonjsModule(fn, module) {
	return module = {
		exports: {}
	}, fn(module, module.exports), module.exports
}

var _global = createCommonjsModule(function (module) {
	var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')()
	if (typeof __g == 'number')		{
		__g = global
	}
})

var _core = createCommonjsModule(function (module) {
	var core = module.exports = {
		version: '2.4.0'
	}
	if (typeof __e == 'number')		{
		__e = core
	}
})

var _isObject = function _isObject(it) {
	return typeof it === 'object' ? it !== null : typeof it === 'function'
}

var isObject = _isObject
var _anObject = function _anObject(it) {
	if (!isObject(it))		{
		throw TypeError(it + ' is not an object!')
	}
	return it
}

var _fails = function _fails(exec) {
	try {
		return Boolean(exec())
	} catch (e) {
		return true
	}
}

var _descriptors = !_fails(function () {
	return Object.defineProperty({}, 'a', {
		get: function get() {
			return 7
		}
	}).a != 7
})

var isObject$1 = _isObject
var document = _global.document
var is = isObject$1(document) && isObject$1(document.createElement)
var _domCreate = function _domCreate(it) {
	return is ? document.createElement(it) : {}
}

var _ie8DomDefine = !_descriptors && !_fails(function () {
	return Object.defineProperty(_domCreate('div'), 'a', {
		get: function get() {
			return 7
		}
	}).a != 7
})

var isObject$2 = _isObject

var _toPrimitive = function _toPrimitive(it, S) {
	if (!isObject$2(it)) {
		return it
	}
	var fn
	var val
	if (S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it))) {
		return val
	}
	if (typeof (fn = it.valueOf) == 'function' && !isObject$2(val = fn.call(it))) {
		return val
	}
	if (!S && typeof (fn = it.toString) == 'function' && !isObject$2(val = fn.call(it))) {
		return val
	}
	throw TypeError('Can\'t convert object to primitive value')
}

var anObject = _anObject
var IE8_DOM_DEFINE = _ie8DomDefine
var toPrimitive = _toPrimitive
var dP$1 = Object.defineProperty

var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	anObject(O)
	P = toPrimitive(P, true)
	anObject(Attributes)
	if (IE8_DOM_DEFINE) {
		try {
			return dP$1(O, P, Attributes)
		} catch (e) {}}
	if ('get' in Attributes || 'set' in Attributes)		{
		throw TypeError('Accessors not supported!')
	}
	if ('value' in Attributes)		{
		O[P] = Attributes.value
	}
	return O
}

var _objectDp = {
	f: f
}

var _propertyDesc = function _propertyDesc(bitmap, value) {
	return {
		enumerable: !(bitmap & 1),
		configurable: !(bitmap & 2),
		writable: !(bitmap & 4),
		value: value
	}
}

var dP = _objectDp
var createDesc = _propertyDesc
var _hide = _descriptors ? function (object, key, value) {
	return dP.f(object, key, createDesc(1, value))
} : function (object, key, value) {
	object[key] = value
	return object
}

var hasOwnProperty = {}.hasOwnProperty
var _has = function _has(it, key) {
	return hasOwnProperty.call(it, key)
}

var id = 0
var px = Math.random()
var _uid = function _uid(key) {
	return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36))
}

var _redefine = createCommonjsModule(function (module) {
	var global = _global
	var hide = _hide
	var has = _has
	var SRC = _uid('src')
	var TO_STRING = 'toString'
	var $toString = Function[TO_STRING]
	var TPL = (String($toString)).split(TO_STRING)

	_core.inspectSource = function (it) {
		return $toString.call(it)
	};

	(module.exports = function (O, key, val, safe) {
		var isFunction = typeof val == 'function'
		if (isFunction) {
			has(val, 'name') || hide(val, 'name', key)
		}
		if (O[key] === val) {
			return
		}
		if (isFunction) {
			has(val, SRC) || hide(val, SRC, O[key] ? String(O[key]) : TPL.join(String(key)))
		}
		if (O === global) {
			O[key] = val
		} else if (!safe) {
			delete O[key]
			hide(O, key, val)
		} else if (O[key])			{
			O[key] = val
		} else {
			hide(O, key, val)
		}
	})(Function.prototype, TO_STRING, function toString() {
		return typeof this == 'function' && this[SRC] || $toString.call(this)
	})
})

var _aFunction = function _aFunction(it) {
	if (typeof it != 'function')		{
		throw TypeError(it + ' is not a function!')
	}
	return it
}

var aFunction = _aFunction
var _ctx = function _ctx(fn, that, length) {
	aFunction(fn)
	if (that === undefined) {
		return fn
	}
	switch (length) {
		case 1:
			return function (a) {
				return fn.call(that, a)
			}
		case 2:
			return function (a, b) {
				return fn.call(that, a, b)
			}
		case 3:
			return function (a, b, c) {
				return fn.call(that, a, b, c)
			}
	}
	return function () {
		return fn.apply(that, arguments)
	}
}

var global$1 = _global
var core = _core
var hide = _hide
var redefine = _redefine
var ctx = _ctx
var PROTOTYPE = 'prototype'

var $export$1 = function $export$1(type, name, source) {
	var IS_FORCED = type & $export$1.F
	var IS_GLOBAL = type & $export$1.G
	var IS_STATIC = type & $export$1.S
	var IS_PROTO = type & $export$1.P
	var IS_BIND = type & $export$1.B
	var target = IS_GLOBAL ? global$1 : IS_STATIC ? global$1[name] || (global$1[name] = {}) : (global$1[name] || {})[PROTOTYPE]
	var exports = IS_GLOBAL ? core : core[name] || (core[name] = {})
	var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {})
	var key
	var own
	var out
	var exp
	if (IS_GLOBAL)		{
		source = name
	}
	for (key in source) {
		own = !IS_FORCED && target && target[key] !== undefined

		out = (own ? target : source)[key]

		exp = IS_BIND && own ? ctx(out, global$1) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out

		if (target) {
			redefine(target, key, out, type & $export$1.U)
		}

		if (exports[key] != out) {
			hide(exports, key, exp)
		}
		if (IS_PROTO && expProto[key] != out)			{
			expProto[key] = out
		}
	}
}
global$1.core = core

$export$1.F = 1
$export$1.G = 2
$export$1.S = 4
$export$1.P = 8
$export$1.B = 16
$export$1.W = 32
$export$1.U = 64
$export$1.R = 128
var _export = $export$1

var toString$1 = {}.toString

var _cof = function _cof(it) {
	return toString$1.call(it).slice(8, -1)
}

var cof = _cof
var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	return cof(it) == 'String' ? it.split('') : Object(it)
}

var _defined = function _defined(it) {
	if (it == undefined)		{
		throw TypeError('Can\'t call method on  ' + it)
	}
	return it
}

var IObject = _iobject
var defined = _defined
var _toIobject = function _toIobject(it) {
	return IObject(defined(it))
}

var ceil = Math.ceil
var floor = Math.floor
var _toInteger = function _toInteger(it) {
	return isNaN(it = Number(it)) ? 0 : (it > 0 ? floor : ceil)(it)
}

var toInteger = _toInteger
var min = Math.min
var _toLength = function _toLength(it) {
	return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0
}

var toInteger$1 = _toInteger
var max = Math.max
var min$1 = Math.min
var _toIndex = function _toIndex(index, length) {
	index = toInteger$1(index)
	return index < 0 ? max(index + length, 0) : min$1(index, length)
}

var toIObject = _toIobject
var toLength = _toLength
var toIndex = _toIndex
var _arrayIncludes = function _arrayIncludes(IS_INCLUDES) {
	return function ($this, el, fromIndex) {
		var O = toIObject($this)
		var length = toLength(O.length)
		var index = toIndex(fromIndex, length)
		var value

		if (IS_INCLUDES && el != el)			{
			while (length > index) {
				value = O[index++]
				if (value != value) {
					return true
				}
			}}		else			{
			for (; length > index; index++)				{
				if (IS_INCLUDES || index in O) {
					if (O[index] === el) {
						return IS_INCLUDES || index || 0
					}
				}}}
		return !IS_INCLUDES && -1
	}
}

var global$2 = _global
var SHARED = '__core-js_shared__'
var store = global$2[SHARED] || (global$2[SHARED] = {})
var _shared = function _shared(key) {
	return store[key] || (store[key] = {})
}

var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks')
	var uid = _uid
	var Symbol = _global.Symbol
	var USE_SYMBOL = typeof Symbol == 'function'

	var $exports = module.exports = function (name) {
		return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name))
	}

	$exports.store = store
})

var UNSCOPABLES = _wks('unscopables')
var ArrayProto = Array.prototype
if (ArrayProto[UNSCOPABLES] == undefined) {
	_hide(ArrayProto, UNSCOPABLES, {})
}
var _addToUnscopables = function _addToUnscopables(key) {
	ArrayProto[UNSCOPABLES][key] = true
}

var $export = _export
var $includes = _arrayIncludes(true)

$export($export.P, 'Array', {
	includes: function includes(el) {
		return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined)
	}
})

_addToUnscopables('includes')

class Processor {
	constructor(colorname) {
		this.baseName = colorname
		this.lockedName = false
		this.attributes = {
			background: false,
			bold: false,
			dim: false,
			italic: false,
			invert: false,
			underline: false,
			blink: false
		}
		this.haveAttrs = false
		this.haveSource = false
		this.queue = []
		this.haveQueue = false
		this.namePrefix = ''
		this.nameSuffix = ''
		console.debug(`New Process: ${this.baseName}`)
	}

	render() {
		return this.haveSource ? _reduce(this.queue, (color, step) => step(color), _thebespokepixel_esTinycolor.tinycolor(this.rgb)) : 'none'
	}

	set source(interpreter) {
		this.interpreter = interpreter
		this.baseName = this.interpreter.name
		this.haveSource = true
	}

	get hasSource() {
		return Boolean(this.haveSource)
	}

	get name() {
		return this.lockedName ? this.lockedName : `${this.namePrefix}${this.baseName}${this.nameSuffix}`
	}

	get rgb() {
		return this.haveSource && this.interpreter.rgb
	}

	lock(lockedName) {
		console.debug(`Process name locked: ${lockedName}`)
		this.lockedName = lockedName
	}

	get locked() {
		return Boolean(this.lockedName)
	}

	get input() {
		return this.haveSource ? this.interpreter.input : this.name
	}

	get human() {
		if (this.haveSource) {
			return this.locked ? this.lockedName : this.interpreter.human
		}
		return this.locked ? this.lockedName : this.name
	}

	get hasAttrs() {
		return Boolean(this.haveAttrs)
	}

	set attrs(attr) {
		if (['background', 'bold', 'dim', 'italic', 'invert', 'underline', 'blink'].includes(attr)) {
			this.haveAttrs = true
			this.attributes[attr] = true
		}
	}

	get attrs() {
		return this.attributes
	}

	addStep(step) {
		this.queue.push(step)
		this.haveQueue = true
	}

	background() {
		this.attrs = 'background'
		console.debug('Special::background')
	}
	bold() {
		this.attrs = 'bold'
		console.debug('Special::bold')
	}
	dim() {
		this.attrs = 'dim'
		console.debug('Special::dim')
	}
	italic() {
		this.attrs = 'italic'
		console.debug('Special::italic')
	}
	invert() {
		this.attrs = 'invert'
		console.debug('Special::invert')
	}
	underline() {
		this.attrs = 'underline'
		console.debug('Special::underline')
	}
	blink() {
		this.attrs = 'blink'
		console.debug('Special::blink')
	}

	saturate(args) {
		this.addStep(color => color.saturate(args.percent))
		this.namePrefix = `sat-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
		console.debug('Process::saturate', args.percent)
	}

	desaturate(args) {
		this.addStep(color => color.desaturate(args.percent))
		this.namePrefix = `des-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
		console.debug('Process::desaturate', args.percent)
	}

	darken(args) {
		this.addStep(color => color.darken(args.percent))
		this.namePrefix = `dark-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
		console.debug('Process::darken', args.percent)
	}

	lighten(args) {
		this.addStep(color => color.lighten(args.percent))
		this.namePrefix = `light-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`
		console.debug('Process::lighten', args.percent)
	}

	spin(args) {
		this.addStep(color => color.spin(-args.rotation))
		this.namePrefix = `spin-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${Math.abs(args.rotation)}`
		console.debug('Process::spin', args.rotation)
	}

	mono() {
		this.addStep(color => color.greyscale())
		this.namePrefix = `mono-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}}`
		console.debug('Process::mono')
	}

	mix(args) {
		this.addStep(color => _thebespokepixel_esTinycolor.TinyColor.mix(color, args.color, 50))
		this.namePrefix = `mix-${this.namePrefix}`
		this.nameSuffix = `${this.nameSuffix}-${args.color}`
		console.debug('Process::mix', args.color)
	}
}

function processor(name) {
	return new Processor(name)
}

var asyncGenerator = (function () {
	function AwaitValue(value) {
		this.value = value
	}

	function AsyncGenerator(gen) {
		var front
		var back

		function send(key, arg) {
			return new Promise(function (resolve$$1, reject) {
				var request = {
					key: key,
					arg: arg,
					resolve: resolve$$1,
					reject: reject,
					next: null
				}

				if (back) {
					back = back.next = request
				} else {
					front = back = request
					resume(key, arg)
				}
			})
		}

		function resume(key, arg) {
			try {
				var result = gen[key](arg)
				var value = result.value

				if (value instanceof AwaitValue) {
					Promise.resolve(value.value).then(function (arg) {
						resume('next', arg)
					}, function (arg) {
						resume('throw', arg)
					})
				} else {
					settle(result.done ? 'return' : 'normal', result.value)
				}
			} catch (err) {
				settle('throw', err)
			}
		}

		function settle(type, value) {
			switch (type) {
				case 'return':
					front.resolve({
						value: value,
						done: true
					})
					break

				case 'throw':
					front.reject(value)
					break

				default:
					front.resolve({
						value: value,
						done: false
					})
					break
			}

			front = front.next

			if (front) {
				resume(front.key, front.arg)
			} else {
				back = null
			}
		}

		this._invoke = send

		if (typeof gen.return !== 'function') {
			this.return = undefined
		}
	}

	if (typeof Symbol === 'function' && Symbol.asyncIterator) {
		AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
			return this
		}
	}

	AsyncGenerator.prototype.next = function (arg) {
		return this._invoke('next', arg)
	}

	AsyncGenerator.prototype.throw = function (arg) {
		return this._invoke('throw', arg)
	}

	AsyncGenerator.prototype.return = function (arg) {
		return this._invoke('return', arg)
	}

	return {
		wrap: function (fn) {
			return function () {
				return new AsyncGenerator(fn.apply(this, arguments))
			}
		},
		await: function (value) {
			return new AwaitValue(value)
		}
	}
})()

var get$1 = function get$1(object, property, receiver) {
	if (object === null)		{
		object = Function.prototype
	}
	var desc = Object.getOwnPropertyDescriptor(object, property)

	if (desc === undefined) {
		var parent = Object.getPrototypeOf(object)

		if (parent === null) {
			return undefined
		} else {
			return get$1(parent, property, receiver)
		}
	} else if ('value' in desc) {
		return desc.value
	} else {
		var getter = desc.get

		if (getter === undefined) {
			return undefined
		}

		return getter.call(receiver)
	}
}

var set = function set(object, property, value, receiver) {
	var desc = Object.getOwnPropertyDescriptor(object, property)

	if (desc === undefined) {
		var parent = Object.getPrototypeOf(object)

		if (parent !== null) {
			set(parent, property, value, receiver)
		}
	} else if ('value' in desc && desc.writable) {
		desc.value = value
	} else {
		var setter = desc.set

		if (setter !== undefined) {
			setter.call(receiver, value)
		}
	}

	return value
}

var slicedToArray = (function () {
	function sliceIterator(arr, i) {
		var _arr = []
		var _n = true
		var _d = false
		var _e

		try {
			for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
				_arr.push(_s.value)

				if (i && _arr.length === i) {
					break
				}
			}
		} catch (err) {
			_d = true
			_e = err
		} finally {
			try {
				if (!_n && _i.return) {
					_i.return()
				}
			} finally {
				if (_d)					{
					throw _e
				}
			}
		}

		return _arr
	}

	return function (arr, i) {
		if (Array.isArray(arr)) {
			return arr
		} else if (Symbol.iterator in Object(arr)) {
			return sliceIterator(arr, i)
		} else {
			throw new TypeError('Invalid attempt to destructure non-iterable instance')
		}
	}
})()

class Interpreter {
	constructor(raw) {
		this.source = (raw_ => {
			switch (true) {
				case /^[0-9a-f]{3}$/i.test(raw_):
					return {
						input: /^([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(raw_),
						human: raw_,
						space: 'HEX'
					}

				case /^#[0-9a-f]{3}$/i.test(raw_):
					return {
						input: /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(raw_),
						human: raw_,
						space: '#HEX'
					}

				case /^[0-9a-f]{4}$/i.test(raw_):
					return {
						input: /^([0-9a-f])([0-9a-f])([0-9a-f])[0-9a-f]$/i.exec(raw_),
						human: raw_,
						space: 'HEX'
					}

				case /^#[0-9a-f]{4}$/i.test(raw_):
					return {
						input: /^#([0-9a-f])([0-9a-f])([0-9a-f])[0-9a-f]$/i.exec(raw_),
						human: raw_,
						space: '#HEX'
					}

				case /^[0-9a-f]{6}$/i.test(raw_):
					return {
						input: raw_,
						human: raw_,
						space: 'HEXHEX'
					}

				case /^#[0-9a-f]{6}$/i.test(raw_):
					return {
						input: raw_,
						human: raw_,
						space: '#HEXHEX'
					}

				case /^[0-9a-f]{8}$/i.test(raw_):
					return {
						input: raw_.substring(0, 6),
						human: raw_.substring(0, 6),
						space: 'HEXHEX'
					}

				case /^#[0-9a-f]{8}$/i.test(raw_):
					return {
						input: raw_.substring(0, 7),
						human: raw_.substring(0, 7),
						space: '#HEXHEX'
					}

				case /^rgb[(:]+\s?\d+,\s?\d+,\s?\d+\s?[)]*$/.test(raw_):
					return {
						input: raw_.replace(/rgb[(:]/, '').replace(/[ )]/g, '').split(','),
						human: raw_.replace(/rgb[(:]/, 'rgb-').replace(/,/g, '-').replace(/[ )]/g, ''),
						space: 'RGB'
					}

				case /^hsl:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsl:/, '').split(','),
						human: raw_.replace('hsl:', 'hsl-').replace(/,/g, '-'),
						space: 'HSL'
					}

				case /^hsv:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsv:/, '').split(','),
						human: raw_.replace('hsv:', 'hsv-').replace(/,/g, '-'),
						space: 'HSV'
					}

				case /^hsb:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsb:/, '').split(','),
						human: raw_.replace('hsb:', 'hsb-').replace(/,/g, '-'),
						space: 'HSV'
					}

				case /^hwb:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hwb:/, '').split(','),
						human: raw_.replace('hwb:', 'hwb-').replace(/,/g, '-'),
						space: 'HWB'
					}

				case raw_ in {
					normal:
						'normal',
					reset: 'reset'
				}:
					return {
						input: raw_,
						human: raw_,
						space: 'SGR'
					}

				case raw_ in _thebespokepixel_esTinycolor.names:
					return {
						input: raw_,
						human: raw_,
						space: 'named'
					}

				default:
					throw new Error(`Unrecognised color space: ${raw_}`)
			}
		})(raw)

		const source = (source => {
			switch (source.space) {
				case 'HEX':
				case '#HEX':
					var _source$input = slicedToArray(source.input, 4)

					const input = _source$input[0]
					const r = _source$input[1]
					const g = _source$input[2]
					const b = _source$input[3]

					return {
						name: `${r}${r}${g}${g}${b}${b}`,
						rgb: converter.hex.rgb(`${r}${r}${g}${g}${b}${b}`),
						input
					}
				case 'HEXHEX':
				case '#HEXHEX':
					return {
						name: source.input,
						rgb: converter.hex.rgb(this.name)
					}
				case 'RGB':
					return {
						name: converter.rgb.hex(source.input),
						rgb: converter.hex.rgb(this.name)
					}
				case 'HSL':
					return {
						name: converter.hsl.hex(source.input),
						rgb: converter.hsl.rgb(source.input)
					}
				case 'HSV':
					return {
						name: converter.hsv.hex(source.input),
						rgb: converter.hsv.rgb(source.input)
					}
				case 'HWB':
					return {
						name: converter.hwb.hex(source.input),
						rgb: converter.hwb.rgb(source.input)
					}
				case 'SGR':
					return {
						name: source.input,
						rgb: source.input
					}
				case 'named':
					return {
						name: converter.keyword.hex(source.input),
						rgb: converter.keyword.rgb(source.input)
					}
				default:
					throw new Error(`Unrecognised color space: ${source.space}`)
			}
		})(this.source)

		if (source.input) {
			this.source.input = source.input
		}
		this.baseName = source.name
		if (source.space === 'SGR') {
			this.baseColor = source.name
		} else {
			this.baseColor = _thebespokepixel_esTinycolor.tinycolor(source.rgb ? `rgb(${source.rgb})` : source.name)
		}
		console.debug(`Color (${this.baseName}) ${this.baseColor} from ${this.source.space} as ${this.source.human}`)
	}
	set name(n) {
		this.baseName = n
	}
	get name() {
		return this.baseName
	}

	set rgb(rgb) {
		this.baseColor = _thebespokepixel_esTinycolor.tinycolor(rgb)
	}
	get rgb() {
		return this.baseColor
	}

	get input() {
		return this.source.input
	}
	get human() {
		return this.source.human
	}
	get space() {
		return this.source.space
	}
	toString() {
		return converter.rgb.hex(this.baseColor)
	}
}

function interpreter(raw) {
	return new Interpreter(raw)
}

let currentAutoName = 1

var parse = function (color) {
	let queue = []
	let processor$$1 = processor(`color_${currentAutoName++}`)
	const refreshProcessor = processor_ => {
		if (processor_.hasSource) {
			queue.push(processor_)
			return processor(`color_${currentAutoName++}`)
		}
		return processor_
	}
	const tokens = color.split(' ')

	while (tokens.length > 0) {
		const token = tokens.shift()
		switch (token) {
			case 'background':
				processor$$1.background()
				break
			case 'bold':
				processor$$1.bold()
				break
			case 'faint':
				processor$$1.dim()
				break
			case 'dim':
				processor$$1.dim()
				break
			case 'italic':
				processor$$1.italic()
				break
			case 'invert':
				processor$$1.invert()
				break
			case 'underline':
				processor$$1.underline()
				break
			case 'blink':
				processor$$1.blink()
				break

			case 'saturate':
			case 'sat':
				processor$$1.saturate({
					percent: tokens.shift()
				})
				break
			case 'desaturate':
			case 'desat':
				processor$$1.desaturate({
					percent: tokens.shift()
				})
				break
			case 'light':
				processor$$1.lighten({
					percent: 20
				})
				break
			case 'dark':
				processor$$1.darken({
					percent: 20
				})
				break
			case 'lighten':
				processor$$1.lighten({
					percent: tokens.shift()
				})
				break
			case 'darken':
				processor$$1.darken({
					percent: tokens.shift()
				})
				break
			case 'spin':
				processor$$1.spin({
					rotation: tokens.shift()
				})
				break
			case 'mono':
				processor$$1.mono()
				break
			case 'mix':
				processor$$1.mix({
					color: tokens.shift()
				})
				break

			default:
				if (/^[A-Za-z0-9_-]+:$/.test(token)) {
					processor$$1 = refreshProcessor(processor$$1)
					processor$$1.lock(token.trim().replace(':', ''))
				} else {
					processor$$1 = refreshProcessor(processor$$1)
					processor$$1.source = interpreter(token)
				}
		}
	}
	queue.push(processor$$1)
	return queue
}

const colorLevel = terminal.color.level || 0

function render$$1(processor, options = {}) {
	const outputFormat = options.format

	const color = processor.render()
	const isReset = ['normal', 'reset'].includes(processor.name)

	const sgrComposer = new SGRcomposer(options.force || colorLevel, Object.assign(processor.attrs, processor.hasSource ? {
		color: isReset ? processor.name : color.toRgbArray()
	} : {}))

	const fieldSelect = () => isReset || !processor.hasSource ? processor.name : false
	const stringSelect = () => isReset || !processor.hasSource ? '' : false

	const swatch = () => {
		if (colorLevel > 0) {
			const sgr = sgrComposer.sgr(['bold', 'italic', 'underline', 'invert'])
			return `${sgr.in}██${sgr.out}`
		}
		return `$██`
	}

	const colorOptions = (type => {
		switch (type) {
			case undefined:
				return {}
			case 'default':
				return pkg.config.cli[pkg.config.cli.selected]
			default:
				return pkg.config.cli[global.trucolorCLItype]
		}
	})(global.trucolorCLItype)

	switch (outputFormat) {
		case 'cli':
			return Object.assign({
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => stringSelect() || `${_remove(_map(processor.attrs, (active, attr) => active === true ? colorOptions[attr] : false)).join(' ')}${processor.hasAttrs ? ' ' : ''}${colorOptions.color === 'hex' ? `${color.toHex()}` : `${color.toRgbArray().join(' ')}`}`,
				toSwatch: () => swatch()
			}, sgrComposer.sgr())
		case 'sgr':
			return Object.assign({
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => stringSelect() || sgrComposer.sgr().in,
				toSwatch: () => swatch()
			}, sgrComposer.sgr())
		default:
			return Object.assign({
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => fieldSelect() || color.toHex(),
				toSwatch: () => swatch()
			}, sgrComposer.sgr())
	}
}

class Chalkish {
	constructor(styles) {
		const styleFactory = (collection => {
			Object.keys(styles).forEach(key => {
				styles[key].closeRE = new RegExp(escStringRE(styles[key].out), 'g')
				collection[key] = {
					get: () => makePainter.call(this._styles.concat(key))
				}
			})
			return collection
		})({})

		const proto = Object.defineProperties(function () {}, styleFactory)

		function applyPaint(content) {
			let i = this._styles.length
			while (i--) {
				const sgrPair = styles[this._styles[i]]
				content = sgrPair.in + content.replace(sgrPair.closeRE, sgrPair.in) + sgrPair.out
			}
			return content
		}

		function makePainter(styles) {
			const painter = (...args) => applyPaint.apply(painter, args)
			painter._styles = styles

			painter.__proto__ = proto
			return painter
		}

		Object.defineProperties(Chalkish.prototype, (collection => {
			Object.keys(styles).forEach(name => {
				collection[name] = {
					get: () => makePainter.call(this, [name])
				}
			})
			return collection
		})({}))
	}
}

function chalk(palette) {
	return new Chalkish(palette)
}

var simplePalette = {
	white: '#BBB',
	black: '#111',
	red: '#B00',
	green: '#0B0',
	blue: '#44B',
	cyan: '#0BB',
	yellow: '#BB0',
	magenta: '#B0B',
	brightWhite: '#FFF',
	brightRed: '#F33',
	brightGreen: '#3F3',
	brightBlue: '#44F',
	brightCyan: '#3FF',
	brightYellow: '#FF3',
	brightMagenta: '#F3F',
	dim: 'dim',
	bold: 'bold',
	italic: 'italic',
	invert: 'invert',
	example: '#CC99FF',
	command: '#31A0FF',
	argument: '#7DC3FF',
	option: '#C1BA89',
	operator: '#FFFFFF',
	grey: '#808080',
	title: 'bold #80C480',
	normal: 'normal',
	reset: 'reset'
}

const console = verbosity.createConsole({
	outStream: process.stderr
})
const pkg = readPkg.sync(path.resolve(__dirname, '..'))
const metadata = meta(__dirname)

function trucolor(color, options = {}) {
	const queue = parse(color)
	if (queue.length > 1) {
		return queue.map(color => render$$1(color, options))
	}
	return render$$1(queue[0], options)
}

function palette(options, palette) {
	return _mapValues(palette, color => trucolor(color, options))
}

function simple(options) {
	return palette(options, simplePalette)
}

function chalkish(palette) {
	return chalk(palette)
}

exports.console = console
exports.pkg = pkg
exports.metadata = metadata
exports.trucolor = trucolor
exports.palette = palette
exports.simple = simple
exports.chalkish = chalkish
exports.parse = parse
exports.render = render$$1

