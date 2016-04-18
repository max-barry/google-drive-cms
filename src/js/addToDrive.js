var CLIENT_ID = "460689517717-gific9jhjnc163eakneajf62lkob772a.apps.googleusercontent.com",
    SCOPES = ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/drive.appdata", "https://www.googleapis.com/auth/drive.file"];

var loader = require("../templates/includes/components/_loader.html"),
    successMsg = require("../templates/includes/components/_add-to-drive__success.html"),
    errorMsg = require("../templates/includes/components/_add-to-drive__error.html"),
    modalTemplate = require("../templates/includes/components/_add-to-drive__error_modal_upload.html");

// Global variables
window.generatedFileId = null;
window.$trigger = null;
window.$triggerWrap = null;

var copyFile = function(){
    var request = gapi.client.drive.files.copy({
        "fileId": TEMPLATE_ID,
        "resource": {}
    });
    request.execute(function(resp) {
        window.generatedFileId = resp;
        setSuccess();
    });
};

var loadLibrary = function(auth) {
    if (!auth.error) {
        // Load the Drive API
        gapi.client.load("drive", "v3", copyFile);
    } else {
        setError(auth.error);        
    }
};

var authorize = function(callback) {
    gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
    }, loadLibrary);
};

/**
Button states
*/
var setLoading = function() {
    $trigger.remove();
    $triggerWrap.append(loader);
};

var setSuccess = function() {
    var targetUrl = "https://docs.google.com/spreadsheets/d/" + window.generatedFileId.id;
    $(".add_to_drive").html("").append(
        $(successMsg).attr("href", targetUrl)
    );
    Materialize.toast('New CMS template added to your Google Drive!', 4000);
};

var setError = function(msg) {
    msg = "this is all of the test stuff that I could ut in to the error message on the site";
    
    $(".add_to_drive").html("").append(errorMsg);
    $("body").append(
        $(modalTemplate)
            .find(".modal-content pre").html(msg).end()
            .find(".modal-content p a").attr("href", "https://docs.google.com/spreadsheets/d/" + TEMPLATE_ID).end()
    );
    
    $(".modal-trigger").leanModal();
    
    Materialize.toast("Error! Could not save template to your Google Drive", 4000);
};

var main = function() {
    /**
    Make a copy of our base template, and add it to a user's Google Drive
    */
    // Global vars to track source of action
    window.$trigger = $(this);
    window.$triggerWrap = $trigger.parent();

    setError();
    // setLoading();
    // authorize();
};

module.exports = main;