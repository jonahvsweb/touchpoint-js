module.exports = function(grunt) {
  var bannerContent = '/* \n' + 
					' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                    ' * <%= pkg.description %> \n' +
                    ' * <%= pkg.repository.url %> \n' +
                    ' * \n' + 
                    ' * Copyright (c) 2015 <%= pkg.author %> <jonahvsweb@gmail.com> \n' +
                    ' * \n' + 
                    ' * Released under the <%= pkg.license %> license \n' + 
                    '*/ \n',
        name = '<%= pkg.name %>';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    babel: {
      options: {
        sourceMap: true
      }, 
      dist: {
        files: {
          'dist/touchpoint-es5.js': 'dist/touchpoint-es6.js'
        }
      }
    }, 
    // Clean
    clean: {
	  build: {
	    src: [ 'dist' ]
	  },
	  scripts: {
	    src: [ 'dist/*.js', '!dist/<%= pkg.name %>.js' ]
	  }
	},
    // Concat
    concat: {
      options: {
        separator: ';',
        banner: bannerContent
      },
      dist: {
        src: ['touchpoint.js'],
        dest: 'dist/touchpoint.js'
      }
    },
    // Uglify
    uglify: {
      options: {
        banner: bannerContent
      },
      dist: {
        files: {
          'dist/touchpoint.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    // JS Hint
    jshint: {
      files: ['Gruntfile.js', 'touchpoint.js', 'test/touchpoint.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          console: true,
          module: true,
          document: true
        }
      }
    }
  });
  // Load Tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-babel');
  // Register Tasks
  grunt.registerTask('es6', ['babel']);
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
  grunt.registerTask(
	  'build', 
	  'Compiles all of the assets and copies the files to the build directory.', 
	  ['clean:build', 'concat', 'uglify']
	);
};