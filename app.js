var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/YelpCamp', {useNewUrlParser: true});

// Schema Set up
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {
  // Get all campgrounds from DB
  Campground.find({}, (err, allCampgrounds) => {
    if (err) {
      console.log(err);
    }
    else {
      res.render("campground", {campgrounds: allCampgrounds});
    }
  })
});

// app.get("/results", (req, res) => {
//   var url = "http://www.omdbapi.com/?s=" + req.query.search + "&apikey=thewdb"
//   request(url, (error, response, body) => {
//     if (!error && response.statusCode == 200) {
//       var data = JSON.parse(body);
//       res.render("results", {data: data});
//     }
//     else {
//       res.send(error);
//     }
//   })
//
// })

app.post("/campgrounds", (req, res) => {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {
    name: name,
    image: image
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

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
})

app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log("Yelp Camp has started.");
})
