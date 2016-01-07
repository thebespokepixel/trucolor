gulp = require 'gulp'
gutil = require 'gulp-util'
coffee = require 'gulp-coffee'
spawn = require 'gulp-spawn'
vows = require 'gulp-vows'
git = require 'gulp-git'

gulp.task 'default', ->
	gulp.src './src/**/*.coffee'
		.pipe coffee
			bare: true
		.on 'error', gutil.log
		.pipe gulp.dest './'

gulp.task 'test', ->
	gulp.src './test/*.coffee'
		.pipe coffee
			bare: true
		.pipe vows
			reporter: 'spec'

gulp.task 'pre-commit', [
	'test'
]
