// Vendor
var $ = window.jQuery = require("jquery");
require("materialize-css");

// Global variables
window.TEMPLATE_ID = "1apRDxVir4lb0s3_t7B3Wmi9bm3QCIlXFBh_ozL-LRIg";

// Custom modules
var AddToDrive = require("./addToDrive.js");

// Custom functions

// When user clicks an "add to drive" button, add a copy of the base template to their Google Drive
$("body").on("click", "[data-add-to-drive]", AddToDrive);
