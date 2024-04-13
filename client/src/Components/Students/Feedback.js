import axios from "axios";
import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

function Feedback() {
  const [department, setDepartment] = useState();
  const [teacher, setTeacher] = useState();
  const [subject, setSubject] = useState();
  const [QueOne, setQueOne] = useState();
  const [QueTwo, setQueTwo] = useState();
  const [QueThree, setQueThree] = useState();
  const [QueFour, setQueFour] = useState();

  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      handleNameDropDown();
      // handleDepartmentDropDown();
    } else {
      navigate("/");
    }
  }, []);

  const handleOnClick = async () => {
    if (
      !department ||
      !teacher ||
      !subject ||
      !QueOne ||
      !QueTwo ||
      !QueThree ||
      !QueFour
    ) {
      setError(true);
      return false;
    }

    const studentId = JSON.parse(localStorage.getItem("user"))._id;

    let result = await fetch("http://localhost:4000/setfeedback", {
      method: "post",
      body: JSON.stringify({
        department,
        teacher,
        subject,
        QueOne,
        QueTwo,
        QueThree,
        QueFour,
        studentId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.department) {
      console.log(result);
      localStorage.clear();
      navigate("/");
    } else {
      console.log("Data not field properly yet");
    }
  };

  // ------------------------------Render Teacher Names-----------------------------------
  const [names, setNames] = useState();

  const handleNameDropDown = async () => {
    let result = await axios.post("http://localhost:4000/getTeacherName");
    if (result.data) {
      setNames(result.data);
      console.log(names);
    }
  };

  // ------------------------------Render Teacher Depoartment-----------------------------------
  // const [departments, setDepartments] = useState([]);

  // const getDepartmentData = (dep) => {
  //   let getNames = [];
  //   getNames = names
  //     .filter((item) => item.department === dep)
  //     .map((i) => i.name);
  //   setDepartments(getNames);
  //   console.log("getNames :" + departments);
  // };

  // -----------------------------------------------------------------------
  const auth = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="feedbackpagesstudent">
      <h3 className="studentheading">Hello, {auth.name}</h3>
      {error && !department ? (
        <span className="invalidmessage">Fill Data properly</span>
      ) : (
        error && <span className="invalidmessage">Fill Data properly</span>
      )}
      <div className="selectforfeedback">
        <select
          name="branch"
          className="inputBox"
          id="department"
          onChange={(e) => {
            setDepartment(e.target.value);
            // getDepartmentData(e.target.value);
          }}
        >
          <option value="none" selected disabled hidden>
            Select Department
          </option>
          {/* {names ? (
            names.map((item) => <option>{item.department}</option>)
          ) : (
            <option>getting</option>
          )} */}
          <option value="DAC">DAC</option>
          <option value="DBDA">DBDA</option>
          <option value="DITISS">DITISS</option>
        </select>
      </div>
      <div className="selectforfeedback">
        <select
          name="teacher"
          className="inputBox"
          id="teacher"
          onChange={(e) => {
            setTeacher(e.target.value);
          }}
        >
          <option value="none" selected disabled hidden>
            Select Teacher
          </option>

          {names ? (
            names.map((item) => <option>{item.name}</option>)
          ) : (
            <option>getting</option>
          )}
        </select>
      </div>
      <div className="selectforfeedback">
        <select
          className="inputBox"
          name="subject"
          id="subject"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        >
          <option value="none" selected disabled hidden>
            Select Subjects
          </option>
          <option value="Java">Java</option>
          <option value="CPP">CPP</option>
          <option value="web">Web Dev</option>
          <option value="Data Base">Data Base</option>
        </select>
      </div>
      <div>
        <h4>Communication</h4>
        <>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio1"
              defaultValue="1"
              required
              value={QueOne}
              onChange={(e) => setQueOne(e.target.value)}
            />
            <label className="form-check-label" htmlFor="inlineRadio1">
              Poor
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio2"
              defaultValue="2"
              required
              value={QueOne}
              onChange={(e) => setQueOne(e.target.value)}
            />
            <label className="form-check-label" htmlFor="inlineRadio2">
              Average
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio3"
              defaultValue="3"
              required
              value={QueOne}
              onChange={(e) => setQueOne(e.target.value)}
            />
            <label className="form-check-label" htmlFor="inlineRadio3">
              Good
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio4"
              defaultValue="4"
              required
              value={QueOne}
              onChange={(e) => setQueOne(e.target.value)}
            />
            <label className="form-check-label" htmlFor="inlineRadio4">
              Very Good
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="inlineRadioOptions"
              id="inlineRadio5"
              defaultValue="5"
              required
              value={QueOne}
              onChange={(e) => setQueOne(e.target.value)}
            />
            <label className="form-check-label" htmlFor="inlineRadio5">
              Excellent
            </label>
          </div>
        </>
      </div>

      <div>
        <h4>Presentation</h4>
        <>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question2"
              id="Question2-1"
              defaultValue="1"
              required
              value={QueTwo}
              onChange={(e) => setQueTwo(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question2-1">
              Poor
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question2"
              id="Question2-2"
              defaultValue="2"
              required
              value={QueTwo}
              onChange={(e) => setQueTwo(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question2-2">
              Average
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question2"
              id="Question2-3"
              defaultValue="3"
              required
              value={QueTwo}
              onChange={(e) => setQueTwo(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question2-3">
              Good
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question2"
              id="Question2-4"
              required
              value={QueTwo}
              onChange={(e) => setQueTwo(e.target.value)}
              defaultValue="4"
            />
            <label className="form-check-label" htmlFor="Question2-4">
              Very Good
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question2"
              id="Question2-5"
              required
              value={QueTwo}
              onChange={(e) => setQueTwo(e.target.value)}
              defaultValue="5"
            />
            <label className="form-check-label" htmlFor="Question2-5">
              Excellent
            </label>
          </div>
        </>
      </div>

      <div>
        <h4>Dobut clearence</h4>
        <>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question3"
              id="Question3-1"
              defaultValue="1"
              required
              value={QueThree}
              onChange={(e) => setQueThree(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question3-1">
              Poor
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question3"
              id="Question3-2"
              defaultValue="2"
              required
              value={QueThree}
              onChange={(e) => setQueThree(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question3-2">
              Average
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question3"
              id="Question3-3"
              defaultValue="3"
              required
              value={QueThree}
              onChange={(e) => setQueThree(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question3-3">
              Good
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question3"
              id="Question3-4"
              defaultValue="4"
              required
              value={QueThree}
              onChange={(e) => setQueThree(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question3-4">
              Very Good
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question3"
              id="Question3-5"
              defaultValue="5"
              required
              value={QueThree}
              onChange={(e) => setQueThree(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question3-5">
              Excellent
            </label>
          </div>
        </>
      </div>
      <div>
        <h4>performance</h4>
        <>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question4"
              id="Question4-1"
              defaultValue="1"
              required
              value={QueFour}
              onChange={(e) => setQueFour(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question4-1">
              Poor
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question4"
              id="Question4-2"
              defaultValue="2"
              required
              value={QueFour}
              onChange={(e) => setQueFour(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question4-2">
              Average
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question4"
              id="Question4-3"
              defaultValue="3"
              required
              value={QueFour}
              onChange={(e) => setQueFour(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question4-3">
              Good
            </label>
          </div>

          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question4"
              id="Question4-4"
              defaultValue="4"
              required
              value={QueFour}
              onChange={(e) => setQueFour(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question4-4">
              Very Good
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="Question4"
              id="Question4-5"
              defaultValue="5"
              required
              value={QueFour}
              onChange={(e) => setQueFour(e.target.value)}
            />
            <label className="form-check-label" htmlFor="Question4-5">
              Excellent
            </label>
          </div>
        </>
      </div>

      <div className="homeList ">
        <div className="inputBox studentButton" onClick={handleOnClick}>
          Submit
        </div>
      </div>
    </div>
  );
}

export default Feedback;
