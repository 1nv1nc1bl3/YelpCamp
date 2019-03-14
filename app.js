//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

/* *** PACKAGES & DB *** */
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

/* *** MONGOOSE SCHEMA *** */
const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_RnwfcQy6rgjTe8BYFd3yDhBHV6e1lvCBFKw0EmRb559NvzWpQ",
//         description: "Integer ornare vulputate metus sed consectetur. Aliquam massa metus, consectetur facilisis euismod ut, condimentum eget sem. Quisque bibendum luctus eros non dictum. Mauris ultrices nibh non lectus lacinia, eget euismod arcu egestas. Vivamus rhoncus lobortis tortor, non varius libero ornare a. Nullam mattis eros neque, sit amet sagittis felis rutrum non. Nunc non elementum diam. Mauris iaculis accumsan nibh. Mauris sit amet nibh non sapien pulvinar laoreet vel sed lorem. Aliquam erat volutpat. Phasellus sit amet fringilla lectus. Maecenas fermentum elementum turpis eget porttitor. Curabitur in viverra risus, vitae viverra neque."
//     }, (err, data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND");
//             console.log(data);
//         }
//     }
// );


/* *** HOME route *** */
app.get("/", (req, res) => {
    res.render("landing");
});

/* *** CAMPGROUNDS route *** */
app.get("/campgrounds", (req, res) => {

    // Get all campgrounds from DB
    Campground.find({}, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                campgrounds: data
            });
        }
    });
});

/* *** NEW CAMPGROUNDS FORM route */
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

app.get("/campgrounds/:id", (req, res) => {
    // find the campground with provided ID
    let show = req.params.id;
    Campground.findById(show, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {
                showCamp: data
            });
        }
    });
});

/* *** POST NEW CAMPGROUNDS from FORM */
app.post("/campgrounds", (req, res) => {
    // Get data from form and add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCamp = {
        name: name,
        image: image,
        description: description
    };
    // Create a new campground and save it to DB
    Campground.create(newCamp, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000...");
});



//Salmon Creek
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL_RnwfcQy6rgjTe8BYFd3yDhBHV6e1lvCBFKw0EmRb559NvzWpQ

//Granite Hill
//http://lakecounty.com/wp-content/uploads/2015/06/Lake_county_stargazing_2.jpg

//Jennifer's Spot
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpqX2oABTEMtblGVnsH7DYyR3KfdDTUQuoHOMJuhJJNRbZEkUAdw

//Cloud's Rest
//https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOGUWmvI1PdKgX81KgVZDAHTtroXLwqUkNUIOH81fOCI7fxWYT


