var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//   {
//     name: "Salmon Creek",
//     image:
//       "https://images.fineartamerica.com/images-medium-large-5/1-a-view-of-the-ocean-from-inside-a-tent-rob-hammer.jpg"
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

app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds", { campgrounds: allCampgrounds });
    }
  });
});

app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = { name: name, image: image };
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

app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started!");
});
