module.exports = function(grunt) {
  var bannerContent = '/* \n' + 
					' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                    ' * <%= pkg.description %> \n' +
                    ' * <%= pkg.repository.url %> \n' +
                    ' * \n' + 
                    ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> <jonahvsweb@gmail.com> \n' +
                    ' * \n' + 
                    ' * Released under the <%= pkg.license %> license \n' + 
                    '*/ \n',
        name = '<%= pkg.name %>';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    
    // Copy 
    copy: {
      src: {
        nonull: true,
        src: 'src/touchpoint.js',
        dest: 'dist/touchpoint.js',
      },
    },
    // Concat
    concat: {
      options: {
        separator: ';',
        banner: bannerContent
      },
      es5: {
        src: ['dist/touchpoint.js'],
        dest: 'dist/touchpoint-es5.js'
      },
      es6: {
        src: ['src/touchpoint.js'],
        dest: 'dist/touchpoint.js'
      }
    },
    // Babel
    babel: {
      options: {
        sourceMap: true, 
        presets: ['env']
      }, 
      convert: {
        files: {
          'dist/touchpoint-es5.js': 'dist/touchpoint.js'
        }
      }
    }, 
    // Uglify
    uglify: {
      options: {
        banner: bannerContent
      },
      es5: {
        files: {
          'dist/touchpoint-es5.min.js': ['dist/touchpoint-es5.js']
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
    },
    // Watch 
    watch: {
      options: {
        livereload: true
      }, 
      js: {
        files: [
          'dist/*.js', 
          '*.html'
        ]
      }
    }, 
    // Connect
    connect: {
      server: {
        options: {
          port: 9000,
          base: '.',
          hostname: '0.0.0.0',
          protocol: 'http',
          livereload: true,
          open: true 
        }
      }
    }
  });
  // Load Tasks
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-babel');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // Register Tasks
  grunt.registerTask('es6', ['babel']);
  grunt.registerTask('jsErrors', ['jshint']);
  grunt.registerTask('server', ['connect', 'watch']);
  grunt.registerTask(
	  'build', 
	  'Compiles all of the assets and copies the files to the build directory.', 
	  ['copy', 'concat', 'babel', 'uglify']
	);
};