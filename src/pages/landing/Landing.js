import React, { Component } from "react";
import { CrawlerService, TypeService, GroupService } from "./../../services";
import { PriceTable, Loading } from "../../components";
import * as css from './Styled'

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
      <css.LandingWrapper>
        <css.HeaderOverlay />
        <css.HeaderImage />
        <css.HeaderInfo>
          <css.TextCenter className="text-center">
            <css.HeaderText>
              Acompanhar seus investimentos nunca se tornou tão prático!
            </css.HeaderText>
            <css.Button className="custom-btn-invert">
              Conheça nossos serviços
            </css.Button>
          </css.TextCenter>
        </css.HeaderInfo>
        {isLoading ? (
          <Loading />
        ) : (
          <css.Content className="container">
            <PriceTable config={this.state.dadosCrawler} />
          </css.Content>
        )}
      </css.LandingWrapper>
    );
  }
}

export default Landing;
