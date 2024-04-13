import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Adminlogin() {
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [error, setError] = useState(false);
  const [passwordCheck, setPasswordCheck] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/adminHome");
    }
  }, []);

  const onSubmit = async () => {
    // console.warn(!user);
    if (!user || !pass) {
      setError(true);
      return false;
    }

    let result = await fetch("http://localhost:4000/adminlogin", {
      method: "post",
      body: JSON.stringify({ user, pass }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    if (result.user) {
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/adminHome");
    } else {
      // setError(true);
      setPasswordCheck(true) ;
      console.log("Invalid User OR Password");
    }
  };
  // ----------------------------------------------------------------------------------
  return (
    <div className="loginpages">
      <h3 className="studentheading">ADMINISTRATION LOGIN</h3>
      <div>
        <input
          type="text"
          className="inputBox"
          id="username"
          placeholder="Enter Name"
          required
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />
      </div>
      {error && !user && (
        <span className="invalidmessage">Invalid Username</span>
      )}
      <div>
        <input
          type="password"
          className="inputBox"
          id="password"
          placeholder="Enter Password"
          required
          value={pass}
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />
      </div>
      {passwordCheck === true ? (
        <span className="invalidmessage">Invalid User or Password </span>
      ) : (
        error &&
        !pass && <span className="invalidmessage">Invalid password</span>
      )}
      <div>
        <button
          className="inputBox signUpButton studentButton"
          onClick={onSubmit}
        >
          Login
        </button>
        <div>
          <Link className="inputBox signUpButton studentButton" to="/">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
