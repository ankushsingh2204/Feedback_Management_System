import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function TeacherLogin() {
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [error, setError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/teacherFeedbackPage");
    }
  }, []);

  const onsubmit = async () => {
    if (!user || !pass) {
      setError(true);
      return false;
    }

    let result = await fetch("http://localhost:4000/teacherloginpage", {
      method: "post",
      body: JSON.stringify({ user, pass }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result)); // for keeping track of data on client side
      navigate("/teacherFeedbackPage");
    } else {
      // setError(true);
      setPasswordCheck(true);
      console.log("Invalid user ID OR Password");
    }
  };
  return (
    <div className="loginpages">
      <h3 className="studentheading">TEACHER LOGIN</h3>
      <div>
        <input
          className="inputBox"
          placeholder="user Id"
          required
          type="text"
          id="username"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
      </div>
      {error && !user && (
        <span className="invalidmessage">Invalid RollNumber</span>
      )}
      <div>
        <input
          className="inputBox"
          placeholder="Enter Password"
          required
          type="password"
          id="password"
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
      </div>
      {/* {error && !pass && (
        <span className="invalidmessage">Enter Valid password</span>
      )} */}
      {passwordCheck === true ? (
        <span className="invalidmessage">Invalid RollNumber or Password </span>
      ) : (
        error &&
        !pass && <span className="invalidmessage">Invalid password</span>
      )}
      <div>
        <button className="signUpButton" onClick={onsubmit}>
          Login
        </button>
        <div>
          <Link className="inputBox signUpButton studentButton" to="/">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TeacherLogin;
