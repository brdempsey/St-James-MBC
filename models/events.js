let mongoose = require("mongoose");
//let moment = require("moment");

//Schema setup
let eventSchema = new mongoose.Schema({
    title: String,
    location: String,
    image: String,
    description: String,
    date: Date,
    time: String,
    // moment: moment,
    author: {
        id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
        username: String
    }
});

module.exports = mongoose.model("Event", eventSchema);