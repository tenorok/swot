module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'watch']);

    grunt.initConfig({
        concat: {
            js: {
                src: ['blocks/page/page.js', 'blocks/*/*.js'],
                dest: 'common/common.js'
            },
            css: {
                src: 'blocks/*/*.css',
                dest: 'common/common.css'
            }
        },
        watch: {
            scripts: {
                files: 'blocks/*/*.js',
                tasks: ['concat'],
                options: {
                    debounceDelay: 1000
                }
            }
        }
    });
};