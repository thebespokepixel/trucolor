'use strict'
/*
 *  Client Gulp File
 */

const gulp = require('gulp')
const cordial = require('@thebespokepixel/cordial')

// Default
gulp.task('default', ['coffee'])

// Versioning
gulp.task('bump', cordial.version.build.inc)
gulp.task('reset', cordial.version.build.reset)
gulp.task('write', cordial.version.build.write)

// Comtranspilationatting
gulp.task('coffee', ['bump', 'write'], cordial.compile.coffee(['src/**/*.coffee'], './'))

// Tests
gulp.task('test', cordial.test.coffeeVows(['test/*']))

// Git
gulp.task('commit', cordial.git.commitAll)
gulp.task('push', cordial.git.pushAll('origin'))
gulp.task('backup', ['push'], cordial.git.pushAll('backup'))

// npm
gulp.task('publish', ['test'], cordial.npm.publish)

// Guppy Hooks
gulp.task('post-flow-release-start', ['reset', 'write'], cordial.flow.release.start)
gulp.task('post-flow-release-finish', ['publish', 'push'])
gulp.task('filter-flow-release-start-version', cordial.flow.release.versionFilter)
gulp.task('filter-flow-release-finish-tag-message', cordial.flow.release.tagFilter)
