var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

var campgrounds = [
  {
    name: "Salmon Creek",
    image:
      "https://images.fineartamerica.com/images-medium-large-5/1-a-view-of-the-ocean-from-inside-a-tent-rob-hammer.jpg"
  },
  {
    name: "Granite Hill",
    image:
      "https://media.self.com/photos/5bcf8b52baeb4a5e6e13c899/4:3/w_1280,h_960,c_limit/tent-and-view.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://i.ytimg.com/vi/vfkhlLnSq7o/maxresdefault.jpg"
  }
];

app.get("/campgrounds", function(req, res) {
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
  campgrounds.push(newCampground);
  res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started!");
});
