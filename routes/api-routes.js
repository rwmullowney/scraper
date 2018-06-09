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
            var result = {}

            $("div.fte_features").each(function (i, element) {
                var title = $(element).find("h2.article-title").text().trim();
                var img = $(element).find("img").attr("src");
                var link = $(element).attr("data-href");

                // Say there is no image to show if undefined
                if (img == null) {
                    img = "no image to show"
                };

                // Stops any non-articles from being added
                if (title === "") {
                    return;
                };

                result.title = title;
                result.img = img;
                result.link = link;

                // console.log(results)
                db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                })
            });
        });
    });



};