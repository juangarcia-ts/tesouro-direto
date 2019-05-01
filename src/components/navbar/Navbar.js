import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./Navbar.scss";

class Navbar extends Component {
  renderPages() {
    const privateRoutes = [
      {
        title: "Publicações",
        route: "/admin/posts"
      }
    ];
    const regularPages = [
      {
        title: "Home",
        route: "/"
      },
      {
        title: "Nossos serviços",
        route: "/servicos"
      },
      {
        title: "Blog",
        route: "/blog"
      },
      {
        title: "Entrar",
        route: "/login"
      }
    ];

    const { pathname } = this.props.location;

    const pages = pathname.includes("/admin") ? privateRoutes : regularPages;

    return pages.map((page, index) => {
      return (
        <li
          key={index}
          className={`${page.route === pathname ? "active" : ""}`}
        >
          <a href={page.route}>{page.title}</a>
        </li>
      );
    });
  }

  render() {
    const { pathname } = this.props.location;

    return (
      <nav
        className={`custom-navbar navbar navbar-inverse ${
          pathname === "/" ? "nav-index" : ""
        }`}
      >
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              MeuTesouro
            </a>
          </div>
          <ul className="nav navbar-nav nav navbar-nav navbar-right">
            {this.renderPages()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
