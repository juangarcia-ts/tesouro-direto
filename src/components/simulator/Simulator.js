import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import CurrencyFormat from "react-currency-format";
import { simulatorTabs } from "../../utils/data";
import {
  TabList,
  TabItem,
  GridCol,
  PriceRegulator,
  TextWrapper,
  Label,
  Input,
  MonthsText,
  MonthSlider,
  Currency,
  ChartWrapper,
  ChartDivider,
  BottomChart,
  UpperChart,
  ChartInfo,
  PostScriptum
} from "./Styled";

function Simulator() {
  const [initialDeposit, setInitialDeposit] = useState(5250);
  const [monthlyDeposit, setMonthlyDeposit] = useState(300);
  const [months, setMonths] = useState(1);
  const [result, setResult] = useState({});
  const [currentTab, setTab] = useState(0);

  useEffect(() => {
    calculateResult();
  });

  /* Fórmula do Valor Futuro: F = P.(1+i)n + M.[(1+i)n - 1]/i
     F = valor futuro (também chamado VF ou FV)
     P = valor presente (também chamado VA ou PV)
     M = mensalidade (ou outro pagamento periódico, também chamado PGTO ou PMT)
     n = número de períodos (em dias, meses, anos, ..., também chamado NPER)
     i = taxa de juros (normalmente na forma percentual, também chamado TAXA ou RATE) */
  const calculateCompoundInterest = (interestRate, isYearly) => {
    const P = initialDeposit;
    const M = monthlyDeposit;
    const n = months;
    let i = interestRate / 100;

    if (isYearly) {
      i = Math.pow(1 + i, 1 / 12) - 1;
    }

    return P * Math.pow(1 + i, n) + (M * (Math.pow(1 + i, n) - 1)) / i;
  };

  const calculateResult = () => {
    const today = new Date();
    today.setMonth(today.getMonth() + months);
    const withdrawYear = today.getFullYear();

    const totalInvested = initialDeposit + monthlyDeposit * months;
    const savingTotal = calculateCompoundInterest(0.3715);
    const finalSum = calculateCompoundInterest(
      simulatorTabs[currentTab].interestRate,
      true
    );
    const savingRendiments = savingTotal - totalInvested;
    const stockRendiments = finalSum - totalInvested;
    const differencePercentage = Math.round(
      (stockRendiments / savingRendiments - 1) * 100
    );

    const result = {
      totalInvested,
      withdrawYear,
      finalSum,
      savingRendiments,
      stockRendiments,
      differencePercentage
    };

    setResult(result);
  };

  const handleSliderChange = (event, newValue) => {
    setMonths(newValue);
  };

  const handleInitialChange = event => {
    setInitialDeposit(event.value);
  };

  const handleMonthlyChange = event => {
    setMonthlyDeposit(event.value);
  };

  const modifyInitialDeposit = value => {
    const newValue = initialDeposit + value;

    if (newValue >= 0) {
      setInitialDeposit(newValue);
    } else {
      setInitialDeposit(0);
    }
  };

  const modifyMonthlyDeposit = value => {
    const newValue = monthlyDeposit + value;

    if (newValue >= 0) {
      setMonthlyDeposit(newValue);
    } else {
      setMonthlyDeposit(0);
    }
  };

  const renderCharts = () => {
    return (
      <ChartWrapper>
        <ChartDivider />
        <BottomChart />
        <BottomChart right />
        <UpperChart>
          <ChartInfo>
            + {result.differencePercentage}% de rendimentos em relação a
            poupança
          </ChartInfo>
        </UpperChart>
      </ChartWrapper>
    );
  };

  const renderTabs = () => {
    return (
      <TabList>
        {simulatorTabs.map(tab => (
          <TabItem
            key={tab.id}
            active={currentTab === tab.id}
            onClick={() => setTab(tab.id)}
          >
            {tab.name}
          </TabItem>
        ))}
      </TabList>
    );
  };

  return (
    <>
      {renderTabs()}
      <Grid container justify="center" alignItems="center">
        <GridCol>
          <Label>Depósito Inicial</Label>
          <TextWrapper>
            R$
            <CurrencyFormat
              customInput={Input}
              value={initialDeposit}
              thousandSeparator=","
              decimalSeparator="."
              decimalScale={2}
              fixedDecimalScale={true}
              onValueChange={handleInitialChange}
            />
          </TextWrapper>
          <PriceRegulator
            symbol="+"
            onClick={() => modifyInitialDeposit(250)}
          />
          <PriceRegulator
            symbol="-"
            onClick={() => modifyInitialDeposit(-250)}
          />

          <Label>Depósito Mensal</Label>
          <TextWrapper>
            R$
            <CurrencyFormat
              customInput={Input}
              value={monthlyDeposit}
              thousandSeparator=","
              decimalSeparator="."
              decimalScale={2}
              fixedDecimalScale={true}
              onValueChange={handleMonthlyChange}
            />
          </TextWrapper>
          <PriceRegulator
            symbol="+"
            onClick={() => modifyMonthlyDeposit(250)}
          />
          <PriceRegulator
            symbol="-"
            onClick={() => modifyMonthlyDeposit(-250)}
          />

          <Label>Tempo de Investimento</Label>
          <MonthsText>{`${months} ${months > 1 ? "Meses" : "Mês"}`}</MonthsText>
          <MonthSlider value={months} onChange={handleSliderChange} />
        </GridCol>
        <GridCol>
          {renderCharts()}
          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Label>Total Investido</Label>
              <TextWrapper>
                R$ <Currency value={result.totalInvested} />
              </TextWrapper>
            </Col>

            <Col xs={6} sm={6} md={6} lg={6}>
              <Label>Em {result.withdrawYear} você terá</Label>
              <TextWrapper highlight>
                R$ <Currency value={result.finalSum} />
              </TextWrapper>
            </Col>
          </Row>

          <Row>
            <Col xs={6} sm={6} md={6} lg={6}>
              <Label>Investindo na Poupança você renderia</Label>
              <TextWrapper>
                R$ <Currency value={result.savingRendiments} />
              </TextWrapper>
            </Col>

            <Col xs={6} sm={6} md={6} lg={6}>
              <Label>Investindo no Tesouro Direto você renderá</Label>
              <TextWrapper highlight>
                R$ <Currency value={result.stockRendiments} />
              </TextWrapper>
            </Col>
          </Row>
        </GridCol>
      </Grid>
      <PostScriptum>
        Considerações utilizadas na simulação: <br /> 1. Rentabilidade da
        Poupança (04/04/2018): 0,3715% a.m. <br />
        2. Rentabilidade do Tesouro Atual:{" "}
        {simulatorTabs[currentTab].interestRate}% a.a.
      </PostScriptum>
    </>
  );
}

export default Simulator;
