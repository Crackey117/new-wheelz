import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {

  return(
    <div className={props.classes}>
      <div className="grid-x grid-padding-x">
        <Link className="cell nav-margined bold black-font" to="/locations">
          Browse Spots
        </Link>
        <Link className="cell nav-margined bold black-font" to="/locations/new">
          Share Your Own Spot 
        </Link>
        <Link className="cell nav-margined bold black-font" to="/about">
          About 
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
