module.exports = {
    copy: {
        files: [{
            expand: true,
            cwd: "<%= package.src.fonts %>",
            src: ["**/*", "!**/*.json"],
            dest: "<%= package.build.fonts %>"
        }]
    },
    watch: {
        files: [
            "<%= package.src.fonts %>**/*.{eot,woff,svg,ttf}",
        ],
        tasks: ["copy:fonts"]
    }
};
