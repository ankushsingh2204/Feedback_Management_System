import React from "react";
import { Link } from "react-router-dom";

function Home() {
  
  return (
    <div className="background">
      <div className="homepage row">
        <div className="col">
          <ul className="homeList register">
            <li>
              <Link className="inputBox studentButton" to="/studentlogin">
                STUDENT LOGIN
              </Link>
            </li>
            <li>
              <Link className="inputBox studentButton" to="/teacherLogin">
                TEACHER LOGIN
              </Link>
            </li>
            <li>
              <Link className="inputBox studentButton" to="/adminlogin">
                ADMINISTRATION LOGIN
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
