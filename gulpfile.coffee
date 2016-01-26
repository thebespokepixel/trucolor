###
Client Gulp File
###

gulp = require 'gulp'
cordial = require '@thebespokepixel/cordial'

gulp.task 'bump', cordial.version.build.inc
gulp.task 'resetBuild', ['test'], cordial.version.build.reset

gulp.task 'compile', ['bump'], cordial.coffee.compile './src/**/*.coffee', './'

gulp.task 'test', cordial.test.coffeeVows 'test/*'

gulp.task 'commit', cordial.git.commitAll
gulp.task 'push', cordial.git.pushAll 'origin'
gulp.task 'backup', ['push'], cordial.git.pushAll 'backup'

gulp.task 'publish', ['test'], cordial.npm.publish

gulp.task 'post-flow-release-start', ['resetBuild'], cordial.flow.release.start
gulp.task 'post-flow-release-finish', ['publish', 'push']
gulp.task 'filter-flow-release-start-version', cordial.flow.release.versionFilter
gulp.task 'filter-flow-release-finish-tag-message', cordial.flow.release.tagFilter

gulp.task 'default', ['compile']
