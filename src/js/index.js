/**
Header area parralax initialisation
*/
$('.parallax').parallax();

/**
Generate fake data in the example table in instructions
*/
var faker = require('faker/locale/en_US');

var fakeTable = function() {
    var tbody = $('.instruction__fake_table > tbody'),
        code = $(".instruction__fake_json code"),
        rowsToGenerate = 2,
        fName, fEmail, tr,
        fJson = [];

    for (var i = 0; i < rowsToGenerate; i++) {
        fName = [ faker.name.firstName(), faker.name.lastName() ];
        fEmail = faker.internet.email(fName[0], fName[1]);

        tr = "<tr><td>" + fName.join(" ") + "</td><td>" + fEmail + "</td></tr>";
        tbody.append(tr);
        
        fJson.push("   {\"name\": \"" + fName.join(" ") + "\", \"email\": \"" + fEmail + "\"}");
    }

    code.append("[\n" + fJson.join(",\n") + "\n]");

};
fakeTable();

/**
Explanation typed text effects
*/
window.$.typed = require("typed.js");

var POSTExamples = [
    "directly in to a Firebase.io database.",
    "to a REST endpoint that saves the data to a local database.",
    "to a webhook connected to your database.",
    "through a middleman like Zapier or IFTTT.",
    "up to a CRM or ESP tool like MailChimp, Mail... Cimp?",
    "to Slack, Mandrill, or any trendy tool that accepts JSON POST or PUT calls",
];

var initiateTypedEffect = function(){
    // Fix the max heights on these section to deal with sentence wrapping
    var $toFix = $("[data-fix-max-height]");
    $toFix.each(function(idx, el){
        $(el).css("max-height", $(el).outerHeight());
    });
     
    // Initiate typed library 
    $("[data-type-target]").typed({
        strings: POSTExamples,
        typeSpeed: 0,
        loop: true,
        backDelay: 1000
    });
};

initiateTypedEffect();

/**
Add to Drive functionality
*/
var AddToDrive = require("./addToDrive.js");

// When user clicks an "add to drive" button, add a copy of the base template to their Google Drive
$("body").on("click", "[data-add-to-drive]", AddToDrive.main)
        .on("submit", "[data-update-endpoint]", AddToDrive.updateEndpoint)
        .on("click", "[data-show-endpoint-form]", AddToDrive.editEndpoint);

/**
Effects on scroll down of index page 
*/
var options = [{
    selector: '.next_steps',
    offset: 300,
    callback: function() {
        Materialize.showStaggeredList('#nextSteps');
    }
}, ];
Materialize.scrollFire(options);