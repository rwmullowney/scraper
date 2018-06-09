var express = require("express");
var bodyParser = require("body-parser");
// var logger = require("morgan");
var mongoose = require("mongoose");

// Require models
var db = require("./models");

var PORT = 3000;

// Express
var app = express();

// Body-parser for form submission
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Setting up handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Define the static directory
app.use(express.static("public"));

// Routes
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Connect to Mongo DB
mongoose.connect("mongodb://localhost/538-scraper");


// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
  });