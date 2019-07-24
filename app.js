var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
  {name: "Salmon Creek", image: "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=649&q=80"},
  {name: "Yosemite", image:"https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80"},
  {name: "Redwood", image: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"}
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
