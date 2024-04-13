import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentRegister() {
  const [name, setName] = useState();
  const [roll, setRoll] = useState();
  const [branch, setBranch] = useState();
  const [pass, setPass] = useState();
  const [confirmpass, setConfirmpass] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const login = () => {
    navigate("/studentlogin");
  };
  const handleRegister = async () => {
    if (!name || !roll || !branch || !pass || !confirmpass) {
      setError(true);
      return false;
    }

    // console.log(name, roll, branch, pass, confirmpass);
    if (pass === confirmpass) {
      let result = await axios.post("http://localhost:4000/studentregister", {
        name,
        roll,
        branch,
        pass,
        confirmpass,
      });
      if (result.data) {
        navigate("/studentlogin");
      } else {
        navigate("/studentregister");
      }
    } else {
      setPasswordCheck(true);
      // alert("Password Missmatch");
      console.log("error");
    }
  };
  return (
    <div className="loginpages">
      <h3 className="studentheading">STUDENT REGISTER</h3>
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
      {error && !name && (
        <span className="invalidmessage">Enter valid Details</span>
      )}
      <div>
        <input
          className="inputBox"
          placeholder="Roll Numbner"
          required
          type="Number"
          value={roll}
          onChange={(e) => {
            setRoll(e.target.value);
          }}
        />
      </div>
      {error && !roll && (
        <span className="invalidmessage">Enter valid Details</span>
      )}

      <select
        name="branch"
        className="inputBox"
        id="department"
        onChange={(e) => {
          setBranch(e.target.value);
        }}
      >
        <option value="none" selected disabled hidden>
          Select Department
        </option>
        <option value="DAC">DAC</option>
        <option value="DITISS">DITISS</option>
        <option value="DBDA">DBDA</option>
      </select>
      {error && !branch && (
        <span className="invalidmessage">Enter valid Details</span>
      )}
      <div>
        <input
          className="inputBox"
          placeholder="Enter Password"
          required
          type="password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
      </div>
      {error && !pass && (
        <span className="invalidmessage">Enter valid Details</span>
      )}
      <div>
        <input
          className="inputBox"
          placeholder="Confirm Password"
          required
          type="password"
          value={confirmpass}
          onChange={(e) => {
            setConfirmpass(e.target.value);
          }}
        />
      </div>

      {
        passwordCheck === true ? (
          <span className="invalidmessage">Password Not Match</span>
        ): error && !confirmpass && (
          <span className="invalidmessage">Enter valid Details</span>
        )
      }
      
      <div>
        <button className="signUpButton" onClick={handleRegister}>
          Register
        </button>
        <button className="signUpButton" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}

export default StudentRegister;
