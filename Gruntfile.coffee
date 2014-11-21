module.exports = (grunt) ->
	require('load-grunt-tasks') grunt

	# Project configuration.
	grunt.initConfig
		pkg: grunt.file.readJSON 'package.json'
		coffee:
			compile:
				options:
					bare: true
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
		shell:
			set:
				command: 'set'
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
				commitMessage: 'Development Snapshot v%VERSION%'
				tagMessage: 'Development Snapshot v%VERSION%'
				gitDescribeOptions: '--always --dirty=-d'
				commit: true
				createTag: true
				push: false


	grunt.registerTask 'patch',  ['edits', 'bump-only:patch', 'version', 'bump-commit']
	grunt.registerTask 'default', ['bump-only:prerelease', 'version', 'coffee:compile']
	grunt.registerTask 'edits', 'Capture number of edits between commits.', (phase = 'Developement') ->
        pkg = grunt.file.readJSON 'package.json'
        edits = pkg.version.split('-')[1]
        commitMessage = "#{phase} Snapshot (#{edits} edits) v%VERSION%"
        grunt.config 'bump.options.commitMessage', commitMessage
        grunt.log.writeln "#{@name}, #{commitMessage}"
