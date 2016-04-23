var grunt = require("grunt");

module.exports = {
    markdown: {
        src: "./Readme.md",
        dest: "<%= package.templates.data %>readme.json",
        // dest: "./Readme.html",
        options: {
            template: "<%= package.paths.templates %>misc/readme.template.html",
            postCompile: function(src, context) {
                var json = {};

                // Remove the first two lines of the readme
                json.content = src.split("\n").slice(2).join("\n");

                // Load Cheerio for DOM manipulation
                var cheerio = require("cheerio"),
                    $ = cheerio.load(src);

                // For each header in the document, build a navigation tree
                var headers = [];

                $("h2").each(function(idx, header) {
                    headers.push({
                        id: $(header).attr("id"),
                        title: $(header).text()
                    });
                });

                json.headers = headers;

                return JSON.stringify(json);
            }
        }
    },
    swig: {
        options: {
            templatePath: "<%= package.paths.templates %>",
            data: function() {
                /**
                Take the .json file in the data directory,
                and then merge the objects together
                */
                var path = require("path"),
                    fs = require("fs"),
                    _ = require("lodash");

                var pathToDatafiles = path.join(grunt.file.readJSON("package.json").templates.data, "**/*.json");

                var dataFiles = grunt.file.glob.sync(pathToDatafiles),
                    dataObj = {};

                dataFiles.forEach(function(df) {
                    var dataToMerge = {};

                    var name = path.parse(df).name,
                        data = grunt.file.readJSON(df);

                    if (name === "data") {
                        /**
                        Variables within the data.json file are global.
                        They can be used in templates without needing prefixes
                        (e.g. {{var}} instead of {{data.var}})
                        */
                        dataToMerge = data;
                    } else {
                        dataToMerge[name] = data;
                    }

                    dataObj = _.merge(dataObj, dataToMerge);
                });
                return dataObj;
            }()
        },
        files: [{
            expand: true,
            cwd: "<%= package.templates.pages %>",
            ext: ".html",
            src: ["**/*.html"],
            dest: "<%= package.paths.build %>"
        }],
    },
    prettify: {
        files: [{
            expand: true,
            cwd: "<%= package.paths.build %>",
            src: ["**/*.html"],
            dest: "<%= package.paths.build %>"
        }]
    },
    htmllint: {
        files: [{
            expand: true,
            cwd: "<%= package.paths.build %>",
            src: ["**/*.html"],
        }]
    },
    watch: {
        files: [
            "<%= package.paths.templates %>**/*.html",
            "<%= package.templates.data %>**/*.{json,yml}"
        ],
        tasks: ["swig"]
    }
};
