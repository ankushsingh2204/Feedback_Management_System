const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

require("./DB/config");
const StudentRegisterModeSchema = require("./DB/StudentRegister");
const FeedbackSchema = require("./DB/FeedbackCollection");
const Adminlogin = require("./DB/AdminLogin");
const AddTeacherSchema = require("./DB/AddTeacher");

// Register Student
app.post("/studentregister", async (req, res) => {
  console.log(req.body);
  if (req.body.name && req.body.roll && req.body.branch && req.body.pass) {
    let data = new StudentRegisterModeSchema(req.body);
    let result = await data.save();
    if (data) {
      res.send(result);
    } else {
      res.send({ result: "success" });
    }
    // console.log(result);
  }
});

// Login Student
app.post("/login", async (req, res) => {
  if (req.body.pass && req.body.roll) {
    let data = await StudentRegisterModeSchema.findOne(req.body);
    if (data) {
      res.send(data);
    } else {
      res.send({ result: "No data" });
    }
  } else {
    res.send({ result: "No data" });
  }
});

// Login Admin
app.post("/adminlogin", async (req, res) => {
  // let data = await Adminlogin(req.body);
  // data.save();
  if (req.body.pass && req.body.user) {
    let data = await Adminlogin.findOne(req.body);
    if (data) {
      res.send(data);
    } else {
      res.send({ result: "No data" });
      // res.send(data);
      console.log("data : " + data);
    }
  } else {
    // res.send(data);
    console.log("data : " + data);
    res.send({ result: "No data" });
  }
});

// Teacher Login
app.post("/teacherloginpage", async (req, res) => {
  // let data = await Adminlogin(req.body);
  // data.save();
  if (req.body.pass && req.body.user) {
    let data = await AddTeacherSchema.findOne(req.body);
    if (data) {
      res.send(data);
    } else {
      res.send({ result: "No data" });
      // res.send(data);
      console.log("data : " + data);
    }
  } else {
    // res.send(data);
    console.log("data : " + data);
    res.send({ result: "No data" });
  }
});

// Set Feedback
app.post("/setfeedback", async (req, res) => {
  console.log(req.body);
  try {
    if (
      req.body.department &&
      req.body.teacher &&
      req.body.subject &&
      req.body.QueOne &&
      req.body.QueTwo &&
      req.body.QueThree &&
      req.body.QueFour
    ) {
      let data = new FeedbackSchema(req.body);
      data = await data.save();
      // console.log(data);
      res.send(data);
    } else {
      res.send({ result: "success" });
    }
  } catch (e) {
    console.log("ERROR : " + e);
  }
});

// --------------- ADD Teacher----------------------
app.post("/addteacher", async (req, res) => {
  try {
    if (
      req.body.name &&
      req.body.user &&
      req.body.department &&
      req.body.pass
    ) {
      let data = new AddTeacherSchema(req.body);
      data = await data.save();
      if (data) {
        res.send(data);
      } else {
      }
    } else {
      res.send({ result: "No data Found" });
    }
  } catch (e) {
    console.log("ERROR : " + e);
  }
});

// -------------------teacherFeedback----------------------------
app.post("/teacherFeedback", async (req, res) => {
  console.log(req.body);
  let data = await FeedbackSchema.find({ subject: req.body.dep });
  console.log(data);
  if (data) {
    res.send(data);
  } else {
    res.send({ result: "Not" });
  }
  // res.send("hello");
});
// --------------- REMOVE Teacher----------------------
app.post("/removeteacher", async (req, res) => {
  if (req.body.user && req.body.department) {
    let data = await AddTeacherSchema.findOne(req.body).select("-password");
    if (data) {
      await AddTeacherSchema.deleteOne(req.body);
      res.send(data);
      // console.log(data.name + "  branch : " + data.department);
    } else {
      res.send("No were user found");
    }
  } else {
    res.send("No user found");
  }
});

// -----------------Get Teacher Name For Student Feedback---------------------------

app.post("/getTeacherName", async (req, res) => {
  // let data = await AddTeacherSchema.find({}, { name: 1, _id: 0 });
  let data = await AddTeacherSchema.find({}, { _id: 0 });
  if (data) {
    res.send(data);
    // console.log(data);
  } else {
    res.send({ result: "No Data Found" });
  }
});
// -----------------Get Teacher Department For Student Feedback---------------------------

app.post("/getTeacherdepartment", async (req, res) => {
  // let data = await AddTeacherSchema.find({}, { name: 1, _id: 0 });
  let data = await AddTeacherSchema.find({}, { _id: 0 });
  if (data) {
    res.send(data);
    // console.log(data);
  } else {
    res.send({ result: "No Data Found" });
  }
});

// ---------------------Show Single Teacher Report------------------------------------------------

app.post("/showSingleReport", async (req, res) => {
  // console.log(req.body);
  let dep = req.body.department;
  let tech = req.body.teacher;
  let sub = req.body.subject;

  let data = await FeedbackSchema.find(
    { department: dep, teacher: tech, subject: sub },
    {}
  );
  // console.log(data);
  if (data) {
    let temp = await FeedbackSchema.find(
      { teacher: tech },
      { QueOne: true, QueTwo: true, QueThree: true, QueFour: true, _id: false }
    );
    // console.log(temp);
    res.send(temp);
  } else {
    res.send({ result: "failed" });
  }
});

app.post("/changePasswordOfAdmin", async (req, res) => {
  try {
    // console.log(req.body)
    if (req.body.currentPassword && req.body.newPassword && req.body.name) {
      let data = await Adminlogin.findOne(req.body);
      data = await Adminlogin.updateOne(
        { user: req.body.name, pass: req.body.currentPassword },
        { $set: { pass: req.body.newPassword } }
      );
      console.log(data);
      res.send(data);
    } else {
      // res.send({ result: "No data" });
      res.json({ result: 0 });
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(4000, (err) => {
  if (err) {
    console.log("Error : " + err);
  } else {
    console.log("Server is running on port 4000");
  }
});
