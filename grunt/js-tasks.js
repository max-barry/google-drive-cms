var webpackModule = require("webpack");

module.exports = {
    jshint: {
        files: {
            src: ["<%= package.src.js %>**/*.js"]
        },
        options: {
            globals: {
                jQuery: true,
                console: true,
                module: true,
                alert: true,
                document: true,
                window: true
            }
        }
    },
    webpack: {
        entry: {
            app: "<%= package.src.js %>app.js",
            index: "<%= package.src.js %>index.js",
            // Each additional bundle you require (e.g. index page js, or contact page js)
            // should be added here and referenced as a script tag in the corresponding template
            // index: "<%= package.src.js %>index.js",
        },
        output: {
            path: "<%= package.build.js %>",
            filename: "[name].js"
        },
        plugins: [
            new webpackModule.optimize.DedupePlugin(),
            new webpackModule.optimize.UglifyJsPlugin()
        ],
        resolve: {
            extensions: ['', '.js', '.jsx',] 
        },
        module: {
            loaders: [
                {  test: /\.html$/, loader: "html-loader" }
            ]
        }
    },
    webpack__dev: {
        debug: true,
        devtool: "eval",
        entry: "<%= webpack.js.entry %>",
        output: "<%= webpack.js.output %>",
        module: "<%= webpack.js.module %>",
        resolve: "<%= webpack.js.resolve %>"
    },
    modernizr: {
        dest: "<%= package.build.js %>modernizr.min.js",
        parseFiles: true,
        customTests: [],
        uglify: true,
        tests: [
            // Tests to explicitly include
        ],
        options: [
            "setClasses",
            "addTest",
            "domPrefixes",
            "prefixes",
        ]
    },
    docco: {
        src: ["<%= package.src.js %>**/*.js"],
        options: {
            output: "docs/js/"
        }
    },
    watch: {
        files: ["<%= package.src.js %>**/*.js"],
        tasks: ["jshint", "webpack:js_dev"]
    }
};
