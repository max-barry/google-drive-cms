var buildDocumentationNav = function() {
    var inThisSection,
        $link, thisId;

    // Find the headers in the table of contents
    var tableOfContentsLinks = $(".table-of-contents").find("a");

    tableOfContentsLinks.each(function(i, link) {
        thisId = $(link).attr("href");
        $link = $(thisId);
        // Remove the ID from the link, you put it on the wrapper.
        $link.attr("id", "");

        inThisSection = $link.nextUntil("h2").andSelf();
        inThisSection.wrapAll("<div id='" + thisId.replace("#", "") + "' class='scrollspy'></div>");

    });

    // Create "pinned when at top of screen" effect
    $(".table-of-contents").pushpin({ top: $(".table-of-contents").offset().top });
    // Instantiate scrollspy for the table of contents
    $(".scrollspy").scrollSpy();

};

buildDocumentationNav();
