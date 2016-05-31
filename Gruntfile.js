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

                    'templates/templates.js': [ 'templates/*.handlebars' ]

                }

            }

        },

        watch: {

            files: [ 'templates/*.handlebars' ],
            tasks: [ 'handlebars' ]

        }

    });

    grunt.loadNpmTasks( 'grunt-contrib-handlebars' );
    grunt.loadNpmTasks( 'grunt-contrib-watch' );

};