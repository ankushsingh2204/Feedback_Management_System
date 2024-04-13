import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function ReportOne() {
  const [department, setDepartment] = useState();
  const [teacher, setTeacher] = useState("");
  const [subject, setSubject] = useState();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      handleDropDown();
    }
  }, []);

  //   ------------------Geting Teacher Name and Department----------------------------------
  const [name, setName] = useState([]);

  const handleDropDown = async () => {
    let result = await axios.post("http://localhost:4000/getTeacherName");
    setName(result.data);
  };

  const [nameBasedOnDep, setNameBasedOnDep] = useState([]);

  // const onInputChanges = (dep) => {
  //   const selectedDept = dep && name.filter((item) => item.department === dep);
  //   const teachers = selectedDept.map((dept) => dept.name).flat();
  //   console.log("Teachers ----> " + teachers);
  //   setNameBasedOnDep(teachers);
  //   console.log("state data ----> " + nameBasedOnDep);
  // };
  //   ------------------------------Getting Teacher Report Based on Feedback---------------------------------------------
  const [feed, setFeed] = useState();
  const [one, setOne] = useState();
  const [two, setTwo] = useState();
  const [three, setThree] = useState();
  const [four, setFour] = useState();

  const handleGetReport = async () => {
    // console.log(department, teacher, subject);
    let result = await axios.post("http://localhost:4000/showSingleReport", {
      department,
      teacher,
      subject,
    });
    // result = await JSON.parse(result);
    if (result.data) {
      setFeed(result.data);
      if (feed) {
        // console.log("FEED =>" + feed);
        var One = 0,
          Two = 0,
          Three = 0,
          Four = 0;
        for (const [key, val] of Object.entries(feed)) {
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
          // console.log("add one : " + addOne);
        }
        setOne(parseInt(One));
        setTwo(parseInt(Two));
        setThree(parseInt(Three));
        setFour(parseInt(Four));
        console.log("data : =>" + one, two, three, four);
        setFeedbackofrepo(one, two, three, four);
        // console.log(feedbackofrepo);
      } else {
        console.warn("Data not calculating ");
      }
    } else {
      alert("No Feedback Gave Yet");
    }
  };
  const [feedbackofrepo, setFeedbackofrepo] = useState({
    first: one,
    second: two,
    third: three,
    fourth: four,
  });

  // ----------------------------------------- JSX ------------------------------

  
  return (
    <div className="showreportpage  container">
      <h3 className="studentheading">Report</h3>
      <div className="row">
        <div className="col-6 oneout">
          {/* <select
            name="teacher"
            id="teacher"
            className="inputBox"
            onChange={(e) => {
              setDepartment(e.target.value);
              onInputChanges(e.target.value);
            }}
          >
            <option value="none" selected disabled hidden>
              Select Department
            </option>
            <option value="DAC">DAC</option>
            <option value="DBDA">DBDA</option>
            <option value="DITISS">DITISS</option>
          </select> */}
          <select
            name="teacher"
            className="inputBox"
            id="teacher"
            onChange={(e) => {
              setTeacher(e.target.value);
            }}
          >
            <option value="none" selected disabled hidden>
              Select Teachers
            </option>
            {/* {state && state.map((item) => <option>{item.name}</option>)} */}
            {name && name.map((item) => <option>{item.name}</option>)}
            {/* {nameBasedOnDep
              ? nameBasedOnDep.map((item, index) => {
                  <option key={index} value={item}>
                    {item}
                  </option>;
                })
              : nameBasedOnDep && <option>{nameBasedOnDep}</option>} */}
            {/* {nameBasedOnDep && <option>{nameBasedOnDep.name}</option>} */}
          </select>
          {/* <select
            name="subject"
            className="inputBox"
            id="subject"
            onChange={(e) => {
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
          </select> */}

          <div>
            <button
              className="inputBox studentButton"
              onClick={handleGetReport}
            >
              Get Report
            </button>
          </div>
          <div>
            <Link className="inputBox studentButton" to="/adminHome">
              Back
            </Link>
          </div>
        </div>
        <div className="col-6 oneout">
          {
            // <div className="feedbackreport">
            <div className="repo">
              <p>Teacher Name : {teacher}</p>
              {/* <p>Department : {department}</p>
              <p>Subject : {subject}</p> */}
              <h4>Communication : {one}</h4>
              <h4>Presentation : {two}</h4>
              <h4>Doubt clearance : {three}</h4>
              <h4>Performance : {four}</h4>
              <p>Total : {one + two + three + four}</p>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default ReportOne;
