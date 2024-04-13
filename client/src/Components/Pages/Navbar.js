import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();

  const handleHomeButton = () => {
    localStorage.clear();
    navigate("/");
  };

  // const handlebackButton = () => {
  //   localStorage.clear();
  //   navigate("/studentlogin");
  // };
  // const auth = localStorage.getItem("user");
  // ----------------------------------------------------------
  return (
    <div className="container-fluid">
      <div className="row navbar">
        <div className="col-1 offset-0">
          <p onClick={handleHomeButton}>
            <i className="fa-solid fa-house navbarButtons "></i>
          </p>
        </div>
        <div className="col">
          <h1>Web Based Feedback Management System</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
