//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");

const app = express();

/* *** PACKAGES *** */
app.set("view engine", "ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

/* *** initial OBJECTS array *** */
let campgrounds = [
    {
        name: "Salmon Creek",
        image: "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/HMvNHfeCituby4gk/night-camping-and-time-lapse_hj_9okffe_thumbnail-full01.png"
    },
    {
        name: "Granite Hill",
        image: "https://i.pinimg.com/originals/aa/e6/4f/aae64ff37257a90cbb013d15a64da905.jpg"
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://i.pinimg.com/originals/09/02/fe/0902fead13da8b44e47111a3dcfe7531.jpg"
    },
    {
        name: "Salmon Creek",
        image: "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/HMvNHfeCituby4gk/night-camping-and-time-lapse_hj_9okffe_thumbnail-full01.png"
    },
    {
        name: "Granite Hill",
        image: "https://i.pinimg.com/originals/aa/e6/4f/aae64ff37257a90cbb013d15a64da905.jpg"
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://i.pinimg.com/originals/09/02/fe/0902fead13da8b44e47111a3dcfe7531.jpg"
    },
    {
        name: "Salmon Creek",
        image: "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/HMvNHfeCituby4gk/night-camping-and-time-lapse_hj_9okffe_thumbnail-full01.png"
    },
    {
        name: "Granite Hill",
        image: "https://i.pinimg.com/originals/aa/e6/4f/aae64ff37257a90cbb013d15a64da905.jpg"
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://i.pinimg.com/originals/09/02/fe/0902fead13da8b44e47111a3dcfe7531.jpg"
    },
    {
        name: "Salmon Creek",
        image: "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/HMvNHfeCituby4gk/night-camping-and-time-lapse_hj_9okffe_thumbnail-full01.png"
    },
    {
        name: "Granite Hill",
        image: "https://i.pinimg.com/originals/aa/e6/4f/aae64ff37257a90cbb013d15a64da905.jpg"
    },
    {
        name: "Mountain Goat's Rest",
        image: "https://i.pinimg.com/originals/09/02/fe/0902fead13da8b44e47111a3dcfe7531.jpg"
    }
];

/* *** HOME route *** */
app.get("/", (req, res) => {
    res.render("landing");
});

/* *** CAMPGROUNDS route *** */
app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {
        campgrounds: campgrounds
    });
});

/* *** NEW CAMPGROUNDS FORM route */
app.get("/campgrounds/new", (req, res) => {
    res.render("new");
});

/* *** POST NEW CAMPGROUNDS from FORM */
app.post("/campgrounds", (req, res) => {
    let newName = req.body.name;
    let newImage = req.body.image;
    let newCamp = {
        name: newName,
        image: newImage
    };
    campgrounds.push(newCamp);

    res.redirect("/campgrounds");
});

app.listen(3000, () => {
    console.log("Server started on port 3000...");
});