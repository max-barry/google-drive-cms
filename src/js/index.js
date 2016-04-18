// Vendor
var faker = require('faker/locale/en_US');
window.$.typed = require("typed.js");

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

$(document).ready(function(){
    // Parallax effect in header
    $('.parallax').parallax();
    // Select inputs
    $('select').material_select();
    // Generate fake data in the example table in instructions
    fakeTable();
});

// Typed effect in the explanation area
var POSTExamples = [
    "directly in to a Firebase.io database.",
    "to a REST endpoint that saves the data to a local database.",
    "to a webhook connected to your database.",
    "through a middleman like Zapier or IFTTT.",
    "up to a CRM or ESP tool like MailChimp, Mail... Cimp?",
    "to Slack, Mandrill, or any trendy tool that accepts JSON POST or PUT calls",
];
$("[data-type-target]").typed({
    strings: POSTExamples,
    typeSpeed: 0,
    loop: true,
    backDelay: 1000
});
