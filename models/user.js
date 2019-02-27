let mongoose = require("mongoose");
let passportLocalMongoose = require("passport-local-mongoose");


let UserSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    address: String,
    state: String,
    city: String,
    phone: String,
    bio: String,
    username: String,
    password: String,
    avatar: String,
    isAdmin: {
        type: Boolean, default: false
    }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);