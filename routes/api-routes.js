var db = require("../models");

// Scraping tools
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");


module.exports = function (app) {

    app.get("/", (req, res) => {

        res.render("index");

        console.log("outside the cheerio test")
        // Making a request to the AP News homepage
        request("https://fivethirtyeight.com/politics/", function (error, response, html) {

            // Load HTML into cheerio and save to variable
            var $ = cheerio.load(html);

            // Array to save scraped data
            var results = []

            $("h2.article-title").each(function (i, element) {
                var title = $(element).text().trim();
                console.log(title)
            });

        });

    });



};