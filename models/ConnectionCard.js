let mongoose = require("mongoose");
// let PassportLocalMongoose = require('passport-local-mongoose');

//SCHEMA SETUP
let ConnectionCardSchema = new mongoose.Schema({
    
        name: String,
        email: String,
        gender: String,
        address: String,
        city: String,
        state: String,
        zip: String,
        phone: String,
        churchHome: String,
        MBCInterest: String,
        message: String
});

// ConnectionCardSchema.plugin(PassportLocalMongoose);

module.exports = mongoose.model('ConnectionCard', ConnectionCardSchema)
