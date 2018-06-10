var db = require("../models");
// Scraping tools
// Parses our HTML and helps us find elements
var cheerio = require("cheerio");
// Makes HTTP request for HTML page
var request = require("request");


module.exports = function (app) {

    // Load the main page
    app.get("/", (req, res) => {

        // Render the handlebars
        res.render("index");
    });


    app.get("/api/scrapedArticles", (req, res) => {
                // Grab all the articles currently in the db
                db.Article.find({})
                .then(function(Article){
                    res.json(Article);
                    
                    // The below works when above the .html line above.  Why?
                    // console.log("beneath headlines")
                })
                .catch(function (err) {
                    res.json(err);
                });

    })


    // Scrape the NPR page
    app.get("/api/scrape", (req, res) => {

            // Making a request to the NPR Politics page
            request("https://www.npr.org/sections/politics/", function (error, response, html) {

                // Load HTML into cheerio and save to variable
                var $ = cheerio.load(html);

                // Array to save scraped data
                var result = {}

                $("article.has-image").each(function (i, element) {

                    // Assigns the article title, image, and link to their appropriate variables
                    var title = $(element).find("h2.title").find("a").text().trim();
                    var summary = $(element).find("p.teaser").text();
                    var link = $(element).find("a").attr("href");
                    // TODO: This is scraping a lower-quality jpg for some reason.  Either try to scrape the higher quality
                    // one or see if you can modify the url before adding it to your result object
                    var img = $(element).find("div.imagewrap").find("a").find("img").attr("src");

                    // Say there is no image to show if undefined
                    if (img == null) {
                        img = "no image to show"
                    };

                    // Stops any non-articles (such as podcast notifications) from being added
                    if (title === "") {
                        return;
                    };

                    // Adds relevant article information to the result object before submission
                    result.title = title;
                    result.summary = summary;
                    result.link = link;
                    result.img = img;

                    // Sends the result object to the database
                    db.Article.create(result)
                        .then(function (dbArticle) {
                            // console.log(dbArticle);
                            console.log("Successfully scraped!")
                        })
                        .catch(function (err) {
                            return res.json(err);
                        });
                });
            });
    });




};