module.exports = function (grunt) {
  var config = grunt.file.readYAML('Gruntconfig.yml');
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		sass: {
			dist: {
        src: config.scssDir + 'style.scss',
				dest: config.cssDir + 'style.css'
			}
		},

    watch: {
    	sass: {
    		files: config.scssDir + "**/*.scss",
    		tasks: ['sass']
    	}
    },

    responsive_images: {
      dev: {
        options: {
          engine: 'im',
          sizes: [{
            width: 1920,
            suffix: '-large',
            quality: 90
          },{
            width: 1280,
            suffix: '-medium',
            quality: 80
          },{
            width: 600,
            suffix: '-small',
            quality: 80
          }]
        },

        files: [{
          expand: true,
          src: ['*.{gif,jpg,png}'],
          cwd: config.imgSrcDir,
          dest: config.imgOptDir
        }]
      }
    }
	});

  grunt.loadNpmTasks('grunt-responsive-images');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-mkdir');

	grunt.registerTask('default', [
    'responsive_images'
	]);
};
