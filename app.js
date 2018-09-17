require('dotenv').config()
let   express =      require('express'),
      flash =        require('connect-flash'),
      app =          express(),
      bodyParser =   require('body-parser'),
      mongoose =     require('mongoose'),
    //   passport =     require('passport'),
    //   LocalStrategy = require('passport-local'),
    //   PassportLocalMongoose = require('passport-local-mongoose'),
      ConnectionCard = require('./models/ConnectionCard');

console.log(process.env.DATABASEURL);

//mongoose.connect('mongodb://localhost/st_james');
mongoose.connect('mongodb://clergy:W1retap5bd@ds237922.mlab.com:37922/st_james');



app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(flash());


//PASSPORT CONFIG
// app.use(require('express-session')({
//     secret:'Sit in the pew',
//     resave: false,
//     saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy())


app.get('/', function(req, res){
   res.render('Home'); 
});


app.get('/ChurchHistory', function(req, res){
    res.render('ChurchHistory');
});

app.get('/PastorInfo', function(req, res){
    res.render('PastorInfo');
});

app.get('/ClergyInfo', function(req, res){
    res.render('ClergyInfo');
});


app.get('/ContactUs', function(req, res){
   res.render('ContactUs'); 
});


app.get('/Donations', function(req, res){
   res.render('Donations'); 
});

app.get('/Media', function(req, res){
   res.render('Media'); 
});

app.get('/Services', function(req, res){
   res.render('Services'); 
});

app.get('/ConnectionCard', function(req, res){
    res.render('ConnectionCard');
});

//Database Schema
app.post('/ConnectionCard', function(req,res){
    let name = req.body.name,
        email = req.body.email,
        gender = req.body.gender,
        address = req.body.address,
        city = req.body.city,
        state = req.body.state,
        zip = req.body.zip,
        phone = req.body.phone,
        churchHome = req.body.churchHome,
        MBCInterest = req.body.MBCInterest,
        message = req.body.message;
        
        
    //Create a new member for the DB
    let newMember = {name: name, email: email, gender: gender, address:address, city:city, state:state, zip:zip, phone:phone, churchHome:churchHome, MBCInterest:MBCInterest, message:message}
    ConnectionCard.create(newMember, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else {
            res.redirect("/ConnectionCard");
        }
    })
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('St James Server started')
});