import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import { getToken, clearToken } from "../../utils/token";
import "./Navbar.scss";

class Navbar extends Component {
  showLightTheme(pathname) {
    const routes = ["/", "/entrar", "/minha-conta"];

    if (routes.includes(pathname)) {
      return true;
    }

    return false;
  }

  renderPages() {
    const token = getToken();

    const regularPages = [
      {
        title: "Home",
        route: token ? "/pagina-inicial" : "/"
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
        route: "/entrar"
      }
    ];
    const privateRoutes = [
      {
        title: "Publicações",
        route: "/admin/blog"
      }
    ];

    const { pathname } = this.props.location;
    const pages = pathname.includes("/admin") ? privateRoutes : regularPages;

    return pages.map((page, index) => {
      if (page.route === "/entrar" && token) {
        return null;
      }

      return (
        <li
          key={index}
          className={`${page.route === pathname ? "active" : ""}`}
        >
          <Link to={page.route}>{page.title}</Link>
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
            <Link className="navbar-brand" to="/">
              MeuTesouro
            </Link>
          </div>
          <ul className="nav navbar-nav nav navbar-nav navbar-right">
            {this.renderPages()}
            {token && (
              <li>
                <Link to="/" onClick={() => clearToken()}>
                  Sair
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

export default withRouter(Navbar);
