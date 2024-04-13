import React from "react";
import { Link } from "react-router-dom";

function Removepage() {
  return (
    <div className="errorpage">
      <h4>Teacher is removed Successfully from Data Base</h4>

      <div>
        <Link id='errorlink' to="/adminHome">
          Back To Home
        </Link>
      </div>
    </div>
  );
}

export default Removepage;
