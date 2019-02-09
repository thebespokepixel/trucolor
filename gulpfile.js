/* ─────────────╮
 │ gulp/cordial │
 ╰──────────────┴────────────────────────────────────────────────────────────── */
const gulp = require('gulp')
const rename = require('gulp-rename')
const chmod = require('gulp-chmod')
const rollup = require('gulp-better-rollup')
const babel = require('rollup-plugin-babel')
const resolve = require('rollup-plugin-node-resolve')
const commonjs = require('rollup-plugin-commonjs')
const json = require('rollup-plugin-json')
const lodash = require('babel-plugin-lodash')

const external = id => !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0')

const babelConfig = {
	plugins: [lodash],
	presets: [
		['@babel/preset-env', {
			modules: false,
			targets: {
				node: '8.0.0'
			}
		}]
	],
	comments: false,
	exclude: 'node_modules/**'
}

gulp.task('cjs', () =>
	gulp.src('src/index.js')
		.pipe(rollup({
			external,
			plugins: [resolve(), json({preferConst: true}), commonjs(), babel(babelConfig)]
		}, {
			format: 'cjs'
		}))
		.pipe(gulp.dest('.'))
)

gulp.task('es6', () =>
	gulp.src('src/index.js')
		.pipe(rollup({
			external,
			plugins: [resolve(), json({preferConst: true}), commonjs(), babel(babelConfig)]
		}, {
			format: 'es'
		}))
		.pipe(rename('index.mjs'))
		.pipe(gulp.dest('.'))
)

gulp.task('cli', () =>
	gulp.src('src/cli/main.js')
		.pipe(rollup({
			external,
			plugins: [resolve(), json({preferConst: true}), commonjs(), babel(babelConfig)]
		}, {
			banner: '#! /usr/bin/env node',
			format: 'cjs'
		}))
		.pipe(rename('trucolor'))
		.pipe(chmod(0o755))
		.pipe(gulp.dest('bin'))
)

gulp.task('default', gulp.series('cjs', 'es6', 'cli'))
