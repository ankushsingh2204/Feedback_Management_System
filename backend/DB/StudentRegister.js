const mongoose  = require('mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    roll : Number,
    branch : String,
    pass : String
});

module.exports = mongoose.model("RegisterStudent", userSchema);