import React from "react";

const Navbar = () => (
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <div class="navbar-header">
        <a class="navbar-brand" href="/oi">
          WebSiteName
        </a>
      </div>
      <ul class="nav navbar-nav">
        <li class="active">
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
