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

router.get('/GeneralInformation', function(req, res){
    res.render('GeneralInformation');
});



//Auth Routes

//show register form
router.get("/register", function(req, res){
    res.render("register");
});

//sign up logic
router.post("/register", function(req, res){
    //Profile Info
    let fname = req.body.fname;
    let lname = req.body.lname;
    let email = req.body.email;
    let address = req.body.address;
    let state = req.body.address;
    let city = req.body.city;
    let phone = req.body.phone;
    let bio = req.body.bio;
    let avatar = req.body.avatar;
    //Sign Up Info
    let username = req.body.username.toLowerCase();
    
    let newUser = new User({username: username, fname:fname, lname:lname, email:email, address:address, state:state, city:city, phone:phone, bio:bio, avatar: avatar});
    
    if(req.body.adminCode === 'StJames45'){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            //err.message is used because err is an object.
            return res.render("register", {"error": err.message});
        }
           passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to St James Missionary Baptist Church");
           console.log(newUser);
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
router.get("/logout", function(req, res){
    req.logout();
    req.flash("error", "Logged you out!");
    res.redirect("/events");
});


//user profile
router.get("/users/:id", function(req, res){
    User.findById(req.params.id, function(err, foundUser){
        if(err){
            req.flash("error", "Could not located User");
            res.redirect("/");
        }
        res.render("users/show", {user: foundUser});
    })
    
});

//edit user profile
router.get("/users/:id/edit", middleware.checkProfileOwnership, function(req, res){
   User.findById(req.params.id, function(err, foundUser){
            res.render("users/edit", {user: foundUser}); 
   });
});

 //Update user profile
router.put("/users/:id", middleware.checkProfileOwnership, function(req, res){
    //find and update the correct user
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser){
        if(err){
            res.redirect("/events");
        }else {
            //redirect to show page
            res.redirect("/users/" + req.params.id);    
        }
    });
});


module.exports = router;