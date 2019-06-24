import React, { Component } from "react";
import { PDFExport } from "@progress/kendo-react-pdf";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";
import CurrencyFormat from "react-currency-format";
import { calculateCompoundInterest } from "../../utils/math";
import * as css from "./Styled";
import { Simulator } from "./..";
import "./font.css";

class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      versusArray: []
    };
  }

  componentDidMount() {
    const { valor, taxa_rendimento } = this.props.data;
    const months = [3, 6, 12, 60, 120, 240];
    const versusArray = [];

    for (let i = 0; i < months.length; i++) {
      const month = months[i];

      const saving = calculateCompoundInterest(valor, 0, month, 0.3715);
      const stock = calculateCompoundInterest(
        valor,
        0,
        month,
        taxa_rendimento,
        true
      );

      versusArray.push({ month, saving, stock });
    }

    this.setState({ versusArray });
  }

  render() {
    const { data: stock } = this.props;

    let resumeObj = (
      <PDFExport
        paperSize={"Letter"}
        fileName={`${stock.descricao}.pdf`}
        ref={r => (this.resume = r)}
      >
        <css.Paper>
          <css.PaperBorder>
            <>
              <css.Header>
                <Grid container justify="space-between" alignItems="center">
                  <css.LeftHeader>
                    {format(new Date(), "dd/mm/yyyy")}
                  </css.LeftHeader>
                  <css.Title>Meu Tesouro</css.Title>
                  <css.RightHeader>bit.ly/meu-tesouro</css.RightHeader>
                </Grid>
              </css.Header>

              <css.Body>
                <css.SectionTitle>{stock.descricao}</css.SectionTitle>
                <css.Text>Nome do Título: {stock.nome_titulo}</css.Text>
                <css.Text>
                  Data de aquisição:{" "}
                  {format(new Date(stock.data_aquisicao), "MM/yyyy")}
                </css.Text>
                <css.Text>Valor investido: R$ {stock.valor} </css.Text>
                <css.Text>
                  Taxa de rendimento: {stock.taxa_rendimento} % a.a
                </css.Text>
                <css.Text>Observação: {stock.observacao}</css.Text>

                <css.SectionTitle>Poupança x Tesouro Direto</css.SectionTitle>
                {this.state.versusArray.map(obj => (
                  <css.VersusWrapper key={obj.month}>
                    <css.Span>{obj.month} meses: </css.Span>
                    <CurrencyFormat
                      renderText={e => <css.Span>{e}</css.Span>}
                      value={obj.saving}
                      displayType="text"
                      thousandSeparator=","
                      decimalSeparator="."
                      decimalScale={2}
                      fixedDecimalScale
                      prefix={" R$ "}
                    />
                    <css.Span> x </css.Span>
                    <CurrencyFormat
                      renderText={e => (
                        <css.HighlightedSpan>{e}</css.HighlightedSpan>
                      )}
                      value={obj.stock}
                      displayType="text"
                      thousandSeparator=","
                      decimalSeparator="."
                      decimalScale={2}
                      fixedDecimalScale
                      prefix={" R$ "}
                    />
                  </css.VersusWrapper>
                ))}
                <css.SectionTitle>Rendimento em 360 meses</css.SectionTitle>
                <css.SimulatorWrapper>
                  <Simulator
                    readonly
                    initialDate={stock.data_aquisicao}
                    defaultInitialDeposit={stock.valor}
                    defaultMonthlyDeposit={0}
                    defaultMonths={360}
                    defaultInterestRate={stock.taxa_rendimento}
                  />
                </css.SimulatorWrapper>
              </css.Body>
            </>
          </css.PaperBorder>
        </css.Paper>
      </PDFExport>
    );

    return (
      <css.ReportWrapper className="embedded-font">
        <>
          {!this.canvLoaded && (
            <canvas ref="canvas" style={{ display: "none" }}></canvas>
          )}
          <css.FadeIn>
            <>
              <div
                style={{
                  margin: "auto",
                  textAlign: "center",
                  marginBottom: 10
                }}
              >
                <div
                  onClick={() => this.resume.save()}
                  style={{
                    cursor: "pointer",
                    margin: "auto",
                    textDecoration: "none",
                    color: "#005696",
                    minWidth: "60px",
                    textAlign: "center"
                  }}
                >
                  Download PDF
                </div>
              </div>
              {resumeObj}
            </>
          </css.FadeIn>
        </>
      </css.ReportWrapper>
    );
  }
}

export default Report;
