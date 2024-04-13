import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ChangePassword() {
  const [name, setName] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [error, setError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const navigate = useNavigate();
  const onsubmit = async () => {
    if (!currentPassword || !newPassword || !name) {
      setError(true);
      return false;
    }
    if (currentPassword && newPassword && name) {
      let result = await axios.post(
        "http://localhost:4000/changePasswordOfAdmin",
        {
          name,
          currentPassword,
          newPassword,
        }
      );
      if (result.data.modifiedCount === 1) {
        console.log("if : " + result.data);
        console.log("type of : " + typeof result.data);
        navigate("/adminHome");
      } else {
        // setError(true);
        setPasswordCheck(true);
        console.log("else : " + result.data);
      }
    } else {
      // setError(true);
      setPasswordCheck(true);
      console.log("Password not match");
    }
  };
  return (
    <div className="loginpages">
      <h3 className="studentheading">CHANGE PASSWORD</h3>
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
      {error && !name && <span className="invalidmessage">Invalid Name</span>}
      <div>
        <input
          className="inputBox"
          placeholder="Current Password"
          required
          type="text"
          value={currentPassword}
          onChange={(e) => {
            setCurrentPassword(e.target.value);
          }}
        />
      </div>

      {error && !currentPassword && (
        <span className="invalidmessage">Invalid password</span>
      )}
      <div>
        <input
          className="inputBox"
          placeholder="New Password"
          required
          type="text"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
          }}
        />
      </div>
      {passwordCheck === true ? (
        <span className="invalidmessage">Invalid User or Password </span>
      ) : (
        error &&
        !newPassword && <span className="invalidmessage">Invalid password</span>
      )}
      {/* {error && !name ? (
        <span className="invalidmessage">Invalid Fields</span>
      ) : (
        error && <span className="invalidmessage">Invalid Fields</span>
      )} */}
      <div>
        <button className="signUpButton" onClick={onsubmit}>
          Change
        </button>
        <div>
          <Link className="inputBox signUpButton studentButton" to="/adminHome">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ChangePassword;
