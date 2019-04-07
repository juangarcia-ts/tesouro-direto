import React, { Component } from "react";
import { format } from "date-fns";
import CurrencyFormat from "react-currency-format";
import { FaHistory } from "react-icons/fa";
import { CrawlerService } from "./../../services";
import { PriceHistory } from "./../";
import "./PriceTable.scss";

class PriceTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGroup: {
        value: 1,
        name: "Investimento"
      },
      currentType: {
        value: 1,
        name: "Indexados ao IPCA"
      },
      history: {
        currentSelected: null,
        data: []
      }
    };
    this.closeHistory = this.closeHistory.bind(this);
  }

  formatHistoryData(data) {
    return data.map(d => {
      return {
        date: format(d._id, "YYYY-MM-DD"),
        price: d.preco
      };
    });
  }

  closeHistory() {
    const { history } = this.state;
    history.currentSelected = null;

    this.setState({ history });
  }

  getHistory(stockName, typeValue) {
    const params = {
      nome: stockName,
      tipo: typeValue
    };

    CrawlerService.obterHistorico(params).then(response => {
      const history = {
        currentSelected: typeValue,
        data: this.formatHistoryData(response.data)
      };

      this.setState({ history });
    });
  }

  formatStockName(name) {
    return name
      .replace("Tesouro ", "")
      .replace("com Juros Semestrais", "c/ Juros");
  }

  selectValue(li, dropdownIndex) {
    if (dropdownIndex === 1) {
      const firstType = this.props.config.listaTipos.filter(
        vw => vw.grupo_tipo === li.tipo
      )[0];

      const currentGroup = {
        value: li.tipo,
        name: li.nome
      };

      const currentType = {
        value: firstType.tipo,
        name: firstType.nome
      };

      this.setState({ currentGroup, currentType });
    } else {
      const currentType = {
        value: li.tipo,
        name: li.nome
      };

      this.setState({ currentType });
    }
  }

  renderDropdown(ul, dropdownIndex) {
    const { currentGroup, currentType } = this.state;

    return ul.map((li, index) => {
      if (dropdownIndex === 2 && li.grupo_tipo !== currentGroup.value) {
        return null;
      }

      return (
        <li
          key={index}
          className={
            dropdownIndex === 1
              ? currentGroup.value === li.tipo
                ? "active"
                : "not-active"
              : currentType.value === li.tipo
              ? "active"
              : "not-active"
          }
          onClick={() => this.selectValue(li, dropdownIndex)}
        >
          {li.nome}
        </li>
      );
    });
  }

  renderOptions(groupName, typeName) {
    const { listaGrupos, listaTipos } = this.props.config;

    return (
      <div className="options">
        <div className="dropdown">
          <button
            className="btn btn-default dropdown-toggle"
            type="button"
            id="typeList"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {groupName}
            <span className="caret" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="typeList">
            {this.renderDropdown(listaGrupos, 1)}
          </ul>
        </div>
        <div className="divider">
          <span>></span>
        </div>
        <div className="dropdown">
          <button
            className="btn btn-default dropdown-toggle"
            type="button"
            id="groupList"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {typeName}
            <span className="caret" />
          </button>
          <ul className="dropdown-menu" aria-labelledby="groupList">
            {this.renderDropdown(listaTipos, 2)}
          </ul>
        </div>
      </div>
    );
  }

  renderStocks(dataSet, groupValue, typeValue) {
    return dataSet.map((stock, index) => {
      const stockName = this.formatStockName(stock.nome_titulo);

      return (
        <tr key={index}>
          <td>{stockName}</td>
          <td>
            <CurrencyFormat
              displayType={"text"}
              value={stock.preco_unitario}
              thousandSeparator={true}
              prefix={"R$ "}
            />
          </td>
          <td>{`${stock.taxa_rendimento.toFixed(2)}% a.a`}</td>
          {groupValue === 1 && (
            <td>
              <CurrencyFormat
                displayType={"text"}
                value={stock.valor_minimo}
                thousandSeparator={true}
                prefix={"R$ "}
              />
            </td>
          )}
          <td>{format(stock.data_vencimento, "DD/MM/YYYY")}</td>
          <td>
            <FaHistory
              className="history-icon"
              onClick={() => this.getHistory(stock.nome_titulo, typeValue)}
            />
          </td>
        </tr>
      );
    });
  }

  renderTables(list) {
    const { currentGroup, currentType } = this.state;

    return Object.keys(list).map((type, index) => {
      const { tipo_titulo } = list[type][0];
      const { nome: typeName, tipo: typeValue } = tipo_titulo;
      const { nome: groupName, tipo: groupValue } = tipo_titulo.grupo_titulo;

      if (
        currentGroup.value !== groupValue ||
        currentType.value !== typeValue
      ) {
        return null;
      }

      return (
        <div key={index}>
          {this.renderOptions(groupName, typeName)}
          <table className="table text-left">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Preço Unitário</th>
                <th>Taxa de Rendimento</th>
                {groupValue === 1 && <th>Valor mínimo</th>}
                <th>Data de Vencimento</th>
                <th>Histórico</th>
              </tr>
            </thead>
            <tbody>
              {this.renderStocks(list[type], groupValue, typeValue)}
            </tbody>
          </table>
        </div>
      );
    });
  }

  render() {
    const { listaResgate, listaInvestimento } = this.props.config;
    const { dataExtracao } = this.props.config;
    const { currentGroup, currentType, history } = this.state;

    return (
      <div className="price-table">
        {history.currentSelected && (
          <PriceHistory
            data={history.data}
            groupName={currentGroup.name}
            typeName={currentType.name}
            closeCallback={this.closeHistory}
          />
        )}
        {!history.currentSelected && currentGroup.value === 1
          ? this.renderTables(listaInvestimento)
          : this.renderTables(listaResgate)}
        <p>Última atualização: {format(dataExtracao, "DD/MM/YYYY HH:mm")} </p>
      </div>
    );
  }
}

export default PriceTable;
