module.exports = {
    surge: {
        options: {
            project: "<%= package.paths.build %>",
            domain: null
        }
    },
    cacheBust: {
        options: {
            deleteOriginals: true
        },
        files: [{
            src: ["<%= package.paths.build %>**/*.html"]
        }]
    }
};
