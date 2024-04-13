import React from "react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer">
      <div>
        <Link className="linkIcon" to="https://www.linkedin.com/in/manthan-paliwal-0b0152190/" target="_blank">
          <i class="fa-brands fa-linkedin navbarButtons"></i>Linkdin
        </Link>
        <Link className="linkIcon" to="https://cdac.in/index.aspx?id=BL" target="_blank">
          <i class="fa-solid fa-graduation-cap navbarButtons"></i>Collage
        </Link>
        <Link className="linkIcon" to="https://www.youtube.com/@CDACBengaluru" target="_blank">
        <i class="fa-brands fa-youtube navbarButtons" ></i>YouTube
        </Link>
      </div>
    </div>
  );
};

export default Footer;
