module.exports = function (grunt) {

    //Project configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: [
                'Gruntfile.js',
                'custom/clockworksms/*.js',
                'custom/Extension/**/*.js',
                'modules/**/*.js'
            ]
        },

        zip: {
            'long-format': {
                src: [
                    'custom/**/*.*',
                    'modules/**/*.*',
                    'manifest.php',
                    'LICENSE',
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