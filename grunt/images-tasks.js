module.exports = {
    imagemin: {
        files: [{
            expand: true,
            cwd: "<%= package.src.images %>",
            src: ["**/*.{png,jpg,jpeg,gif,svg}"],
            dest: "<%= package.build.images %>"
        }]
    },
    webp: {
        files: [{
            expand: true,
            cwd: "<%= package.build.images %>",
            src: "**/*.{png,jpg,jpeg}",
            dest: "<%= package.build.images %>"
        }],
        options: {
            binpath: require("webp-bin").path,
            preset: "default",
            verbose: false,
            quality: 80,
            alphaQuality: 80,
        }
    },
    copy: {
        files: [{
            expand: true,
            cwd: "<%= package.src.images %>",
            src: "**/*.{png,jpg,jpeg,gif,svg}",
            dest: "<%= package.build.images %>"
        }]
    },
    watch: {
        files: [
            "<%= package.src.images %>**/*.{jpeg,jpg,gif,png,svg}"
        ],
        tasks: ["copy:images"]
    }
};
