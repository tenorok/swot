module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['watch', 'concat']);
    grunt.registerTask('production', ['concat', 'cssmin', 'uglify']);

    grunt.initConfig({
        watch: {
            scripts: {
                files: 'blocks/*/*.js',
                tasks: ['concat'],
                options: {
                    debounceDelay: 1000
                }
            }
        },
        concat: {
            css: {
                src: 'blocks/*/*.css',
                dest: 'common/common.css'
            },
            js: {
                src: ['blocks/page/page.js', 'blocks/*/*.js'],
                dest: 'common/common.js'
            }
        },
        cssmin: {
            compress: {
                files: {
                    'common/common.css': 'common/common.css'
                },
                options: {
                    report: 'gzip'
                }
            }
        },
        uglify: {
            compress: {
                files: {
                    'common/common.js': 'common/common.js'
                },
                options: {
                    report: 'gzip'
                }
            }
        }
    });
};