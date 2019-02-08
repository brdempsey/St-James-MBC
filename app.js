require('dotenv').config();
let   express =      require('express'),
      flash =        require('connect-flash'),
      app =          express(),
      bodyParser =   require('body-parser'),
      mongoose =     require('mongoose'),
      Event = require("./models/events"),
      passport = require("passport"),
      LocalStrategy = require("passport-local"),
      methodOverride = require("method-override"),
      User = require('./models/user');
      
let eventRoutes = require("./routes/events"),
    indexRoutes = require("./routes/index");


// mongoose.connect(process.env.DATABASEURL);

mongoose.connect("mongodb://localhost/st_james");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
app.use(flash());


//PASSPORT CONFIG
app.use(require('express-session')({
    secret:'Sit in the pew',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error =  req.flash("error");
    res.locals.success = req.flash("success");
    next();
});




app.get('/Donations', function(req, res){
   res.render('Donations'); 
});


app.use(indexRoutes);
app.use("/events",eventRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log('St James Server started')
});