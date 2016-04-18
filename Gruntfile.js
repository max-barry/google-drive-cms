// jitGrunt assumes that task names correspond to modules
// as <task> => grunt-<task>. This isn't always true, so mappings are required
var jitGruntMappings = {
    swig: "grunt-swig-templates",
    cmq: "grunt-combine-media-queries",
    htmllint: "grunt-html"
};

module.exports = function(grunt) {
    "use strict";

    require("time-grunt")(grunt);
    require("load-grunt-config")(grunt, {
        jitGrunt: {
            staticMappings: jitGruntMappings
        }
    });

};
