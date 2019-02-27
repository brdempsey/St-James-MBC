let express = require("express"),
    router = express.Router(),
    // moment = require("moment"),
    Event = require("../models/events"),
    middleware = require("../middleware");

//Events Page

//events route
router.get("/", function(req, res) {
    //Get all Events from DB
    let now = new Date().toISOString();
    Event.find({}).sort('date').exec(function(err, allEvents){
        if(err){
            console.log(err);
        }else{
             console.log(now);
             res.render("events/index", {events:allEvents, currentUser: req.user, now: now});
        }
    });
});

//Create Event Route
router.post("/", middleware.isLoggedIn, function(req, res){
    let title = req.body.title;
    let location = req.body.location;
    let image = req.body.image;
    let date = new Date(req.body.date);
    let now = new Date();
    let time = req.body.time;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newEvent = {title: title, location: location, image: image, date: date, now: now, time: time, description:description, author: author}
    
    //Create a new event and save to DB
    Event.create(newEvent, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            Event.find({}).sort({date: "desc"}).exec(function(err, events){
                if(err){
                    console.log(err);
                }else{
                    if(!image)
                    {
                        image.src = "https://images.unsplash.com/photo-1458593140930-1f9049c952c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=675&q=80";
                    }
                    res.redirect("/events");
                }
            });
        }
    });
});

//New route
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("events/new"); 
});

//Show route
router.get("/:id", function(req, res){
    //find event with required id
    Event.findById(req.params.id, function(err, foundEvent){
        if(err || !foundEvent){
            req.flash("error", "Event not found");
            res.redirect("back");
        }else {
            //show event with required id
             console.log(foundEvent);
             res.render("events/show", {event: foundEvent});
        }
    });
});

//Edit Event Route
router.get("/:id/edit", middleware.checkEventOwnership, function(req, res){
        Event.findById(req.params.id, function(err, foundEvent){
            res.render("events/edit", {event: foundEvent});    
    });
});

//Update Event Route
router.put("/:id", middleware.checkEventOwnership, function(req, res){
    //find and update the correct event
    Event.findByIdAndUpdate(req.params.id, req.body.event, function(err, updatedEvent){
        if(err){
            res.redirect("/events");
        }else {
            //redirect to show page
            res.redirect("/events/" + req.params.id);    
        }
    });
});


//Destroy Event Route
router.delete("/:id", middleware.checkEventOwnership, function(req, res){
    Event.findByIdAndRemove(req.params.id, function(err){
       if(err){
           res.redirect("/events");
       } else {
           res.redirect("/events");
       }
    });
});


module.exports = router;