import React, { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

function AddTeacher() {
  const [name, setName] = useState();
  const [user, setUser] = useState();
  const [department, setDepartment] = useState();
  const [pass, setPass] = useState();
  const navigate = useNavigate();

  const handleAdd = async () => {
    let result = await fetch("http://localhost:4000/addteacher", {
      method: "post",
      body: JSON.stringify({ name, user, department, pass }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.name && result.user && result.department && result.pass) {
      navigate("/adminHome");
    } else {
      alert("Invalid Input");
    }
  };
  return (
    <div>
      <div className="loginpages">
        <h3 className="studentheading">ADD TEACHER</h3>
        <div>
          <input
            className="inputBox"
            placeholder="Enter Name"
            required
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div>
          <input
            className="inputBox"
            placeholder="User Name"
            required
            type="text"
            value={user}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
        </div>

        <select
          name="teacher"
          className="inputBox"
          id="teacher"
          onChange={(e) => {
            setDepartment(e.target.value);
          }}
        >
          <option value="none" selected disabled hidden>
            Select Department
          </option>
          <option value="DAC">DAC</option>
          <option value="DITISS">DITISS</option>
          <option value="DBDA">DBDA</option>
        </select>

        <div>
          <input
            className="inputBox"
            placeholder="Enter Password"
            required
            type="text"
            value={pass}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
        </div>
        <div>
          <button className="signUpButton" onClick={handleAdd}>
            Add
          </button>
          <div>
            <Link
              className="inputBox signUpButton studentButton"
              to="/adminHome"
            >
              Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;
