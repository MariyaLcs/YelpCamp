var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  Campground = require("./models/campground"),
  seedDB = require("./seeds");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
seedDB();

app.get("/", function(req, res) {
  res.render("landing");
});

//INDEX - SHOW ALL CAMPGROUNDS
app.get("/campgrounds", function(req, res) {
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", { campgrounds: allCampgrounds });
    }
  });
});

//CREATE - ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = { name: name, image: image, description: desc };
  //Create a new campground and save to DB
  Campground.create(newCampground, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      //redirect back to campgrounds page
      res.redirect("/campgrounds");
    }
  });
});

//SHOW - show form to create new campground
app.get("/campgrounds/new", function(req, res) {
  res.render("campgrounds/new");
});

//SHOW - show more info about one campground
app.get("/campgrounds/:id", function(req, res) {
  //Find the Campground with provided ID
  Campground.findById(req.params.id)
    .populate("comments")
    .exec(function(err, foundCampground) {
      if (err) {
        console.log(err);
      } else {
        console.log(foundCampground);
        //render show with that campground
        res.render("campgrounds/show", { campground: foundCampground });
      }
    });
});

//Comments Routes
app.get("/campgrounds/:id/comments/new", function(req, res) {
  res.render("comments/new");
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started!");
});
