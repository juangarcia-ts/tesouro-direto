import styled from "styled-components";
import InputBase from "@material-ui/core/InputBase";
import Fab from "@material-ui/core/Fab";
import Slider from "@material-ui/lab/Slider";
import CurrencyFormat from "react-currency-format";
import { optionsRange } from "../../utils/data";

export const GridCol = styled.div`
  width: 50%;
  display: inline-block;
`;

export const Label = styled.label`
  display: block;
  color: #363537;
  font-size: 16px;
  font-weight: normal;
  margin-top: 30px;
`;

export const TextWrapper = styled.span`
  color: ${props => (props.highlight ? "#87027b" : "#000")};
  font-weight: ${props => (props.highlight ? "bold" : "normal")};
`;

export const Input = styled(InputBase).attrs({
  inputProps: {
    "aria-label": "naked"
  }
})`
  width: 150px;
  margin-right: 22.5px;

  input {
    font-size: 24px;
    text-align: right;
  }
`;

export const PriceRegulator = styled(Fab).attrs({
  size: "large"
})`
  background-color: #f7f7f7 !important;
  margin-left: 7.5px !important;   
  box-shadow: none !important;
  border: 1px solid #B6B6B6 !important;

  &:hover {
    background-color: #87027b !important;
    border-color: #FFF !important;

    .MuiFab-label {
      color: #FFF;
    }
  }

  .MuiFab-label {
    font-size: 16px;

    &:after {
      content: "${props => props.symbol}";
    }
  }
`;

export const MonthsText = styled.span`
  color: #87027b;
  font-weight: bold;
  font-size: 32px;
  display: block;
`;

export const MonthSlider = styled(Slider).attrs({
  marks: optionsRange,
  step: null,
  min: 1,
  max: 360
})`
  margin-top: 15px;
  max-width: 75%;
  display: block;
  color: #777 !important;

  .MuiSlider-thumb {
    color: #87027b !important;
  }

  .MuiSlider-mark {
    height: 0px;
  }
`;

export const Currency = styled(CurrencyFormat).attrs({
  displayType: "text",
  thousandSeparator: ",",
  decimalSeparator: ".",
  decimalScale: 2,
  fixedDecimalScale: true
})`
  display: inline-block;
  font-size: 24px;
  text-align: right;
  width: 150px;
`;

export const ChartWrapper = styled.div`
  height: 100px;
  position: relative;
`;

export const ChartDivider = styled.div`
  top: calc(50% - 2.5px);
  width: calc(100% - 30px);
  border-top: 2px dashed #b6b6b6;
  position: absolute;
`;

export const BottomChart = styled.div`
  position: absolute;
  bottom: 0;
  height: 50px;
  border: 1px solid #b6b6b6;
  background-color: #d3d3d3;
  width: 40%;
  right: ${props => (props.right ? "30px" : "auto")};
`;

export const UpperChart = styled.div`
  position: absolute;
  bottom: 51px;
  height: 50px;
  border: 1px solid #b6b6b6;
  background-color: #87027b;
  width: 40%;
  right: 30px;
`;

export const ChartInfo = styled.small`
  position: absolute;
  text-align: right;
  top: -40px;
  width: 80%;
  height: 40px;
  font-size: 10px;
  right: 0;
  font-weight: bold;
`;

export const TabList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const TabItem = styled.li`
  cursor: pointer;
  font-size: ${props => (props.active ? "22px" : "20px")};
  font-weight: ${props => (props.active ? "bold" : "normal")};
  text-align: center;
  flex: 1;
  border-bottom: 5px solid ${props => (props.active ? "#87027b" : "#dcdcdc")};
  padding-bottom: 10px;

  &:first-child {
    border-radius: 0 0 0 5px;
  }

  &:last-child {
    border-radius: 0 0 5px 0;
  }
`;

export const PostScriptum = styled.small`
  display: block;
  margin-top: 50px;
  float: right;
  text-align: right;
  margin-right: 30px;
`;
