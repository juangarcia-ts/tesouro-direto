import React, { Component } from "react";
import { Container } from "react-bootstrap";
import CurrencyFormat from "react-currency-format";
import { getToken, setUser } from "../../utils/token";
import {
  CrawlerService,
  UserService,
  GenericService,
  AlertService
} from "./../../services";
import { Loading, Prompt } from "../../components";
import { TelInput } from "../settings/Styled";
import { Input } from "../auth/Styled";
import * as css from "./Styled";

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPromptVisible: false,
      activeFilters: [],
      alerts: [],
      stocks: [],
      groups: [],
      currentAlert: null,
      selectedNotification: "",
      selectedGroup: "",
      selectedStock: "",
      selectedTarget: "",
      targetValue: "",
      isFormVisible: "",
      userPhoneNumber: ""
    };
  }

  componentDidMount() {
    const { user } = getToken();

    const promises = [
      AlertService.obterAlertas(user.uid),
      GenericService.listarGrupos(),
      CrawlerService.obterTitulosAtualizados()
    ];

    Promise.all(promises).then(responses => {
      this.setState({
        isLoading: false,
        alerts: responses[0].data,
        groups: responses[1].data,
        stocks: responses[2].data.lista_titulos
      });
    });
  }

  showForm(alert) {
    if (alert) {
      const {
        tipo_notificacao,
        grupo_titulo,
        tipo_titulo,
        nome_titulo,
        situacao,
        valor
      } = alert;

      this.setState({
        isFormVisible: true,
        currentAlert: alert,
        selectedNotification: tipo_notificacao,
        selectedGroup: grupo_titulo,
        selectedStock: `${grupo_titulo}|${tipo_titulo}|${nome_titulo}`,
        selectedTarget: situacao,
        targetValue: valor
      });
    }

    this.setState({ isFormVisible: true });
  }

  handleSubmit(alert) {
    const { user } = getToken();
    const { selectedNotification } = this.state;

    if (selectedNotification === "SMS" && !user.PhoneNumber) {
      return this.setState({ isPromptVisible: true });
    }

    if (alert) {
      this.editAlert(user.uid, alert);
    } else {
      this.addAlert(user.uid);
    }
  }

  updatePhoneNumber() {
    const { user } = getToken();
    const { userPhoneNumber } = this.state;

    const query = {
      firebase_id: user.uid,
      foto: user.photoURL,
      telefone: userPhoneNumber || ""
    };

    this.setState({ isLoading: true });

    UserService.editarUsuario(query)
      .then(response => {
        const { telefone } = response.data;

        user.phoneNumber = telefone;

        setUser(user);
      })
      .finally(() =>
        this.setState({ isLoading: false, isPromptVisible: false })
      );
  }

  addAlert(userId) {
    const {
      selectedNotification,
      selectedStock,
      selectedTarget,
      targetValue
    } = this.state;

    const stockProperties = selectedStock.split("|");

    const query = {
      firebase_id: userId,
      grupo_titulo: stockProperties[0],
      tipo_titulo: stockProperties[1],
      nome_titulo: stockProperties[2],
      tipo_notificacao: selectedNotification,
      situacao: selectedTarget,
      valor: targetValue
    };

    AlertService.adicionarAlerta(query).then(response => {
      if (response.data) {
        AlertService.obterAlertas(userId).then(response =>
          this.setState({
            isLoading: false,
            isFormVisible: false,
            alerts: response.data
          })
        );
        this.clearForm();
      } else {
        this.setState({ isLoading: false });
      }
    });
  }

  editAlert(userId, alert) {
    AlertService.editarAlerta(alert).then(response => {
      if (response.data) {
        AlertService.obterAlertas(userId).then(response =>
          this.setState({ alerts: response.data })
        );
        this.clearForm();
      } else {
        this.setState({ isLoading: false });
      }
    });
  }

  deleteAlert(alertId) {
    const { user } = getToken();

    this.setState({ isLoading: true });

    AlertService.removerAlerta(alertId).then(() => {
      AlertService.obterAlertas(user.uid).then(response =>
        this.setState({ isLoading: false, alerts: response.data })
      );
    });
  }

  sendNotification(alertId, notificationType) {
    const { user } = getToken();

    const params = {
      alert_id: alertId,
      contact: notificationType === "SMS" ? user.phoneNumber : user.email
    };

    this.setState({ isLoading: true });

    AlertService.enviarAlerta(params).finally(() =>
      this.setState({ isLoading: false })
    );
  }

  clearForm() {
    this.setState({
      currentAlert: null,
      isFormVisible: false,
      isLoading: false,
      selectedNotification: "",
      selectedGroup: "",
      selectedStock: "",
      selectedTarget: "",
      targetValue: "",
      userPhoneNumber: ""
    });
  }

  toggleFilter(filter) {
    const { activeFilters } = this.state;

    if (activeFilters.includes(filter)) {
      const filters = activeFilters.filter(x => x !== filter);

      this.setState({ activeFilters: filters });
    } else {
      this.setState({ activeFilters: [...activeFilters, filter] });
    }
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
    const stocksByGroup = stocks.filter(
      x => x.tipo_titulo.grupo_titulo.tipo === selectedGroup
    );

    return stocksByGroup.map((stock, index) => {
      const { nome_titulo, tipo_titulo } = stock;
      const { tipo, grupo_titulo } = tipo_titulo;
      const { tipo: grupo } = grupo_titulo;

      return (
        <css.Option key={index} value={`${grupo}|${tipo}|${nome_titulo}`}>
          {stock.nome_titulo.replace("Tesouro", "")}
        </css.Option>
      );
    });
  }

  renderForm() {
    const {
      currentAlert,
      selectedNotification,
      selectedGroup,
      selectedStock,
      selectedTarget,
      targetValue
    } = this.state;

    return (
      <>
        <css.Section>
          <css.Label>por </css.Label>
          <css.Dropdown
            value={selectedNotification}
            onChange={e =>
              this.setState({ selectedNotification: e.target.value })
            }
          >
            <css.Option value="">...</css.Option>
            <css.Option value="EMAIL">e-mail</css.Option>
            <css.Option value="SMS">SMS</css.Option>
          </css.Dropdown>
        </css.Section>

        {selectedNotification && (
          <css.Section>
            <css.Label>quando eu puder </css.Label>
            <css.Dropdown
              value={selectedGroup}
              onChange={e =>
                this.setState({ selectedGroup: parseInt(e.target.value) })
              }
            >
              <css.Option value="">...</css.Option>
              {this.renderGroups()}
            </css.Dropdown>
          </css.Section>
        )}

        {selectedGroup && (
          <css.Section>
            <css.Label>papel </css.Label>
            <css.Dropdown
              value={selectedStock}
              onChange={e => this.setState({ selectedStock: e.target.value })}
            >
              <css.Option value="">...</css.Option>
              {this.renderStocks()}
            </css.Dropdown>
          </css.Section>
        )}

        {selectedStock && (
          <css.Section>
            <css.Label>se ele </css.Label>
            <css.Dropdown
              value={selectedTarget}
              onChange={e => this.setState({ selectedTarget: e.target.value })}
            >
              <css.Option value="">...</css.Option>
              <css.Option value="-1">apresentar um valor abaixo</css.Option>
              <css.Option value="0">alcançar o valor</css.Option>
              <css.Option value="1">apresentar um valor acima</css.Option>
            </css.Dropdown>
          </css.Section>
        )}

        {(selectedTarget || selectedTarget === 0) && (
          <css.Section>
            <css.Label> de R$ </css.Label>
            <CurrencyFormat
              customInput={css.Input}
              value={targetValue}
              thousandSeparator={","}
              decimalSeparator={"."}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={"R$ "}
              onValueChange={e => this.setState({ targetValue: e.value })}
            />
          </css.Section>
        )}

        {targetValue && (
          <css.FadeIn>
            <css.SubmitButton onClick={() => this.handleSubmit(currentAlert)}>
              {currentAlert ? "Editar" : "Adicionar"}
            </css.SubmitButton>
            <css.SubmitButton onClick={() => this.clearForm()}>
              Cancelar
            </css.SubmitButton>
          </css.FadeIn>
        )}
      </>
    );
  }

  renderAlerts() {
    const { alerts, activeFilters } = this.state;

    const alertsToRender =
      activeFilters.length === 0
        ? alerts
        : alerts.filter(x => activeFilters.includes(x.tipo_notificacao));

    return alertsToRender.map((alert, index) => {
      const { id, tipo_notificacao, nome_titulo, situacao, valor } = alert;

      return (
        <css.Alert key={index}>
          {tipo_notificacao === "SMS" ? <css.SMSIcon /> : <css.EmailIcon />}
          <css.AlertText>{` | ${nome_titulo} ${
            situacao === 0 ? "=" : situacao === 1 ? ">" : "<"
          } `}</css.AlertText>
          <CurrencyFormat
            displayType={"text"}
            value={valor}
            thousandSeparator={","}
            decimalSeparator={"."}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"R$ "}
          />
          <css.AlertOptions>
            <css.AlertLink
              onClick={() => this.sendNotification(id, tipo_notificacao)}
            >
              {" "}
              Testar Envio |{" "}
            </css.AlertLink>
            <css.AlertLink onClick={() => this.showForm(alert)}>
              {" "}
              Editar{" "}
            </css.AlertLink>
            <css.AlertLink onClick={() => this.deleteAlert(id)}>
              {" "}
              | Excluir{" "}
            </css.AlertLink>
          </css.AlertOptions>
        </css.Alert>
      );
    });
  }

  renderFilters() {
    const { activeFilters } = this.state;

    const isEmailActive = activeFilters.includes("EMAIL");
    const isSMSActive = activeFilters.includes("SMS");

    return (
      <>
        <css.Text>Filtrar por: </css.Text>
        <css.FilterBadge
          active={isEmailActive}
          onClick={() => this.toggleFilter("EMAIL")}
        >
          {`${isEmailActive ? "x " : ""}E-mail`}
        </css.FilterBadge>
        <css.FilterBadge
          active={isSMSActive}
          onClick={() => this.toggleFilter("SMS")}
        >
          {`${isSMSActive ? "x " : ""}SMS`}
        </css.FilterBadge>
      </>
    );
  }

  render() {
    const {
      isFormVisible,
      userPhoneNumber,
      isPromptVisible,
      isLoading,
      alerts
    } = this.state;

    return (
      <>
        {isLoading && <Loading />}
        <Container>
          <css.AlertsWrapper>
            <>
              <Prompt
                width="400"
                height="320"
                isVisible={isPromptVisible}
                title={"Não há um celular cadastrado"}
                onCancel={() => this.setState({ isPromptVisible: false })}
                onConfirm={() => this.updatePhoneNumber()}
              >
                <>
                  <css.Label>
                    Entre com seu telefone celular para ser notificado
                  </css.Label>
                  <TelInput
                    country="BR"
                    inputComponent={Input}
                    value={userPhoneNumber}
                    onChange={userPhoneNumber => {
                      this.setState({ userPhoneNumber });
                    }}
                  />
                </>
              </Prompt>
              <css.CoverImage />
              {isFormVisible ? (
                <>
                  <css.Title>Eu quero ser notificado...</css.Title>
                  {this.renderForm()}
                </>
              ) : (
                <>
                  <css.CustomRow>
                    <css.CustomCol>
                      <css.Title>Meus alertas</css.Title>
                      {alerts.length > 0 && this.renderFilters()}
                    </css.CustomCol>
                    <css.CustomCol>
                      <css.SubmitButton onClick={() => this.showForm()}>
                        Criar novo alerta
                      </css.SubmitButton>
                    </css.CustomCol>
                  </css.CustomRow>
                  {alerts.length > 0
                    ? this.renderAlerts()
                    : !isLoading && (
                        <css.WarningText>
                          Não há nenhum alerta cadastrado até o momento
                        </css.WarningText>
                      )}
                </>
              )}
            </>
          </css.AlertsWrapper>
        </Container>
      </>
    );
  }
}

export default Alerts;
