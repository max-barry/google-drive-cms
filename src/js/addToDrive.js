var CLIENT_ID = "460689517717-gific9jhjnc163eakneajf62lkob772a.apps.googleusercontent.com",
    SCOPES = ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/drive.appdata", "https://www.googleapis.com/auth/drive.file", "https://www.googleapis.com/auth/spreadsheets"],
    API_SCRIPT_ID = "M2iJfxCU5Xxwnqe1tXIpolmGcxwm0Lhg6";

var loader = require("../templates/includes/components/_loader.html"),
    successMsg = require("../templates/includes/components/_add-to-drive__success.html"),
    errorMsg = require("../templates/includes/components/_add-to-drive__error.html"),
    updateEndpointForm = require("../templates/includes/components/_add-to-drive__updateEndpoint.html"),
    modalTemplate = require("../templates/includes/components/_add-to-drive__error_modal_upload.html");

// Global variables
window.generatedFileId = null;
window.$trigger = null;
window.$triggerWrap = null;
window.hasGeneratedToast = false;

var setEndpoint = function(auth) {

    if (!window.generatedFileId) {
        setError("No spreadsheet could be found. Make sure to select 'Add to Drive' beforehand");
        return;
    }

    loadLibrary(auth, function(){

        var op = gapi.client.request({
            'root': "https://script.googleapis.com",
            'path': "v1/scripts/" + API_SCRIPT_ID + ':run',
            'method': "POST",
            'body': {
                "function": "updateEndpoint",
                "parameters": [ window.generatedFileId.id, window.endpointToUpdate],
                "devMode": true
                // "parameters": [ window.generatedFileId.id || "sdiopsdkfojkdsfgoj" ]
            }
        });

        op.execute(function(response){
            if (response.error && response.error.status) {
                // Handle API level error
                setError("API Error. The Google Drive API was unresponseive:\n\n" + JSON.stringify(response.error));
            } else if (response.error) {
                // Hanndle the script level error
                setError("Script Error. The Google Drive API was okay, but the endpoint failed:\n\n" + JSON.stringify(response.error));
            } else {
                // Success!
                setSuccess();
            }
        });

    });
};

var copyFile = function(auth){
    loadLibrary(auth, function(){
        var request = gapi.client.drive.files.copy({
            "fileId": TEMPLATE_ID,
            "resource": {}
        });
        request.execute(function(response) {
            window.generatedFileId = response;
            setSuccess();
        });
    });
};

var loadLibrary = function(auth, cb) {
    if (!auth.error) {
        // Load the Drive API
        gapi.client.load("drive", "v3", cb);
    } else {
        setError(auth.error);        
    }
};

var authorize = function(callback) {
    gapi.auth.authorize({
        client_id: CLIENT_ID,
        scope: SCOPES,
        immediate: false
    }, callback);
};

/**
Button states
*/
var setLoading = function(source) {
    
    // Global vars to track source of action
    window.$trigger = $(source);
    window.$triggerWrap = $trigger.parent();
    
    $trigger.remove();
    $triggerWrap.append(loader);
};

var setSuccess = function() {
    var targetUrl = "https://docs.google.com/spreadsheets/d/" + window.generatedFileId.id;
    
    window.$triggerWrap.html("").append(
        $(successMsg).attr("href", targetUrl)
    );

    if (!window.hasGeneratedToast) {
        window.hasGeneratedToast = true;
        $(".update_endpoint").show();
        Materialize.toast('New CMS template added to your Google Drive!', 4000);
    }    
};

var setError = function(msg) {

    window.$triggerWrap.html("").append(errorMsg);
    
    $("body").append(
        $(modalTemplate)
            .find(".modal-content pre").html(msg).end()
            .find(".modal-content p a").attr("href", "https://docs.google.com/spreadsheets/d/" + TEMPLATE_ID).end()
    );
    
    $(".modal-trigger").leanModal();
    
    Materialize.toast("Error! There was a problem with the Google Drive API", 4000);
};

var main = function() {
    /**
    Make a copy of our base template, and add it to a user's Google Drive
    */
    setLoading(this);
    authorize(copyFile);
};

var updateEndpoint = function() {
    // Prevent form being submitted
    event.preventDefault();

    // Fetch from the form the text value
    window.endpointToUpdate = $("[data-update-endpoint] input").val();

    // Add loader
    setLoading(this);

    // Authorize and update the endpoint
    authorize(setEndpoint);
};

var editEndpoint = function() {
    // Prevent a link being followed
    event.preventDefault();

    // Add a form to the DOM
    $("[data-show-endpoint-form]").parent().html(updateEndpointForm);
};

module.exports.main = main;
module.exports.updateEndpoint = updateEndpoint;
module.exports.editEndpoint = editEndpoint;