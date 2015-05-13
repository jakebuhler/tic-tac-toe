module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        browserify: {
            app: {
                src: "src/client/app.js",
                dest: "public/build/app.js",
                options: {
                    debug: true
                }
            },
            specs: {
                src: "spec/**/*[sS]pec.js",
                dest: "spec/build/specs.js"
            }
        },
        express: {
            dev: {
                options: {
                    script: "src/server/main.js"
                }
            }
        },
        watch: {
            express: {
                files: [ "src/**/*.js" ],
                tasks: [ "browserify:app", "express:dev" ],
                options: {
                    spawn: false
                }
            }
        },
        jasmine: {
            all: {
                options: {
                    vendor: [
                        "node_modules/jquery/dist/jquery.js",
                        "node_modules/underscore/underscore.js",
                        "node_modules/backbone/backbone.js"
                    ],
                    specs: "<%= browserify.specs.dest %>",
                    outfile: "spec/build/SpecRunner.html",
                    keepRunner: true
                }
            }
        }

    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-jasmine");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-express-server");

    grunt.registerTask("run", [ "browserify:app", "express:dev", "watch" ]);
    grunt.registerTask("test", [ "browserify:specs", "jasmine" ]);

};
