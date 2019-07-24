var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


mongoose.connect('mongodb://localhost/YelpCamp', {useNewUrlParser: true});

// Schema Set up
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

Campground.deleteMany({}, (err) => {
  console.log(err);
})
Campground.create({
  name: "Hell's Canyon",
  image: "https://images.unsplash.com/photo-1505735754789-3404132203ed?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
  description: "Tons of fun!"
}, (err, campground) => {
  if (err) {
    console.log(err);
  }
  else {
    console.log(campground);
  }
});

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

// Index Route
app.get("/campgrounds", (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render("index", {campgrounds: allCampgrounds});
    }
  })
});

// Create Route
app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var newCampground = {
    name: name,
    image: image,
    description: description
  };

  // Create a new campground and save to DB
  Campground.create(newCampground, (err, campground) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log(campground);
      res.redirect("/campgrounds");
    }
  });

});

// New Route
app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
})

// Show Route: Show more info about a specific campground
app.get("/campgrounds/:id", (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render("show", {campground: foundCampground});
    }
  })
  // res.send("This page will show more info about __ campground.");
})

app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log("Yelp Camp has started.");
})
