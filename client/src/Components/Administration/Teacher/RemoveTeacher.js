import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function RemoveTeacher() {
  const [user, setUser] = useState();
  const [department, setDepartment] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const handleRemove = async () => {
    if (!user || !department) {
      setError(true);
      return false;
    }
    console.log(user, department);
    let result = await axios.post("http://localhost:4000/removeteacher", {
      user,
      department,
    });
    // console.log("name: " + result.name + " department : " + result.department);
    if (result.data) {
      if(result.data.user == user && result.data.department == department){
        navigate("/removepage");
      }else{
        setPasswordCheck(true);
      }
    } else {
      setError(true);
    }
  };
  return (
    <div className="loginpages">
      {/* <h3>Remove Teacher</h3> */}
      <h3 className="studentheading">REMOVE TEACHER</h3>

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
      {error && !user && (
        <span className="invalidmessage">Invalid Username</span>
      )}
      <select
        name="department"
        className="inputBox"
        id="department"
        value={department}
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
      {passwordCheck === true ? (
        <span className="invalidmessage">Invalid User Name OR Department</span>
      ) : (
        error &&
        !department && (
          <span className="invalidmessage">Invalid Department</span>
        )
      )}
      <div>
        <button className="signUpButton" onClick={handleRemove}>
          Remove
        </button>
      </div>
      <div>
        <Link className="inputBox signUpButton studentButton" to="/adminHome">
          Back
        </Link>
      </div>
    </div>
  );
}

export default RemoveTeacher;
