const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
  department: String,
  teacher: String,
  subject: String,
  QueOne: String,
  QueTwo: String,
  QueThree: String,
  QueFour: String,
  studentId:String
});

module.exports = mongoose.model("feedbackcollections", FeedbackSchema);
