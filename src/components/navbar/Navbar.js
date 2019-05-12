import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { getToken, clearToken } from "../../utils/token";
import "./Navbar.scss";

class Navbar extends Component {
  showLightTheme(pathname) {
    const routes = ["/", "/auth", "/home"];

    if (routes.includes(pathname)) {
      return true;
    }

    return false;
  }

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
        route: "/auth"
      }
    ];

    const { pathname } = this.props.location;
    const pages = pathname.includes("/admin") ? privateRoutes : regularPages;
    const token = getToken();

    return pages.map((page, index) => {
      if (page.route === "/auth" && token) {
        return null;
      }

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
    const token = getToken();

    return (
      <nav
        className={`custom-navbar navbar navbar-inverse ${
          this.showLightTheme(pathname) ? "nav-index" : ""
        }`}
      >
        <div className="container">
          <div className="navbar-header">
            <a className="navbar-brand" href={token ? "/home" : "/"}>
              MeuTesouro
            </a>
          </div>
          <ul className="nav navbar-nav nav navbar-nav navbar-right">
            {this.renderPages()}
            {token && (
              <li>
                <a href="/" onClick={() => clearToken()}>
                  Sair
                </a>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
