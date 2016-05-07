module.exports = {
    surge: {
        options: {
            project: "<%= package.paths.build %>",
            domain: null
        }
    },
    cacheBust: {
        options: {
            assets: ["html/css/**", "html/js/**" ],
            // deleteOriginals: true
        },
        files: [{   
            expand: true,
            cwd: "<%= package.paths.build %>",
            src: ["**/*.html"]
        }]
    }
};
