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
    }
};
