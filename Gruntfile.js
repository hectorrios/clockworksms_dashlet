module.exports = function (grunt) {

    //Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                'Gruntfile.js',
                'clockworksms/*.js'
            ]
        },

        zip: {
            'long-format': {
                src: [
                    'api/**/*.*',
                    'clockworksms/*.*',
                    'language/**/*.*',
                    'jsgroupings/**/*.*',
                    'manifest.php',
                    'README.txt'
                ],

                dest: 'build/clockworksms.zip'
            }
        }
    });

    //Load plugins
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-zip');

    //Tasks
    grunt.registerTask('default', ['jshint']);
    grunt.registerTask('build', ['zip:long-format']);
};