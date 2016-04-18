// Vendor
var $ = window.jQuery = require("jquery");
require("materialize-css");

// Global variables
window.TEMPLATE_ID = "15ifxjEo9nVXTbeX7mwLnW-F5yu96u9IF1RL3wHoYLbs";

// Custom modules
var AddToDrive = require("./addToDrive.js");

// When user clicks an "add to drive" button, add a copy of the base template to their Google Drive
$("body").on("click", "[data-add-to-drive]", AddToDrive);
