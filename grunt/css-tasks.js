module.exports = {
    sass: {
        options: {
            includePaths: [
                '<%= package.paths.bower %>bourbon/app/assets/stylesheets/',
                '<%= package.paths.bower %>Materialize/sass/',
                '<%= package.paths.bower %>scut/dist/'
            ]
        },
        files: [{
            expand: true,
            cwd: "<%= package.src.scss %>",
            src: "**/*.scss",
            dest: "<%= package.build.css %>",
            ext: ".css"
        }]
    },
    postcss: {
        options: {
            processors: [
                require("pixrem")(), // add fallbacks for rem units
                require("autoprefixer")({
                    browsers: "last 2 versions"
                }), // add vendor prefixes
                require("cssnano")() // minify the result
            ]
        },
        files: [{
            expand: true,
            cwd: "<%= package.build.css %>",
            src: ["**/*.css", "!fonts.css"], // There is a weird bug with Postcss that freaks at fontfaces
            dest: "<%= package.build.css %>"
        }]
    },
    cmq: {
        files: [{
            expand: true,
            cwd: "<%= package.build.css %>",
            src: "**/*.css",
            dest: "<%= package.build.css %>"
        }]
    },
    watch: {
        files: ["<%= package.src.scss %>**/*.scss"],
        tasks: ["sass", "cmq"]
    },
};
