// Vendor
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

$(document).ready(function(){
    // Parallax effect in header
    $('.parallax').parallax();
    // Select inputs
    $('select').material_select();
    // Generate fake data in the example table in instructions
    fakeTable();
});
