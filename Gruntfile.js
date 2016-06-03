module.exports = function ( grunt ) {

    grunt.initConfig({

        handlebars: {

            compile: {

                options: {

                    namespace: 'adcirc.templates',
                    processName: function ( filepath ) {

                        var filename = filepath.split('/').pop();
                        return filename.split('.')[0];

                    }

                },

                files: {

                    'templates/templates.js': [ 'templates/**/*.handlebars' ]

                }

            }

        },
        
        bake: {
            
            index: {

                files: {

                    "index.html": "html/index.html"

                }

            }
            
        },

        watch: {

            templates: {
                files: [ 'templates/**/*.handlebars' ],
                tasks: [ 'handlebars' ]
            },

            html: {
                files: [ 'html/**/*.html' ],
                tasks: [ 'bake' ]
            }

        }

    });

    grunt.loadNpmTasks( 'grunt-contrib-handlebars' );
    grunt.loadNpmTasks( 'grunt-bake' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

};