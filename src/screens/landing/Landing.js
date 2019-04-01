import React, { Component } from "react";
import { CrawlerService } from "./../../services";
import { Showcase } from "../../components";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaInvestimento: {},
      listaResgate: {}
    };
  }

  componentDidMount() {
    this.getCrawlerData();
  }

  getCrawlerData() {
    CrawlerService.obterTitulosAtualizados().then(response => {
      const historico = response.data;
      const { listaResgate, listaInvestimento } = this.state;

      historico.lista_titulos.forEach(titulo => {
        const { tipo, grupo_titulo } = titulo.tipo_titulo;

        if (grupo_titulo.tipo === 1) {
          if (!listaInvestimento[tipo]) {
            listaInvestimento[tipo] = [];
          }

          listaInvestimento[tipo].push(titulo);
        } else {
          if (!listaResgate[tipo]) {
            listaResgate[tipo] = [];
          }

          listaResgate[tipo].push(titulo);
        }
      });
    });
  }

  render() {
    const { listaResgate, listaInvestimento } = this.state;

    return <Showcase investiments={listaInvestimento} rescues={listaResgate} />;
  }
}

export default Landing;
