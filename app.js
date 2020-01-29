var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

//SCEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Salmon Creek",
//     image:
//       "https://images.fineartamerica.com/images-medium-large-5/1-a-view-of-the-ocean-from-inside-a-tent-rob-hammer.jpg",
//     description:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
//   },
//   function(err, campground) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("NEWLY CREATED CAMPGROUND: ");
//       console.log(campground);
//     }
//   }
// );

app.get("/", function(req, res) {
  res.render("landing");
});

// var campgrounds = [
//   {
//     name: "Salmon Creek",
//     image:
//       "https://images.fineartamerica.com/images-medium-large-5/1-a-view-of-the-ocean-from-inside-a-tent-rob-hammer.jpg"
//   },
//   {
//     name: "Granite Hill",
//     image:
//       "https://media.self.com/photos/5bcf8b52baeb4a5e6e13c899/4:3/w_1280,h_960,c_limit/tent-and-view.jpg"
//   },
//   {
//     name: "Mountain Goat's Rest",
//     image: "https://i.ytimg.com/vi/vfkhlLnSq7o/maxresdefault.jpg"
//   }
// ];

//INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { campgrounds: allCampgrounds });
    }
  });
});

//CREATE - ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function(req, res) {
  res.render("new.ejs");
});

//SHOW - SHOWS MORE INFO ABOUT ONE CAMPGROUND
app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", { campground: foundCampground });
    }
  });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started!");
});
