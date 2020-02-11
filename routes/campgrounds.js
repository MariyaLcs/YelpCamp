var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//INDEX - SHOW ALL CAMPGROUNDS
router.get("/", function(req, res) {
  //Get all campgroungs from DB
  Campground.find({}, function(err, allCampgrounds) {
    if (err) {
      console.log(err);
    } else {
      res.render("campgrounds/index", {
        campgrounds: allCampgrounds,
        currentUser: req.user
      });
    }
  });
});

//CREATE - ADD NEW CAMPGROUND TO DB
router.post("/", isLoggedIn, function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var author = {
    id: req.user._id,
    username: req.user.username
  };
  var newCampground = {
    name: name,
    image: image,
    description: desc,
    author: author
  };
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
router.get("/new", isLoggedIn, function(req, res) {
  res.render("campgrounds/new");
});

//SHOW - show more info about one campground
router.get("/:id", function(req, res) {
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

//Edit Campground Route
router.get("/:id/edit", function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.render("campgrounds/edit", { campground: foundCampground });
    }
  });
});

//Update Campground Route

//Middleware
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
}

module.exports = router;
