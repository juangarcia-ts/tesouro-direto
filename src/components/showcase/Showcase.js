import React, { Component } from "react";
import { format } from "date-fns";
import CurrencyFormat from "react-currency-format";
import "./Showcase.scss";

class Showcase extends Component {
  formatStockName(name) {
    return name
      .replace("Tesouro", "")
      .replace("com Juros Semestrais", "c/ Juros");
  }

  renderStocks(type) {
    return type.map((stock, index) => {
      const stockName = this.formatStockName(stock.nome_titulo);

      return (
        <div key={index} className="stock-wrapper">
          <p className="stock-name" key={index}>
            {stockName}
          </p>
          <CurrencyFormat
            className="stock-text"
            displayType={"text"}
            value={stock.preco_unitario}
            thousandSeparator={true}
            prefix={"R$ "}
          />
          <span className="stock-text">{stock.taxa_rendimento}% a.a</span>
          <span className="stock-text">
            {format(stock.data_vencimento, "DD/MM/YYYY")}
          </span>
        </div>
      );
    });
  }

  renderStockTypes() {
    return this.props.investiments.map((type, index) => {
      return (
        <div className="stock-type-wrapper" key={index}>
          <p className="stock-type">{type[0].tipo_titulo.nome}</p>
          {this.renderStocks(type)}
        </div>
      );
    });
  }

  render() {
    return <div className="showcase-wrapper">{this.renderStockTypes()}</div>;
  }
}

export default Showcase;
