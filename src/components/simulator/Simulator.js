import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Grid from "@material-ui/core/Grid";
import CurrencyFormat from "react-currency-format";
import { simulatorTabs } from "../../utils/data";
import { calculateCompoundInterest } from "../../utils/math";
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

function Simulator(props) {
  const [initialDeposit, setInitialDeposit] = useState(
    props.defaultInitialDeposit || 5250
  );
  const [monthlyDeposit, setMonthlyDeposit] = useState(
    props.defaultMonthlyDeposit || 300
  );
  const [months, setMonths] = useState(props.defaultMonths || 24);
  const [result, setResult] = useState({});
  const [currentTab, setTab] = useState(0);

  useEffect(() => {
    calculateResult();
  });

  const calculateResult = () => {
    const today = props.readonly ? new Date(props.initialDate) : new Date();
    today.setMonth(today.getMonth() + months);
    const withdrawYear = today.getFullYear();

    const interestRate = props.readonly
      ? props.defaultInterestRate
      : simulatorTabs[currentTab].interestRate;

    const totalInvested = initialDeposit + monthlyDeposit * months;
    const savingTotal = calculateCompoundInterest(
      initialDeposit,
      monthlyDeposit,
      months,
      0.3715
    );
    const finalSum = calculateCompoundInterest(
      initialDeposit,
      monthlyDeposit,
      months,
      interestRate,
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
    setInitialDeposit(event.floatValue);
  };

  const handleMonthlyChange = event => {
    setMonthlyDeposit(event.floatValue);
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
    const isPositive = result.differencePercentage > 0;

    return (
      <ChartWrapper>
        <ChartDivider />
        <BottomChart />
        <BottomChart right />
        <UpperChart isPositive={isPositive}>
          <ChartInfo>
            {isPositive && "+"} {result.differencePercentage}% de rendimentos em
            relação a poupança
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
      {!props.readonly && renderTabs()}
      <Grid
        container
        justify={props.readonly ? "flex-start" : "center"}
        alignItems="center"
      >
        {!props.readonly && (
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
              symbol="-"
              onClick={() => modifyInitialDeposit(-250)}
            />
            <PriceRegulator
              symbol="+"
              onClick={() => modifyInitialDeposit(250)}
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
              symbol="-"
              onClick={() => modifyMonthlyDeposit(-250)}
            />
            <PriceRegulator
              symbol="+"
              onClick={() => modifyMonthlyDeposit(250)}
            />

            <Label>Tempo de Investimento</Label>
            <MonthsText>{`${months} ${
              months > 1 ? "Meses" : "Mês"
            }`}</MonthsText>
            <MonthSlider value={months} onChange={handleSliderChange} />
          </GridCol>
        )}
        <GridCol fullWidth={props.readonly}>
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
        {!props.readonly &&
          `2. Rentabilidade do Tesouro Atual: ${simulatorTabs[currentTab].interestRate}
        % a.a.`}
      </PostScriptum>
    </>
  );
}

export default Simulator;
