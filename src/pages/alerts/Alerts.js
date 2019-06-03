import React, { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { CrawlerService, GroupService } from "./../../services";
import { Loading } from "../../components";
import * as css from "./Styled";
import { FlexRow } from "../../components/quiz/Styled";

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: [],
      stocks: [],
      groups: [],
      selectedNotification: "SMS",
      selectedGroup: 1,
      selectedTarget: "=",
      targetValue: 0,
      isLoading: false
    };
  }

  componentDidMount() {
    GroupService.listarGrupos().then(response =>
      this.setState({ groups: response.data })
    );

    CrawlerService.obterTitulosAtualizados().then(response => {
      this.setState({ stocks: response.data.lista_titulos });
    });
  }

  selectNotification(event) {
    this.setState({ selectedNotification: event.target.value });
  }

  selectTarget(event) {
    this.setState({ selectedTarget: event.target.value });
  }

  selectGroup(event) {
    this.setState({ selectedGroup: parseInt(event.target.value) });
  }

  renderGroups() {
    const { groups } = this.state;

    return groups.map((group, index) => (
      <css.Option key={index} value={group.tipo}>
        {group.tipo === 1 ? "investir no" : "resgatar o"}
      </css.Option>
    ));
  }

  renderStocks() {
    const { stocks, selectedGroup } = this.state;
    const stocksByGroup = stocks.filter(x => x.tipo_titulo.grupo_titulo.tipo === selectedGroup);

    return stocksByGroup.map((stock, index) => (
      <css.Option key={index} value={stock.nome_titulo}>
        {stock.nome_titulo.replace("Tesouro", "")}
      </css.Option>
    ));
  }

  render() {
    const { isLoading, selectedGroup, alerts } = this.state;

    return (
      <>
        {isLoading && <Loading />}
        <Container>
          <css.AlertsWrapper>
            <FlexRow>
                <Col xs={9} sm={9} md={9} lg={9}>
                  <css.Title>Eu quero ser notificado...</css.Title>
                </Col>
                <Col xs={3} sm={3} md={3} lg={3}>
                  <css.SubmitButton>Confirmar</css.SubmitButton>
                </Col>
            </FlexRow>
            <css.Section>
              <css.Label>por </css.Label>
              <css.Dropdown onChange={this.selectNotification.bind(this)}>
                <css.Option value="EMAIL">e-mail</css.Option>
                <css.Option value="SMS">SMS</css.Option>
              </css.Dropdown>
            </css.Section>
            <css.Section>
              <css.Label>quando eu puder </css.Label>
              <css.Dropdown onChange={this.selectGroup.bind(this)}>
                {this.renderGroups()}
              </css.Dropdown>
            </css.Section>
            <css.Section>
              <css.Label>papel </css.Label>
              <css.Dropdown disabled={!selectedGroup}>{selectedGroup && this.renderStocks()}</css.Dropdown>
            </css.Section>
            <css.Section>
              <css.Label>se ele </css.Label>
              <css.Dropdown onChange={this.selectTarget.bind(this)}>
                <css.Option value="<">apresentar um valor abaixo</css.Option>
                <css.Option value="=">alcançar o valor</css.Option>
                <css.Option value=">">apresentar um valor acima</css.Option>
              </css.Dropdown>
            </css.Section>
            <css.Section>
              <css.Label> de R$ </css.Label>
              <css.Input type="text" />
            </css.Section>
            <css.Divider />
            <css.Title>Meus Alertas</css.Title>
            <css.Section>
              {alerts.length === 0 && (
                <css.Label>Não há nenhum alerta cadastrado</css.Label>
              )}
            </css.Section>
          </css.AlertsWrapper>
        </Container>
      </>
    );
  }
}

export default Alerts;
