module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({
    "babel": {
      "options": {
        sourceMap: true
      },
      "dist": {
        files: {
          "bin/main.js": "js/main.js"
        }
      }
    }
  });

  grunt.registerTask("default", ["babel"]);
};
