let express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user"),
    middleware = require("../middleware");


router.get('/', function(req, res){
   res.render('Home'); 
});


router.get('/ChurchHistory', function(req, res){
    res.render('ChurchHistory');
});

router.get('/PastorInfo', function(req, res){
    res.render('PastorInfo');
});

router.get('/ClergyInfo', function(req, res){
    res.render('ClergyInfo');
});


router.get('/ContactUs', function(req, res){
   res.render('ContactUs'); 
});

router.get('/Media', function(req, res){
   res.render('Media'); 
});

router.get('/Services', function(req, res){
   res.render('Services'); 
});



//Auth Routes

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//sign up logic
router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username});
    if(req.body.adminCode === 'liverpool#12'){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //err.message is used because err is an object.
            return res.render("register", {"error": err.message});
        }
           passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to St James Missionary Baptist Church");
           res.redirect("/events"); 
        });
    })
});

//show login form
router.get("/login", function(req, res){
    res.render("login");
});

//Handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/events",
        failureRedirect: "/login"
    }), function(req, res){
});

//logout route
router.get("/logout", function(req, res){6
    req.logout();
    req.flash("error", "Logged you out!");
    res.redirect("/events");
});


module.exports = router;