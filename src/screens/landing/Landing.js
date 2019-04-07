import React, { Component } from "react";
import { CrawlerService, TypeService, GroupService } from "./../../services";
import { PriceTable, Loading } from "../../components";
import "./Landing.scss";

class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dadosCrawler: {},
      listaGrupos: [],
      listaTipos: [],
      isLoading: true
    };
  }

  componentDidMount() {
    this.getGroups();
  }

  getGroups() {
    GroupService.listarGrupos().then(response => {
      this.setState({ listaGrupos: response.data });
      this.getTypes();
    });
  }

  getTypes() {
    TypeService.listarTipos().then(response => {
      this.setState({ listaTipos: response.data });
      this.getCrawlerData();
    });
  }

  getCrawlerData() {
    CrawlerService.obterTitulosAtualizados().then(response => {
      const { listaTipos, listaGrupos } = this.state;

      const historico = response.data;
      const dataExtracao = historico.data_extracao;
      const listaResgate = [];
      const listaInvestimento = [];

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

      this.setState({
        dadosCrawler: {
          listaResgate,
          listaInvestimento,
          dataExtracao,
          listaTipos,
          listaGrupos
        },
        isLoading: false
      });
    });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <div className="landing">
        <div className="header-overlay" />
        <div className="header-img" />
        <div className="header-info">
          <div className="text-center">
            <h2 className="header-text">
              Acompanhar seus investimentos nunca se tornou tão prático!
            </h2>
            <button className="custom-btn-invert ">
              Conheça nossos serviços
            </button>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="content container">
            <PriceTable config={this.state.dadosCrawler} />
          </div>
        )}
      </div>
    );
  }
}

export default Landing;
