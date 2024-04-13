import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function StudentLogin() {
  const [roll, setRoll] = useState();
  const [pass, setPass] = useState();
  const [error, setError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/feedback");
    }
  }, []);

  const onsubmit = async () => {
    if (!roll || !pass) {
      setError(true);
      return false;
    }

    let result = await fetch("http://localhost:4000/login", {
      method: "post",
      body: JSON.stringify({ roll, pass }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    if (result.roll) {
      localStorage.setItem("user", JSON.stringify(result)); // for keeping track of data on client side
      navigate("/feedback");
    } else {
      // setError(true);
      setPasswordCheck(true);
      // console.log("Invalid Roll Number OR Password");
    }
  };
  return (
    <div className="loginpages">
      <div>
        <Link to="/">
          <i className="fa-solid fa-right-from-bracket navbarButtons"></i>
        </Link>
      </div>
      <h3 className="studentheading">STUDENT LOGIN</h3>
      <div>
        <input
          className="inputBox"
          placeholder="Roll Number"
          required
          type="Number"
          id="username"
          value={roll}
          onChange={(e) => {
            setRoll(e.target.value);
          }}
        />
      </div>
      {error && !roll && (
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
          <Link
            className="inputBox signUpButton studentButton"
            to="/studentregister"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StudentLogin;
