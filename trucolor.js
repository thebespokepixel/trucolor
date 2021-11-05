#! /usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import updateNotifier from 'update-notifier';
import { box } from '@thebespokepixel/string';
import { TemplateTag, replaceSubstitutionTransformer, stripIndent } from 'common-tags';
import _ from 'lodash';
import terminalFeatures from 'term-ng';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createConsole } from 'verbosity';
import meta from '@thebespokepixel/meta';
import { tinycolor, TinyColor, names } from '@thebespokepixel/es-tinycolor';
import converter from 'color-convert';
import SGRcomposer from 'sgr-composer';
import { readPackageSync } from 'read-pkg';
import 'escape-string-regexp';
import { createImage, truwrap } from 'truwrap';

const name = "trucolor";
const version = "3.0.1";
const description = "TTY color toolkit supporting Truecolor (24bit RGB)";
const author = "Mark Griffiths <mark@thebespokepixel.com> (http://thebespokepixel.com/)";
const main = "index.js";
const types = "index.d.ts";
const type = "module";
const bin = {
	trucolor: "./bin/trucolor"
};
const files = [
	"index.js",
	"index.d.ts",
	"bin/"
];
const bugs = {
	url: "https://github.com/thebespokepixel/trucolor/issues"
};
const copyright = {
	year: "2021",
	owner: "The Bespoke Pixel"
};
const config = {
	cli: {
		selected: "direct",
		none: {
			color: "hex",
			background: "",
			bold: "",
			dim: "",
			italic: "",
			underline: "",
			blink: "",
			invert: "",
			reset: "",
			normal: ""
		},
		direct: {
			color: "hex",
			background: "--background",
			bold: "--bold",
			dim: "--dim",
			italic: "--italic",
			underline: "--underline",
			blink: "--blink",
			invert: "--invert",
			reset: "reset",
			normal: "normal"
		},
		fish: {
			color: "hex",
			background: "--background",
			bold: "--bold",
			dim: "",
			italic: "",
			underline: "--underline",
			blink: "",
			invert: "",
			reset: "normal",
			normal: "normal"
		}
	}
};
const dependencies = {
	"@thebespokepixel/es-tinycolor": "^3.0.4",
	"@thebespokepixel/meta": "^3.0.4",
	"@thebespokepixel/string": "^2.0.1",
	"color-convert": "^2.0.1",
	"common-tags": "^1.8.0",
	"escape-string-regexp": "^5.0.0",
	lodash: "^4.17.21",
	"read-pkg": "^7.0.0",
	"sgr-composer": "^3.0.0",
	"term-ng": "^3.0.3",
	truwrap: "^4.0.2",
	"update-notifier": "^5.1.0",
	verbosity: "^3.0.2",
	yargs: "^17.2.1"
};
const devDependencies = {
	"@rollup/plugin-commonjs": "^21.0.1",
	"@rollup/plugin-json": "^4.1.0",
	"@rollup/plugin-node-resolve": "^13.0.6",
	"@types/estree": "^0.0.50",
	ava: "^4.0.0-rc.1",
	c8: "^7.10.0",
	"documentation-theme-bespoke": "^2.0.12",
	rollup: "^2.59.0",
	"rollup-plugin-cleanup": "^3.2.1",
	"semver-regex": "^4.0.2",
	xo: "^0.46.4"
};
const engines = {
	node: ">=14.0"
};
const homepage = "https://github.com/thebespokepixel/trucolor";
const keywords = [
	"color",
	"24bit",
	"truecolor",
	"SGR",
	"ansi",
	"command line",
	"fish"
];
const license = "MIT";
const repository = {
	type: "git",
	url: "git+https://github.com/thebespokepixel/trucolor.git"
};
const scripts = {
	build: "rollup -c && chmod 755 trucolor.js && npm run readme",
	test: "xo && c8 --reporter=text ava",
	"doc-serve": "documentation serve --watch --theme node_modules/documentation-theme-bespoke --github --config src/docs/documentation.yml --project-name $npm_package_name  --project-version $npm_package_version src/index.js",
	"doc-build": "documentation build --format html --output docs --theme node_modules/documentation-theme-bespoke --github --config src/docs/documentation.yml --project-name $npm_package_name  --project-version $npm_package_version src/index.js",
	readme: "compile-readme -u src/docs/example.md src/docs/readme.md > readme.md",
	coverage: "c8 --reporter=lcov ava; open coverage/lcov-report/index.html",
	prepublishOnly: "npx -p typescript tsc index.js --declaration --allowJs --emitDeclarationOnly"
};
const xo = {
	semicolon: false,
	ignores: [
		"index.js",
		"trucolor.js",
		"index.d.ts",
		"docs/**",
		"coverage/**"
	]
};
const badges = {
	github: "thebespokepixel",
	npm: "thebespokepixel",
	"libraries-io": "TheBespokePixel",
	name: "trucolor",
	codeclimate: "5f8c6c4143841284dc75",
	providers: {
		aux1: {
			title: "github",
			text: "source",
			color: "4E73B6",
			link: "https://github.com/thebespokepixel/trucolor"
		}
	},
	readme: {
		"Publishing Status": [
			[
				"npm",
				"libraries-io-npm"
			],
			[
				"travis-com",
				"rollup"
			]
		],
		"Development Status": [
			[
				"travis-com-dev",
				"libraries-io-github"
			],
			[
				"snyk",
				"code-climate",
				"code-climate-coverage"
			]
		],
		"Documentation/Help": [
			"twitter"
		]
	},
	docs: [
		[
			"aux1",
			"travis-com"
		],
		[
			"code-climate",
			"code-climate-coverage"
		],
		[
			"snyk",
			"libraries-io-npm"
		]
	]
};
var pkg$1 = {
	name: name,
	version: version,
	description: description,
	author: author,
	main: main,
	types: types,
	type: type,
	bin: bin,
	files: files,
	bugs: bugs,
	copyright: copyright,
	config: config,
	dependencies: dependencies,
	devDependencies: devDependencies,
	engines: engines,
	homepage: homepage,
	keywords: keywords,
	license: license,
	repository: repository,
	scripts: scripts,
	xo: xo,
	badges: badges
};

class Processor {
	constructor(colorname) {
		this.baseName = colorname;
		this.lockedName = false;
		this.attributes = {
			background: false,
			bold: false,
			dim: false,
			italic: false,
			invert: false,
			underline: false,
			blink: false,
		};
		this.haveAttrs = false;
		this.haveSource = false;
		this.queue = [];
		this.haveQueue = false;
		this.namePrefix = '';
		this.nameSuffix = '';
		console.debug(`New Process: ${this.baseName}`);
	}
	render() {
		return this.haveSource ? _.reduce(this.queue,
			(color, step) => step(color),
			tinycolor(this.rgb),
		) : 'none'
	}
	get source() {
		return this.interpreter
	}
	set source(interpreter) {
		this.interpreter = interpreter;
		this.baseName = this.interpreter.name;
		this.haveSource = true;
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
		console.debug(`Process name locked: ${lockedName}`);
		this.lockedName = lockedName;
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
	get attrs() {
		return this.attributes
	}
	set attrs(attr) {
		if (['background', 'bold', 'dim', 'italic', 'invert', 'underline', 'blink'].includes(attr)) {
			this.haveAttrs = true;
			this.attributes[attr] = true;
		}
	}
	addStep(step) {
		this.queue.push(step);
		this.haveQueue = true;
	}
	background() {
		this.attrs = 'background';
		console.debug('Special::background');
	}
	bold() {
		this.attrs = 'bold';
		console.debug('Special::bold');
	}
	dim() {
		this.attrs = 'dim';
		console.debug('Special::dim');
	}
	italic() {
		this.attrs = 'italic';
		console.debug('Special::italic');
	}
	invert() {
		this.attrs = 'invert';
		console.debug('Special::invert');
	}
	underline() {
		this.attrs = 'underline';
		console.debug('Special::underline');
	}
	blink() {
		this.attrs = 'blink';
		console.debug('Special::blink');
	}
	saturate(args) {
		this.addStep(color => color.saturate(args.percent));
		this.namePrefix = `sat-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`;
		console.debug('Process::saturate', args.percent);
	}
	desaturate(args) {
		this.addStep(color => color.desaturate(args.percent));
		this.namePrefix = `des-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`;
		console.debug('Process::desaturate', args.percent);
	}
	darken(args) {
		this.addStep(color => color.darken(args.percent));
		this.namePrefix = `dark-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`;
		console.debug('Process::darken', args.percent);
	}
	lighten(args) {
		this.addStep(color => color.lighten(args.percent));
		this.namePrefix = `light-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${args.percent}`;
		console.debug('Process::lighten', args.percent);
	}
	spin(args) {
		this.addStep(color => color.spin(-args.rotation));
		this.namePrefix = `spin-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${Math.abs(args.rotation)}`;
		console.debug('Process::spin', args.rotation);
	}
	mono() {
		this.addStep(color => color.greyscale());
		this.namePrefix = `mono-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}}`;
		console.debug('Process::mono');
	}
	mix(args) {
		this.addStep(color => TinyColor.mix(color, args.color, 50));
		this.namePrefix = `mix-${this.namePrefix}`;
		this.nameSuffix = `${this.nameSuffix}-${args.color}`;
		console.debug('Process::mix', args.color);
	}
}
function processor(name) {
	return new Processor(name)
}

class Interpreter {
	constructor(raw) {
		this.source = (raw_ => {
			switch (true) {
				case /^[\da-f]{3}$/i.test(raw_):
					return {
						input: /^([\da-f])([\da-f])([\da-f])$/i.exec(raw_),
						human: raw_,
						space: 'HEX',
					}
				case /^#[\da-f]{3}$/i.test(raw_):
					return {
						input: /^#([\da-f])([\da-f])([\da-f])$/i.exec(raw_),
						human: raw_,
						space: '#HEX',
					}
				case /^[\da-f]{4}$/i.test(raw_):
					return {
						input: /^([\da-f])([\da-f])([\da-f])[\da-f]$/i.exec(raw_),
						human: raw_,
						space: 'HEX',
					}
				case /^#[\da-f]{4}$/i.test(raw_):
					return {
						input: /^#([\da-f])([\da-f])([\da-f])[\da-f]$/i.exec(raw_),
						human: raw_,
						space: '#HEX',
					}
				case /^[\da-f]{6}$/i.test(raw_):
					return {
						input: raw_,
						human: raw_,
						space: 'HEXHEX',
					}
				case /^#[\da-f]{6}$/i.test(raw_):
					return {
						input: raw_,
						human: raw_,
						space: '#HEXHEX',
					}
				case /^[\da-f]{8}$/i.test(raw_):
					return {
						input: raw_.slice(0, 6),
						human: raw_.slice(0, 6),
						space: 'HEXHEX',
					}
				case /^#[\da-f]{8}$/i.test(raw_):
					return {
						input: raw_.slice(0, 7),
						human: raw_.slice(0, 7),
						space: '#HEXHEX',
					}
				case /^rgb[(:]+(?:\s?\d+,){2}\s?\d+\s?\)*$/.test(raw_):
					return {
						input: raw_.replace(/rgb[(:]/, '').replace(/[ )]/g, '').split(','),
						human: raw_.replace(/rgb[(:]/, 'rgb-').replace(/,/g, '-').replace(/[ )]/g, ''),
						space: 'RGB',
					}
				case /^hsl:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsl:/, '').split(','),
						human: raw_.replace('hsl:', 'hsl-').replace(/,/g, '-'),
						space: 'HSL',
					}
				case /^hsv:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsv:/, '').split(','),
						human: raw_.replace('hsv:', 'hsv-').replace(/,/g, '-'),
						space: 'HSV',
					}
				case /^hsb:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hsb:/, '').split(','),
						human: raw_.replace('hsb:', 'hsb-').replace(/,/g, '-'),
						space: 'HSV',
					}
				case /^hwb:\d+,\d+,\d+$/.test(raw_):
					return {
						input: raw_.replace(/hwb:/, '').split(','),
						human: raw_.replace('hwb:', 'hwb-').replace(/,/g, '-'),
						space: 'HWB',
					}
				case (raw_ in {
					normal: 'normal',
					reset: 'reset',
				}):
					return {
						input: raw_,
						human: raw_,
						space: 'SGR',
					}
				case (raw_ in names):
					return {
						input: raw_,
						human: raw_,
						space: 'named',
					}
				default:
					throw new Error(`Unrecognised color space: ${raw_}`)
			}
		})(raw);
		const source = (source => {
			switch (source.space) {
				case 'HEX':
				case '#HEX':
					const [input, r, g, b] = source.input;
					return {
						name: `${r}${r}${g}${g}${b}${b}`,
						rgb: converter.hex.rgb(`${r}${r}${g}${g}${b}${b}`),
						input,
					}
				case 'HEXHEX':
				case '#HEXHEX':
					return {
						name: source.input,
						rgb: converter.hex.rgb(this.name),
					}
				case 'RGB':
					return {
						name: converter.rgb.hex(source.input),
						rgb: converter.hex.rgb(this.name),
					}
				case 'HSL':
					return {
						name: converter.hsl.hex(source.input),
						rgb: converter.hsl.rgb(source.input),
					}
				case 'HSV':
					return {
						name: converter.hsv.hex(source.input),
						rgb: converter.hsv.rgb(source.input),
					}
				case 'HWB':
					return {
						name: converter.hwb.hex(source.input),
						rgb: converter.hwb.rgb(source.input),
					}
				case 'SGR':
					return {
						name: source.input,
						rgb: source.input,
					}
				case 'named':
					return {
						name: converter.keyword.hex(source.input),
						rgb: converter.keyword.rgb(source.input),
					}
				default:
					throw new Error(`Unrecognised color space: ${source.space}`)
			}
		})(this.source);
		if (source.input) {
			this.source.input = source.input;
		}
		this.baseName = source.name;
		this.baseColor = source.space === 'SGR' ? source.name : tinycolor(source.rgb ? `rgb(${source.rgb})` : source.name);
		console.debug(`Color (${this.baseName}) ${this.baseColor} from ${this.source.space} as ${this.source.human}`);
	}
	get name() {
		return this.baseName
	}
	set name(n) {
		this.baseName = n;
	}
	get rgb() {
		return this.baseColor
	}
	set rgb(rgb) {
		this.baseColor = tinycolor(rgb);
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

let currentAutoName = 1;
function parser(color) {
	const queue = [];
	let processor$1 = processor(`color_${currentAutoName++}`);
	const refreshProcessor = processor_ => {
		if (processor_.hasSource) {
			queue.push(processor_);
			return processor(`color_${currentAutoName++}`)
		}
		return processor_
	};
	const tokens = color.split(' ');
	while (tokens.length > 0) {
		const token = tokens.shift();
		switch (token) {
			case 'background':
				processor$1.background();
				break
			case 'bold':
				processor$1.bold();
				break
			case 'faint':
				processor$1.dim();
				break
			case 'dim':
				processor$1.dim();
				break
			case 'italic':
				processor$1.italic();
				break
			case 'invert':
				processor$1.invert();
				break
			case 'underline':
				processor$1.underline();
				break
			case 'blink':
				processor$1.blink();
				break
			case 'saturate':
			case 'sat':
				processor$1.saturate({
					percent: tokens.shift(),
				});
				break
			case 'desaturate':
			case 'desat':
				processor$1.desaturate({
					percent: tokens.shift(),
				});
				break
			case 'light':
				processor$1.lighten({
					percent: 20,
				});
				break
			case 'dark':
				processor$1.darken({
					percent: 20,
				});
				break
			case 'lighten':
				processor$1.lighten({
					percent: tokens.shift(),
				});
				break
			case 'darken':
				processor$1.darken({
					percent: tokens.shift(),
				});
				break
			case 'spin':
				processor$1.spin({
					rotation: tokens.shift(),
				});
				break
			case 'mono':
				processor$1.mono();
				break
			case 'mix':
				processor$1.mix({
					color: tokens.shift(),
				});
				break
			default:
				if (/^[\w-]+:$/.test(token)) {
					processor$1 = refreshProcessor(processor$1);
					processor$1.lock(token.trim().replace(':', ''));
				} else {
					processor$1 = refreshProcessor(processor$1);
					processor$1.source = interpreter(token);
				}
		}
	}
	queue.push(processor$1);
	return queue
}

const pkg = readPackageSync();
const colorLevel = terminalFeatures.color.level || 0;
function render(processor, options = {}) {
	const {
		format: outputFormat,
	} = options;
	const color = processor.render();
	const isReset = ['normal', 'reset'].includes(processor.name);
	const sgrComposer = new SGRcomposer(
		options.force || colorLevel,
		Object.assign(processor.attrs, processor.hasSource ? {
			color: isReset ? processor.name : color.toRgbArray(),
		} : {}),
	);
	const fieldSelect = () => isReset || !processor.hasSource ? processor.name : false;
	const stringSelect = () => isReset || !processor.hasSource ? '' : false;
	const swatch = () => {
		if (colorLevel > 0) {
			const sgr = sgrComposer.sgr(['bold', 'italic', 'underline', 'invert']);
			return `${sgr.in}\u2588\u2588${sgr.out}`
		}
		return '$\u2588\u2588'
	};
	const colorOptions = (type => {
		switch (type) {
			case undefined:
				return {}
			case 'default':
				return pkg.config.cli[pkg.config.cli.selected]
			default:
				return pkg.config.cli[type]
		}
	})(global.trucolorCLItype);
	switch (outputFormat) {
		case 'cli':
			return {
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => stringSelect() || `${_.remove(
					_.map(processor.attrs, (active, attr) => active === true ? colorOptions[attr] : false),
				).join(' ')}${processor.hasAttrs ? ' ' : ''}${
					colorOptions.color === 'hex'
						? `${color.toHex()}`
						: `${color.toRgbArray().join(' ')}`
				}`,
				toSwatch: () => swatch(),
				...sgrComposer.sgr(),
			}
		case 'sgr':
			return {
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => stringSelect() || sgrComposer.sgr().in,
				toSwatch: () => swatch(),
				...sgrComposer.sgr(),
			}
		default:
			return {
				name: processor.human,
				hex: fieldSelect() || color.toHex(),
				rgb: fieldSelect() || color.toRgbString(),
				toString: () => fieldSelect() || color.toHex(),
				toSwatch: () => swatch(),
				...sgrComposer.sgr(),
			}
	}
}

const palette$1 = {
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
	reset: 'reset',
};

const console = createConsole({outStream: process.stderr});
const metadata = meta(dirname(fileURLToPath(import.meta.url)));
function trucolor(color, options = {}) {
	const queue = parser(color);
	if (queue.length > 1) {
		return queue.map(color => render(color, options))
	}
	return render(queue[0], options)
}
function palette(options, palette) {
	return _.mapValues(palette, color => trucolor(color, options))
}
function simple(options) {
	return palette(options, palette$1)
}

const clr = _.merge(simple({format: 'sgr'}), palette({format: 'sgr'}, {
	purple: 'purple',
	purpleSwatch: 'purple desaturate 70',
	orange: 'hsb:45,100,100',
	orangeSwatch: 'hsb:45,100,100 desaturate 70',
	red: 'red lighten 10',
	green: 'green lighten 10',
	blue: 'blue lighten 20',
	hotpink: 'hotpink',
	chocolate: 'chocolate',
	dark: 'red desaturate 100 darken 20',
	msat: 'red desaturate 60',
	mlight: 'rgb(255,255,255) darken 25',
	bright: 'rgb(255,255,255)',
	bob: 'black lighten 50 saturate 50 spin 180',
	ul: 'underline',
	invert: 'invert',
	exBackground: 'background dark red',
	exBold: 'bold yellow',
	exFaint: 'faint yellow',
	exItalic: 'italic #33FF33',
	exInvert: 'invert #7B00B1',
	exUnderline: 'underline #fff',
	exBlink: 'blink orange',
}));
const colorReplacer = new TemplateTag(
	replaceSubstitutionTransformer(
		/([a-zA-Z]+?)[:/|](.+)/,
		(match, colorName, content) => `${clr[colorName]}${content}${clr[colorName].out}`,
	),
);
function spectrum(width, char) {
	if (terminalFeatures.color.has16m) {
		return _.map(Array.from({length: width}), (value, col) => {
			const scos = Math.cos((col / width) * (Math.PI / 2));
			const ssin = Math.sin((col / width) * (Math.PI));
			const red = (scos > 0) ? Math.floor(scos * 255) : 0;
			const green = (ssin > 0) ? Math.floor(ssin * 255) : 0;
			const blue = (scos > 0) ? Math.floor((1 - scos) * 255) : 0;
			return `\u001B[38;2;${red};${green};${blue}m${char}`
		}).join('')
	}
	return `${char.repeat(width)}\n${clr.red.in}  Your terminal currently doesn't support 24 bit color.`
}

function help(yargs, helpPage) {
	const images = (function () {
		if (terminalFeatures.images) {
			return {
				space: '\t',
				cc: createImage({
					name: 'logo',
					file: join(dirname(fileURLToPath(import.meta.url)), '/../media/CCLogo.png'),
					height: 3,
				}),
			}
		}
		return {
			space: '',
			cc: {
				render: () => '',
			},
		}
	})();
	const header = (() => {
		if (!terminalFeatures.color.has16m) {
			return () => stripIndent(colorReplacer)`
				${`title|${metadata.name}`}
				${images.space}${metadata.description}
				${images.space}${`grey|${metadata.version(3)}`}
			`
		}
		const headerText = (() => {
			switch (true) {
				case terminalFeatures.font.enhanced:
					return [
						colorReplacer`${'red| ━┳━╸     '}${'bright|╭──╮  ╷'}`,
						colorReplacer`${'blue|  ┃ ┏━┓╻ ╻'}${'bright|│  ╭─╮│╭─╮╭─╮'}`,
						colorReplacer`${'green|  ╹ ╹  ┗━┛'}${'bright|╰──╰─╯╵╰─╯╵  '}`,
					]
				case terminalFeatures.font.basic:
					return [
						colorReplacer`${'red| ─┬─      '}${'bright|┌──┐  ┐'}`,
						colorReplacer`${'blue|  │ ┌─ ┐ ┌'}${'bright|│  ┌─┐│┌─╮┌─┐'}`,
						colorReplacer`${'green|  └ ┘  └─┘'}${'bright|└──└─┘└╰─┘┘  '}`,
					]
				default:
					return [
						`${clr.red} ___${clr.red.out}        __`,
						`${clr.blue}  | ,_${clr.green.out}     |     |   ,_`,
						`${clr.green}  | |  |_|${clr.blue.out} |__(_)|(_)|  `,
					]
			}
		})();
		return () => stripIndent(colorReplacer)`
			${headerText[0]}
			${images.space}${headerText[1]} ${`normal|${metadata.description}`}
			${images.space}${headerText[2]} ${`grey|${metadata.version(3)}`}
		`
	})();
	const synopsis = stripIndent(colorReplacer)`
		${'title|Synopsis:'}
		${`command|${metadata.bin}`} ${'option|[options]'} "${'argument|color description'}"
	`;
	const epilogue = stripIndent(colorReplacer)`
		${`title|${metadata.copyright}`}. ${`grey|Released under the ${metadata.license} License.`}
		${`grey|Issues?: ${metadata.bugs}`}
	`;
	const pages = {
		default: {
			usage: stripIndent(colorReplacer)`
				${'title|Usage:'}
				In it's simplest form, '${`command|${metadata.bin}`} ${'argument|color'}', will take any of the color expressions listed below and transform it into a simple hexadecimal triplet string, i.e '${'argument|AA00BB'}', ideal for passing into the 'set_color' built-in in fish-shell, or providing the basis of further color processing.

				It can return a wide range of color assignment and manipulations. See the examples below.

				When outputting SGR codes, colors will be shifted to the availalble 256 or ansi color palette if 24 bit color is unavailable or will be omitted in a monochromatic terminal to make usage across environments safe.

				The CLI command respects ${'option|--color=16m'}, ${'option|--color=256'}, ${'option|--color'} and ${'option|--no-color'} flags.

				It does not affect value based output, such as the default or ${'option|--rgb'} output, it only effects the ${'option|--in'}, ${'option|--out'}, ${'option|--message'} and ${'option|--swatch'} outputs.

				The motivation for this is to allow more sophisticated graphic visualisation using in modern, xterm-compatible terminal emulators that have added 24 bit support.

				The ${'argument|color'} can be defined in any the following formats:

				CSS Hexadecimal
					${'argument|[#]RRGGBB'} or ${'argument|[#]RGB'} where R, G and B are '0'-'F'.

				CSS Named Colors
					${'red|Red'}, ${'green|green'}, ${'hotpink|hotpink'}, ${'chocolate|chocolate'}... (see '${'option|--help named'}')

				RGB
					${'argument|rgb:R,G,B'} or ${'argument|rgb(R,G,B)'} where ${'red|R'}, ${'green|G'} and${'blue|B'} are 0-255.
					Spaces require quoting/escaping on the CLI. i.e '${'argument|rgb(R, G, B)'}'

				HSL (${'red|H'}${'green|u'}${'blue|e'} ${'dark|Sat'}${'msat|ura'}${'red|tion'} ${'dark|Lig'}${'mlight|htn'}${'bright|ess'})
					${'argument|hsl:H,S,L'} where H is 0-360, S 0-100 and L 0-100

				HSV (${'red|H'}${'green|u'}${'blue|e'} ${'dark|Sat'}${'msat|ura'}${'red|tion'} ${'dark|V'}${'mlight|al'}${'bright|ue'})
					${'argument|hsv:H,S,V'} where H is 0-360, S 0-100 and V 0-100

				HSB (${'red|H'}${'green|u'}${'blue|e'} ${'dark|Sat'}${'msat|ura'}${'red|tion'} ${'dark|Bri'}${'mlight|ght'}${'bright|ness'})
					${'argument|hsb:H,S,B'} where H is 0-360, S 0-100 and B 0-100 (actually just an alias for HSV)

				HWB (${'red|H'}${'green|u'}${'blue|e'} ${'bright|White'} ${'dark|Black'})
					${'argument|hwb:H,W,B'} where H is 0-360, W 0-100 and B 0-100

				Styles and Resets
					'reset', 'normal', ${'ul|underline'}, ${'invert|invert'}, ${'bold|bold'}... (see '${'option|--help special'}')

				A number of color ${'argument|operations'} can be specified, either before or after the base color declaration.

					${'argument|light'}: lighten by 20%
					${'argument|dark'}: darken by 20%
					${'argument|lighten'} ${'option|percent'}: lighten by ${'option|percent'}
					${'argument|darken'} ${'option|percent'}: darken by ${'option|percent'}
					${'argument|mono'}: make monochrome
					${'argument|saturate or sat'} ${'option|percent'}: saturate by ${'option|percent'}
					${'argument|desaturate or des'} ${'option|percent'}: desaturate by ${'option|percent'}
					${'argument|spin'} ${'option|degrees'}: spin hue by by ${'option|degrees'}
					${'option|color'} ${'argument|mix'} ${'option|color'}: mix colors
			`,
			examples: () => [
				{
					Margin: ' ',
					Command: colorReplacer`${`command|${metadata.bin}`} ${'argument|purple'}`,
					Result: colorReplacer`${'grey|→'} 800080`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'argument|bold purple'}`,
					Result: colorReplacer`→ --bold 800080`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m label'} ${'argument|purple'}`,
					Result: colorReplacer`→ a colored, isolated message, ${'purple|label'}.`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--in'} ${'argument|purple'}`,
					Result: colorReplacer`→ ^[[38;2;128;0;128m setting the terminal ${'purple|color'}.`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--rgb'} ${'argument|purple'}`,
					Result: colorReplacer`→ rgb(128, 0, 128)`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--swatch'} ${'argument|purple'}`,
					Result: colorReplacer`→ ${'purple|\u2588\u2588'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--swatch'} ${'argument|purple desat 70'}`,
					Result: colorReplacer`→ ${'purpleSwatch|\u2588\u2588'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'argument|hsb:45,100,100'}`,
					Result: colorReplacer`→ FFBF00`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m label'} ${'argument|hsb:45,100,100'}`,
					Result: colorReplacer`→ a colored, isolated message, ${'orange|label'}.`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--in'} ${'argument|hsb:45,100,100'}`,
					Result: colorReplacer`→ ^[[38;2;255;191;0m setting the terminal ${'orange|color'}.`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--rgb'} ${'argument|hsb:45,100,100'}`,
					Result: colorReplacer`→ rgb(255, 191, 0)`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--swatch'} ${'argument|hsb:45,100,100'}`,
					Result: colorReplacer`→ ${'orange|\u2588\u2588'}`,
				},
			],
			layout: width => ({
				showHeaders: false,
				config: {
					Margin: {
						minWidth: 1,
						maxWidth: 1,
					},
					Command: {
						minWidth: 30,
						maxWidth: 80,
					},
					Result: {
						maxWidth: width - 34,
					},
				},
			}),
			more: stripIndent(colorReplacer)`
				${'title|Custom Names:'}
				Any color definition can be prefixed with a 'name:' so palettes can be output.

					> ${`command|${metadata.bin}`} ${clr.argument}bob: black lighten 50 saturate 50 spin 180${clr.normal}
					40BFBF

					> ${`command|${metadata.bin}`} ${'option|--rgb'} ${'argument|bob:'}
					rgb(64, 191, 191)

					> ${`command|${metadata.bin}`} ${'option|--swatch'} ${clr.argument}bob:${clr.normal}
					${clr.bob}\u2588\u2588${clr.normal}
			`,
		},
		named: {
			usage: stripIndent(colorReplacer)`
				${'title|Named Colors:'}
				All standard CSS names are accepted.
			`,
			examples: width => {
				const namedPalette = palette({}, _.mapValues(names, color => `#${color}`));
				const namedArray = Object.keys(names);
				const columns = Math.floor(width / 28);
				const table = [];
				while (namedArray.length > 0) {
					const cell = {
						margin: ' ',
					};
					for (let c = 0; c < columns; c++) {
						const src = namedArray.shift();
						if (src) {
							cell[`color_${c}`] = namedPalette[src].toSwatch();
							cell[`name_${c}`] = src;
						}
					}
					table.push(cell);
				}
				return table
			},
			layout: width => {
				const columns = Math.floor(width / 28);
				const grid = {
					margin: {
						minWidth: 2,
					},
				};
				for (let c = 0; c < columns; c++) {
					grid[`color_${c}`] = {
						minWidth: 2,
					};
					grid[`name_${c}`] = {
						minWidth: 16,
					};
				}
				return {
					showHeaders: false,
					config: grid,
				}
			},
			more: '',
		},
		special: {
			usage: stripIndent(colorReplacer)`
				${'title|Special Formatters:'}
				The following keywords modify the meaning or destination of the color, or provide enhanced foramtting. They only work when used with the command switches that actually output SGR codes, namely: ${'option|--message'}, ${'option|--swatch'}, ${'option|--in'} and ${'option|--out'}.

				When used with the default command or with the ${'option|--rgb'} switch, they have no effect and the value of the base color (plus any processing) will be output.

				${'argument|background'}: Set the background color, rather than the foreground.

				${'argument|normal'}: Set the color to the default foreground and background.
				${'argument|reset'}: Sets colors and special formatting back to the default.

				${'argument|bold'}: Set the font to bold.
				${'argument|italic'}: Set the font to italic.
				${'argument|underline'}: Set underline.
				${'argument|faint'}: Set the colour to 50% opacity.
				${'argument|invert'}: Invert the foreground and background.
				${'argument|blink'}: Annoying as a note in Comic Sans, attached to a dancing, purple dinosaur with a talking paperclip.

				All of the above formatters need the correct code to end the range, either provided by using the ${'option|--out'} switch, using the 'reset' keyword, or simply use the ${'option|--message'} option to automatically set the end range SGR code. Using 'normal' alone won't fully clear the formatting.
			`,
			examples: () => [
				{
					Margin: ' ',
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m "Bold yellow text"'} ${'argument|bold yellow'}`,
					Result: colorReplacer`${'grey|→'} ${'exBold|Bold yellow text'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m "Faint yellow text"'} ${'argument|faint yellow'}`,
					Result: colorReplacer`${'grey|→'} ${'exFaint|Faint yellow text'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|--swatch'} ${'argument|faint yellow'}`,
					Result: colorReplacer`${'grey|→'} ${'exFaint|\u2588\u2588'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m Italics'} ${'argument|italic #33FF33'}`,
					Result: colorReplacer`${'grey|→'} ${'exItalic|Italics'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m " -Inverted- "'} ${'argument|invert #7B00B1'}`,
					Result: colorReplacer`${'grey|→'} ${'exInvert| -Inverted- '}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m " Background "'} ${'argument|background dark red'}`,
					Result: colorReplacer`${'grey|→'} ${'exBackground| Background '}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m "Underlined"'} ${'argument|underline #fff'}`,
					Result: colorReplacer`${'grey|→'} ${'exUnderline|Underlined'}`,
				},
				{
					Command: colorReplacer`${`command|${metadata.bin}`} ${'option|-m "Flashy Thing"'} ${'argument|blink orange'}`,
					Result: colorReplacer`${'grey|→'} ${'exBlink|Flashy Thing'}`,
				},
			],
			layout: width => ({
				showHeaders: false,
				config: {
					Margin: {
						minWidth: 1,
						maxWidth: 1,
					},
					Command: {
						minWidth: 30,
						maxWidth: 80,
					},
					Result: {
						maxWidth: width - 34,
					},
				},
			}),
			more: stripIndent(colorReplacer)`
				${'title|Note:'}
				Obviously all this depends on your terminals support for the extended formatting.

				The latest iTerm2 builds and X's XTerm have full support for everything ${`command|${metadata.bin}`} can do, and anything that supports a terminal type of 'xterm-256color' will cover a fairly complete subset.

				For example, Apple's Terminal.app doesn't have 24 bit color support nor does it have support for italics, but everything else works well.
			`,
		},
	};
	const container = truwrap({
		mode: 'container',
		outStream: process.stderr,
	});
	const windowWidth = container.getWidth();
	const renderer = truwrap({
		left: 2,
		right: 0,
		tabWidth: 2,
		outStream: process.stderr,
	});
	const contentWidth = renderer.getWidth();
	const page = (section => {
		switch (section) {
			case 'named':
				return pages.named
			case 'special':
				return pages.special
			default:
				return pages.default
		}
	})(helpPage);
	yargs.usage('');
	yargs.wrap(contentWidth);
	container.break();
	container.write(images.cc.render({
		nobreak: false,
		align: 2,
	}));
	container.write(header()).break();
	container.write(spectrum(windowWidth, '—')).break();
	renderer.write(synopsis);
	renderer.write(yargs.getUsageInstance().help()).break(2);
	renderer.write(page.usage).break(2);
	renderer.write(colorReplacer`${'title|Examples:'}`).break();
	renderer.panel(page.examples(contentWidth), page.layout(contentWidth)).break(2);
	renderer.write(page.more).break(2);
	container.write(`${clr.dark.in}${'—'.repeat(windowWidth)}${clr.dark.out}`);
	renderer.write(epilogue).end();
}

const yargsInstance = yargs(hideBin(process.argv))
	.strictOptions()
	.help(false)
	.version(false)
	.options({
		h: {
			alias: 'help',
			describe: 'Display this help.'
		},
		v: {
			alias: 'version',
			count: true,
			describe: 'Return the current version on stdout. -vv Return name & version.'
		},
		V: {
			alias: 'verbose',
			count: true,
			describe: 'Be verbose. -VV Be loquacious.'
		},
		m: {
			alias: 'message',
			nargs: 1,
			describe: 'Format message with SGR codes'
		},
		i: {
			alias: 'in',
			boolean: true,
			describe: 'Output SGR color escape code.'
		},
		o: {
			alias: 'out',
			boolean: true,
			describe: 'Output cancelling SGR color escape code.'
		},
		t: {
			alias: 'type',
			choices: ['none', 'direct', 'fish'],
			describe: 'CLI styling flags output.',
			default: 'direct',
			requiresArg: true
		},
		r: {
			alias: 'rgb',
			boolean: true,
			describe: 'Output color as rgb(r, g, b).'
		},
		s: {
			alias: 'swatch',
			boolean: true,
			describe: 'Output an isolated color swatch.'
		},
		color: {
			describe: 'Force color depth --color=256|16m. Disable with --no-color'
		}
	}).showHelpOnFail(false, `Use 'trucolor --help' for help.`);
const {argv} = yargsInstance;
global.trucolorCLItype = argv.type;
if (argv.version) {
	process.stdout.write(`${metadata.version(argv.version)}\n`);
	process.exit(0);
}
if (argv.verbose) {
	const settings = {
		borderColor: 'green',
		margin: {
			bottom: 1,
			top: 1
		},
		padding: {
			bottom: 0,
			top: 0,
			left: 2,
			right: 2
		}
	};
	const titling = mode => stripIndent(colorReplacer)`
		${`title|${metadata.name}`}${`dim| │ v${metadata.version()}`}
		Mode: ${mode}
	`;
	switch (argv.verbose) {
		case 1:
			console.verbosity(4);
			console.log(box(titling('Verbose'), settings));
			break
		case 2:
			console.verbosity(5);
			console.log(box(titling('Some might say loquacious'), settings));
			console.yargs(argv);
			console.debug('');
			break
		default:
			console.verbosity(3);
	}
}
if (!(process.env.USER === 'root' && process.env.SUDO_USER !== process.env.USER)) {
	updateNotifier({
		pkg: pkg$1
	}).notify();
}
if (argv.help) {
	(async () => {
		await help(yargsInstance, argv.help);
	})();
} else {
	if (argv._.length === 0) {
		console.error('At least one color must be specified.');
		process.exit(1);
	}
	const buffer = parser(argv._.join(' '))
		.map(color => render(color, {
			format: 'cli'
		}));
	const isList = buffer.length > 1;
	buffer.forEach(color => {
		if (console.canWrite(4)) {
			console.log('');
			console.pretty(color, {
				depth: 2
			});
		}
		const output = isList ? `${color.name}: ` : '';
		const lineBreak = isList ? '\n' : '';
		switch (true) {
			case argv.message !== undefined:
				process.stdout.write(`${output}${color.in}${argv.message}${color.out}${lineBreak}`);
				break
			case argv.in:
				if (isList) {
					throw new Error('SGR output only makes sense for a single color.')
				}
				process.stdout.write(`${color.in}`);
				break
			case argv.out:
				if (isList) {
					throw new Error('SGR output only makes sense for a single color.')
				}
				process.stdout.write(`${color.out}`);
				break
			case argv.rgb:
				process.stdout.write(`${output}${color.rgb}${lineBreak}`);
				break
			case argv.swatch:
				process.stdout.write(`${output}${color.toSwatch()}${lineBreak}`);
				break
			default:
				process.stdout.write(`${output}${color}${lineBreak}`);
		}
	});
}
