module.exports = {
    bump: {
        options: {
            push: true,
            pushTo: "origin",
            files: [
                "package.json",
                "bower.json"
            ],
            commitFiles: [
                "package.json",
                "bower.json"
            ]
        }
    },
    clean: [
        "<%= package.paths.build %>"
    ],
    connect: {
        options: {
            keepalive: true,
            open: true,
            base: "<%= package.paths.build %>"
        }
    },
    copy: {
        files: [{
            expand: true,
            cwd: "<%= package.paths.project %>favicons/",
            src: ["**/*"],
            dest: "<%= package.paths.build %>"
        }]
    },
    sitemap: {
        pattern: ["html/**/*.html"],
        siteRoot: "html/",
        "changefreq": "monthly",
        "priority": 0.8,
        extension: { required: false }
    }
};
