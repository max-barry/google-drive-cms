// Vendor
var $ = window.jQuery = require("jquery");
var Layzr = window.Layzr = require("layzr.js");
require("materialize-css");

// Global variables
window.TEMPLATE_ID = "15ifxjEo9nVXTbeX7mwLnW-F5yu96u9IF1RL3wHoYLbs";

document.addEventListener('DOMContentLoaded', function(event) {

    // Initialize mobile sidenav
    $(".button-collapse").sideNav();

    // Select inputs
    $('select').material_select();

    // Set the active navigation item
    $("nav ul:not(#mobile-navigation) a").each(function(i, el) {
        if ( $(el).attr("href") === window.location.pathname ) {
            $(el).parent().addClass("active");
        }
    });

    // Lazy load images
    Layzr()
        .update()
        .check()
        .handlers(true);
    
});