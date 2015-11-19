module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [
            ["babelify", {
              presets: ['es2015']
            }]
          ]
        },
        files: {
          "./dist/main.js": ["./js/main.js"]
        }
      }
    },
    watch: {
      scripts: {
        files: ['js/**.js'],
        tasks: ['browserify'],
        options: {
          livereload: 1337,
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask("default", ["babel"]);
  grunt.registerTask("build", ["browserify"]);
};
