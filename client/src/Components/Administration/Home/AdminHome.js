import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (!auth) {
      navigate("/adminHome");
    }
  }, []);

  const OnLogOut = () => {
    localStorage.clear();
    navigate("/adminlogin");
  };
  // const auth = JSON.parse(localStorage.getItem("user"));
  return (
    <div>
      <div className="homepage loginpages">
        <div>
          <Link to="/adminlogin">
            <i className="fa-solid fa-right-from-bracket navbarButtons" onClick={OnLogOut}></i>
          </Link>
        </div>
        <ul className="homeList">
          <h3 className="studentheading">Admin Home</h3>
          {/* <h3 className="studentheading">Hello,  {auth.user}</h3> */}
          <li>
            <Link className="inputBox studentButton" to="/addTeacher">
              Add Teacher
            </Link>
          </li>
          <li>
            <Link className="inputBox studentButton" to="/removeTeacher">
              Remove Teacher
            </Link>
          </li>
          <li>
            <Link className="inputBox studentButton" to="/changePassword">
              Change Password
            </Link>
          </li>
          <li>
            <Link className="inputBox studentButton" to="/reportOneTeacher">
              Generate Report
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdminHome;
