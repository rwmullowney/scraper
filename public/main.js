

$(document).ready(function () {

    $.getJSON("/api/scrapedArticles", function (data) {
        console.log("in the / function");
        console.log(data);
        for (let i = 0; i < 10; i++) {
            $(".headlines").append(`
            <div class="border" id="${data[i]._id}">
            <p>${data[i].title}`);
        };
    });



    $(".scrape").on('click', (event) => {
        event.preventDefault();

        $.getJSON("/api/scrape", function (data) {
            console.log("From the scrape main.js: \n" + JSON.stringify(data));

        });

    });
    console.log("in main.js");




});