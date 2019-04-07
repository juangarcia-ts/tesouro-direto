import React from "react";
import "./Navbar.scss";

const Navbar = () => (
  <nav className="custom-navbar navbar navbar-inverse">
    <div className="container">
      <div className="navbar-header">
        <a className="navbar-brand" href="/oi">
          MeuTesouro
        </a>
      </div>
      <ul className="nav navbar-nav nav navbar-nav  navbar-right">
        <li className="active">
          <a href="/oi">Home</a>
        </li>
        <li>
          <a href="/oi">Page 1</a>
        </li>
        <li>
          <a href="/oi">Page 2</a>
        </li>
        <li>
          <a href="/oi">Page 3</a>
        </li>
      </ul>
    </div>
  </nav>
);

export default Navbar;
