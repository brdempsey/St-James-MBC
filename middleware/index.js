let Event = require("../models/events");
let middlewareObj = {};

middlewareObj.checkEventOwnership = function(req, res, next){
     //is user logged in
    if(req.isAuthenticated()){
        Event.findById(req.params.id, function(err, foundEvent)
            {
              if(err || !foundEvent){
                  req.flash("error", "Event not found");
                  res.redirect("back");
              } else{
                  if(foundEvent.author.id.equals(req.user._id) || req.user.isAdmin){
                        next();  
                  } else {
                      req.flash("error", "You don't have permission to do that.");
                      res.redirect("back");
                  }
              }
    });
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
    
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in for this feature.");
    res.redirect("/login");
}

module.exports = middlewareObj