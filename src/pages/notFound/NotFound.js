import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class NotFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  redirectToHomePage() {
    this.setState({ redirect: true });
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to="/pagina-inicial" />;
    }

    return (
      <div className="container">
        <div className="not-found text-center">
          <h1>404 - Página Não Encontrada</h1>
          <button
            type="button"
            className="btn btn-default"
            onClick={() => this.redirectToHomePage()}
          >
            Voltar para a página principal
          </button>
        </div>
      </div>
    );
  }
}

export default NotFound;
