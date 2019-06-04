import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import CurrencyFormat from 'react-currency-format';
import { getToken } from '../../utils/token';
import { CrawlerService, GenericService, AlertService } from './../../services';
import { Loading } from '../../components';
import * as css from './Styled';

class Alerts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      activeFilters: [],
      alerts: [],
      stocks: [],
      groups: [],
      selectedNotification: '',
      selectedGroup: '',
      selectedStock: '',
      selectedTarget: '',
      targetValue: ''
    };
  }

  componentDidMount() {
    const { user } = getToken();

    const promises = [
      AlertService.obterAlertas(user.uid),
      GenericService.listarGrupos(),
      CrawlerService.obterTitulosAtualizados()
    ]

    Promise.all(promises).then(responses => {
      this.setState({ isLoading: false, alerts: responses[0].data, groups: responses[1].data, stocks: responses[2].data.lista_titulos })
    });
  }

  addAlert() {
    const { selectedNotification, selectedStock, selectedTarget, targetValue } = this.state;
    const { user } = getToken();

    const stockProperties = selectedStock.split('|');

    const query = {
      firebase_id: user.uid,
      grupo_titulo: stockProperties[0],
      tipo_titulo: stockProperties[1],
      nome_titulo: stockProperties[2],
      tipo_notificacao: selectedNotification,
      situacao: selectedTarget,
      valor: targetValue
    };

    AlertService.adicionarAlerta(query).then(response => {
      if (response.data) {
        this.setState({ isLoading: true });

        AlertService.obterAlertas(user.uid).then(response => this.setState({ isLoading: false, isAdding: false, alerts: response.data }));
      }
    });
  }

  editAlert(alert) {    
    // TO DO
  }

  deleteAlert(alertId) {    
    const { user } = getToken();

    this.setState({ isLoading: true });

    AlertService.removerAlerta(alertId).then(() => {
      AlertService.obterAlertas(user.uid).then(response => this.setState({ isLoading: false, alerts: response.data }))
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
        {group.tipo === 1 ? 'investir no' : 'resgatar o'}
      </css.Option>
    ));
  }

  renderStocks() {
    const { stocks, selectedGroup } = this.state;
    const stocksByGroup = stocks.filter(x => x.tipo_titulo.grupo_titulo.tipo === selectedGroup);

    return stocksByGroup.map((stock, index) => {
      const { nome_titulo, tipo_titulo } = stock;
      const { tipo, grupo_titulo } = tipo_titulo;
      const { tipo: grupo } = grupo_titulo;

      return (
        <css.Option key={index} value={`${grupo}|${tipo}|${nome_titulo}`}>
          {stock.nome_titulo.replace('Tesouro', '')}
        </css.Option>
      )
    });
  }

  renderForm() {
    const { selectedNotification, selectedGroup, selectedStock, selectedTarget, targetValue } = this.state;

    return (
      <>
        <css.Section>
          <css.Label>por </css.Label>
          <css.Dropdown value={selectedNotification} onChange={(e) => this.setState({ selectedNotification: e.target.value })}>
            <css.Option value=''>...</css.Option>
            <css.Option value='EMAIL'>e-mail</css.Option>
            <css.Option value='SMS'>SMS</css.Option>
          </css.Dropdown>
        </css.Section>

        {selectedNotification && (
          <css.Section>
            <css.Label>quando eu puder </css.Label>
            <css.Dropdown value={selectedGroup} onChange={(e) => this.setState({ selectedGroup: parseInt(e.target.value) })}>
              <css.Option value=''>...</css.Option>
              {this.renderGroups()}
            </css.Dropdown>
          </css.Section>
        )}

        {selectedGroup && (
          <css.Section>
            <css.Label>papel </css.Label>
            <css.Dropdown value={selectedStock} onChange={(e) => this.setState({ selectedStock: e.target.value })}>
              <css.Option value=''>...</css.Option>
              {this.renderStocks()}
            </css.Dropdown>
          </css.Section>
        )}

        {selectedStock && (
          <css.Section>
            <css.Label>se ele </css.Label>
            <css.Dropdown value={selectedTarget} onChange={(e) => this.setState({ selectedTarget: e.target.value })}>
              <css.Option value=''>...</css.Option>
              <css.Option value='-1'>apresentar um valor abaixo</css.Option>
              <css.Option value='0'>alcançar o valor</css.Option>
              <css.Option value='1'>apresentar um valor acima</css.Option>
            </css.Dropdown>
          </css.Section>
        )}

        {selectedTarget && (
          <css.Section>
            <css.Label> de R$ </css.Label>
            <CurrencyFormat
              customInput={css.Input}
              value={targetValue}
              thousandSeparator={','}
              decimalSeparator={'.'}
              decimalScale={2}
              fixedDecimalScale={true}
              prefix={'R$ '}
              onValueChange={(e) => this.setState({ targetValue: e.value })} />
          </css.Section>
        )}

        {targetValue && (
          <css.FadeIn>
            <css.SubmitButton onClick={() => this.addAlert()}>Confirmar</css.SubmitButton>
          </css.FadeIn>
        )}
      </>
    );
  }

  renderAlerts() {
    const { alerts, activeFilters } = this.state;

    const alertsToRender = activeFilters.length === 0 ? alerts : alerts.filter(x => activeFilters.includes(x.tipo_notificacao));

    return alertsToRender.map((alert, index) => {
      const { tipo_notificacao, nome_titulo, situacao, valor } = alert;

      return (
        <css.Alert key={index}>
          {tipo_notificacao === 'SMS' ? <css.SMSIcon /> : <css.EmailIcon />}
          <css.AlertText>{` | Notificação por ${tipo_notificacao === 'SMS' ? 'SMS' : 'e-mail'} se o ${nome_titulo} ${situacao === 0 ? 'alcançar ' : (situacao === 1 ? 'ultrapassar ' : 'ficar abaixo d')}o valor de `}</css.AlertText>
          <CurrencyFormat
            displayType={"text"}
            value={valor}
            thousandSeparator={','}
            decimalSeparator={'.'}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={"R$ "}
          />         
          <span style={{float: 'right'}} onClick={() => this.deleteAlert(alert.id)}> | Excluir </span>
          <span style={{float: 'right'}} onClick={() => this.editAlert(alert)}> Editar</span>
        </css.Alert>
      );
    })
  }

  renderFilters() {
    const { activeFilters } = this.state;

    const isEmailActive = activeFilters.includes('EMAIL');
    const isSMSActive = activeFilters.includes('SMS');

    return (
      <>
        <css.Text>Filtrar por: </css.Text>
        <css.FilterBadge active={isEmailActive} onClick={() => this.toggleFilter('EMAIL')}>
           {`${isEmailActive ? 'x ' : ''}E-mail`}           
        </css.FilterBadge>
        <css.FilterBadge active={isSMSActive} onClick={() => this.toggleFilter('SMS')}>
           {`${isSMSActive ? 'x ' : ''}SMS`}  
        </css.FilterBadge>
      </>
    );
  }

  render() {
    const { isAdding, isLoading, alerts } = this.state;

    return (
      <>
        {isLoading && <Loading />}
        <Container>
          <css.AlertsWrapper>
            <>
              <css.CoverImage /> 
              {isAdding ? (
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
                      <css.SubmitButton onClick={() => this.setState({isAdding: true})}>Criar novo alerta</css.SubmitButton>                  
                    </css.CustomCol>                               
                  </css.CustomRow>                            
                  {alerts.length > 0 ? 
                    this.renderAlerts() 
                  : (
                    <css.WarningText>Não há nenhum alerta cadastrado até o momento</css.WarningText>
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
