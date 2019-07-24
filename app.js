var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "Salmon Creek", image: ""},
  {name: "Yosemite", image:""},
  {name: "Redwood", image: ""}
];

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/campgrounds", (req, res) => {

  res.render("campground", {campgrounds: campgrounds});
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
  }
  campgrounds.push(newCampground);

  res.redirect("campgrounds");
});

app.get("/campgrounds/new", (req, res) => {
  res.render("new.ejs");
})

app.listen(process.env.PORT || 3000, process.env.IP, () => {
  console.log("Yelp Camp has started.");
})
