import React, { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";

function TeacherFeedback() {
  const [subject, setSubject] = useState();
  const [report, setReport] = useState();
  const [one, setOne] = useState();
  const [two, setTwo] = useState();
  const [three, setThree] = useState();
  const [four, setFour] = useState();
  const [error, setError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      getSubjectName();
      navigate("/teacherFeedbackPage");
    }
  }, []);

  const handleGetReport = () => {
    // console.log("Get Reop : " + report);

    if (!report) {
      setError(true);
      return false;
    }

    if (report) {
      var One = 0,
        Two = 0,
        Three = 0,
        Four = 0;
      for (const [key, val] of Object.entries(report)) {
        // console.log(key, val);
        for (const [key1, val1] of Object.entries(val)) {
          if (key1 === "QueOne") {
            One = One + parseInt(val1);
          } else if (key1 === "QueTwo") {
            Two = Two + parseInt(val1);
          } else if (key1 === "QueThree") {
            Three = Three + parseInt(val1);
          } else if (key1 === "QueFour") {
            Four = Four + parseInt(val1);
          }
        }
      }
      setOne(parseInt(One));
      setTwo(parseInt(Two));
      setThree(parseInt(Three));
      setFour(parseInt(Four));
      // console.log("data : =>" + one, two, three, four);
    } else {
      console.warn("ram ram");
    }
  };

  const getSubjectName = async (dep) => {
    if (dep) {
      let result = await axios.post("http://localhost:4000/teacherFeedback", {
        dep,
      });
      if (result.data) {
        setReport(result.data);
      } else {
        setPasswordCheck(true);
        console.log("not found");
      }
    }
  };

  const auth = JSON.parse(localStorage.getItem("user"));
  const OnLogOut = () => {
    localStorage.clear();
    navigate("/adminlogin");
  };
  return (
    <div>
      <div className="showreportpage  container">
        <div>
          <Link to="/teacherLogin">
            <i
              className="fa-solid fa-right-from-bracket navbarButtons"
              onClick={OnLogOut}
            ></i>
          </Link>
        </div>
        <h3 className="studentheading">{auth.name} Feedback</h3>
        <div className="row">
          {passwordCheck === true ? (
            <span className="invalidmessage">Data Not Found</span>
          ) : (
            error &&
            !subject && <span className="invalidmessage">Data Not Found</span>
          )}
          <div className="col-6 oneout">
            <select
              name="subject"
              className="inputBox"
              id="subject"
              onChange={(e) => {
                getSubjectName(e.target.value);
                setSubject(e.target.value);
              }}
            >
              <option value="none" selected disabled hidden>
                Select Subject
              </option>
              <option value="Java">Java</option>
              <option value="CPP">CPP</option>
              <option value="web">Web Dev</option>
              <option value="Data Base">Data Base</option>
            </select>
            <div>
              <button
                className="inputBox studentButton"
                onClick={handleGetReport}
              >
                Get Report
              </button>
            </div>
          </div>
          <div className="col-6">
            <div className="repo">
              <h4>Communication : {one}</h4>
              <h4>Presentation : {two}</h4>
              <h4>Dobut clearence : {three}</h4>
              <h4>performance : {four}</h4>
              <p>Total : {one + two + three + four}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeacherFeedback;
