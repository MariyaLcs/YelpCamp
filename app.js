var express = require("express");
var app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  res.render("landing");
});

app.get("/campgrounds", function(req, res) {
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
  res.render("campgrounds", { campgrounds: campgrounds });
});

app.listen(process.env.PORT || 3000, function() {
  console.log("Server has started!");
});
