module.exports = function(grunt){

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dist: {
        files: {
          'build/js/global.min.js': ['js/_houston/*.js', 'js/global.js'],
          'build/js/html5shiv.min.js': 'js/_default/html5shiv.js'
        }
      }
    },

    sass_globbing: {
      your_target: {
        files: {
          'scss/_imports.scss': ['scss/components/**/*.scss', 'scss/layouts/**/*.scss'],
        },
        options: {
          useSingleQuotes: false,
          signature: '// Imports all the globbing files. This file is then imported to global.scss'
        }
      }
    },

    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'build/css/global.css': 'scss/global.scss'
        }
      }
    },

    postcss: {
      options: {
        map: false,

        processors: [
          require('autoprefixer')({
            browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
          })
        ]
      },

      dist: {
        files: {
          'build/css/global.css': 'build/css/global.css'
        }
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'build/img'
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      scripts: {
        files: ['js/**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false
        }
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass_globbing', 'sass', 'postcss'],
        options: {
          spawn: false
        }
      },
      html: {
        files: ['*.html'],
        tasks: [],
        options: {
          spawn: false
        }
      }
    },

    connect: {
      server: {
        options: {
          livereload: true,
          port: 8000,
          hostname: 'localhost'
        }
      }
    }
  });

  grunt.registerTask('default', ['watch']);
  grunt.registerTask('serve', ['connect', 'watch']);
  grunt.registerTask('minify', ['newer:imagemin']);
};
