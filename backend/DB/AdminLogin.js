const mongoose  = require('mongoose');

const adminSchema = new mongoose.Schema({
    user : String,
    pass : String,
});

module.exports = mongoose.model("adminlogins", adminSchema);