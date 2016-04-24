'use strict'
/*
 *  Client Gulp File
 */

const gulp = require('gulp')
const cordial = require('@thebespokepixel/cordial')

// Comtranspilationatting
gulp.task('coffee', cordial.compile.coffee(['src/**/*.coffee'], './'))

// Tests
gulp.task('test', cordial.test.coffeeVows(['test/*.coffee']))

// Guppy Hooks
gulp.task('start-release', gulp.series('reset', 'test'))
gulp.task('finish-release', gulp.series('backup'))

// Default
gulp.task('default', gulp.series('bump', 'coffee'))
