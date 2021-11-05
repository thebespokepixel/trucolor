import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import cleanup from 'rollup-plugin-cleanup'

const external = id => !id.startsWith('src') && !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0')

const config = [{
	external,
	plugins: [resolve(), commonjs(), cleanup({comments: [/^\*\*/]})],
	input: 'src/index.js',
	output: {
		file: 'index.js',
		format: 'es',
	},
}, {
	external,
	plugins: [resolve(), json({preferConst: true}), commonjs(), cleanup()],
	input: 'src/cli/index.js',
	output: {
		banner: '#! /usr/bin/env node',
		file: 'trucolor.js',
		format: 'es',
	},
}]

export default config
