module.exports = function(grunt) {
    'use strict';

    // Load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    /* =============================================================================
       Project Configuration
       ========================================================================== */

    grunt.initConfig({

        /* =============================================================================
           Get NPM data
           ========================================================================== */

        pkg: grunt.file.readJSON('package.json'),

        /* =============================================================================
           Task Config: LESS
           ========================================================================== */

        less: {
            options: {
                strictMath: true,
                sourceMap: true,
                strictImports: true,
                outputSourceFiles: true,
                report: 'min',
                compress: false
            },
            theme: {
                options: {
                    sourceMapURL: 'main.min.css.map',
                    sourceMapFilename: 'css/main.min.css.map'
                },
                files: {
                    'css/main.min.css': 'less/styles.less'
                }
            }
        },

        /* =============================================================================
           Task config: Autoprefixer
           ========================================================================== */

        autoprefixer: {
            options: {
                browsers: [
                    'last 2 versions',
                    'ie 9',
                    'android 2.3',
                    'android 4',
                    'opera 12'
                ],
                map: true
            },
            theme: {
                src: 'css/main.min.css'
            }
        },

        /* =============================================================================
           Task Config: Watch
           ========================================================================== */

        watch: {
            less: {
                files: [
                    'less/*.less',
                    'less/mixins/*.less'
                ],
                tasks: [
                    'less',
                    'autoprefixer',
                    'notify:less'
                ],
                options: {
                    livereload: true
                }
            },
            js: {
	            files: [
                    'js/*.js'
                ],
                tasks: [
                    'uglify',
                    'notify:js'
                ],
                options: {
                    livereload: true
                }

            },
            html: {
	            files: [
                    '*.html'
                ],
                options: {
                    livereload: true
                }

            }
        },

        /* =============================================================================
           Task Config: Uglify
           ========================================================================== */

        uglify: {
            options: {
                sourceMap: true
            },
            js: {
                files: {
                    'js/main.min.js': [
                        'js/tooltips.js',
                        'js/main.js'
                    ]
                },
            }
        },

        /* =============================================================================
           Task Config: Notifications
           ========================================================================== */

        notify: {
            less: {
                options: {
                    title: 'LESS',
                    message: 'CSS generated and minified.'
                }
            },
            js: {
                options: {
                    title: 'Javascript',
                    message: 'Javascript minified.'
                }
            }
        }

    });

    /* =============================================================================
       Custom Tasks
       ========================================================================== */

    grunt.registerTask( 'build', [
        'less',
        'autoprefixer',
        'uglify'
    ]);
    grunt.registerTask( 'default', [
        'build',
        'watch'
    ]);

};
