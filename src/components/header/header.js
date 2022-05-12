import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

export const Header = () => {
  return (
    <React.Fragment>
      <ul className="navigation">
        <li>
          <Link to="/">Layout 1</Link>
        </li>
        <li>
          <Link to="/layout-two">Layout 2</Link>
        </li>
      </ul>
    </React.Fragment>
  );
};
