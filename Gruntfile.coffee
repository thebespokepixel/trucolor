module.exports = (grunt) ->
	require('load-grunt-tasks') grunt

	# Project configuration.
	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'
		coffee:
			compile:
				options:
					bare: false
				files: [
					expand: true
					cwd: 'src/'
					src: ['*.coffee']
					dest: ''
					ext: '.js'
				,
					expand: true
					cwd: 'src/lib'
					src: ['**/*.coffee']
					dest: 'lib/'
					ext: '.js'
				]
		version:
			default:
				options:
					prefix: 'trucolor [(]v'
				src: ['bin/*.js','src/lib/**/*.coffee']
			readme:
				options:
					prefix: 'trucolor v'
				src: ['README.md']
		bump:
			options:
				updateConfigs: ['pkg']
				commitFiles: ['-a']
				pushTo: 'origin'
				commitMessage: 'Development Snapshot v%VERSION%'
				tagMessage: 'Development Snapshot v%VERSION%'
				gitDescribeOptions: '--tags --always --dirty=-d'
				commit: true
				createTag: true
				push: true


	grunt.registerTask 'patch',  ['edits', 'bump-only:patch', 'version', 'bump-commit']
	grunt.registerTask 'default', ['bump-only:prerelease', 'version', 'coffee:compile']
	grunt.registerTask 'edits', 'Capture number of edits between commits.', (phase = 'Development') ->
		pkg = grunt.file.readJSON 'package.json'
		edits = pkg.version.split('-')[1]
		commitMessage = "#{phase} Snapshot (#{edits} edits) v%VERSION%"
		grunt.config 'bump.options.commitMessage', commitMessage
		grunt.log.writeln "#{@name}, #{commitMessage}"
