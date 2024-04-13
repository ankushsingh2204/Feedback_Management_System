const mongoose  = require('mongoose');

const teacherSchema = new mongoose.Schema({
    name : String,
    user : String,
    department : String,
    pass : String
});

module.exports = mongoose.model("Teachers", teacherSchema);