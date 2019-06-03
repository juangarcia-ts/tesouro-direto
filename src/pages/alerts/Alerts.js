import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { TypeService, GroupService } from "./../../services";
import { Loading } from "../../components";
import * as css from "./Styled";

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
      groups: [],
      isLoading: false
    };
  }

  componentDidMount() {
    TypeService.listarTipos().then(response =>
      this.setState({ types: response.data })
    );

    GroupService.listarGrupos().then(response =>
      this.setState({ groups: response.data })
    );
  }

  renderTypes() {
    const { types } = this.state;

    return types.map((type, index) => (
      <css.Option key={index} value={type.tipo}>
        {type.nome}
      </css.Option>
    ));
  }

  renderGroups() {
    const { groups } = this.state;

    return groups.map((group, index) => (
      <css.Option key={index} value={group.tipo}>
        {group.tipo === 1 ? "investir no" : "resgatar o"}
      </css.Option>
    ));
  }

  render() {
    const { isLoading } = this.state;

    return (
      <>
        {isLoading && <Loading />}
        <Container>
          <css.AlertsWrapper>
            <div>
              <h2>Eu quero ser notificado</h2>
            </div>
            <div>
              <span>por </span>
              <select>
                <option>E-mail</option>
                <option>SMS</option>
                <option>E-mail/SMS</option>
              </select>
            </div>
            <div>
              <span>quando eu puder </span>
              <css.Dropdown>{this.renderGroups()}</css.Dropdown>
            </div>
            <div>
              <span>papel </span>
              <css.Dropdown>{this.renderTypes()}</css.Dropdown>
            </div>
            <div>
              <span>se ele </span>
              <select>
                <option>obter uma queda</option>
                <option>apresentar um valor abaixo</option>
                <option>alcançar o valor</option>
                <option>apresentar um valor acima</option>
                <option>obter um crescimento </option>
              </select>
              <span> de R$ </span>
              <input type="text" />
            </div>
          </css.AlertsWrapper>
        </Container>
      </>
    );
  }
}

export default Alerts;
