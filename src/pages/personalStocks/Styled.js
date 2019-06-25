import styled from "styled-components";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { FaFileExport } from "react-icons/fa";

export const StocksWrapper = styled.div`
  margin: 12.5%;

  @media (max-width: 1649px) {
    margin: 7.5%;
  }
`;

export const Dropdown = styled(Select)`
  display: block !important;
  margin-top: 5px;

  * {
    font-size: 14px !important;
  }
`;

export const Option = styled(MenuItem)`
  font-size: 12px !important;
`;

export const TextInput = styled(TextField)`
  display: block !important;

  * {
    font-size: 14px !important;
  }
`;

export const DatePicker = styled(KeyboardDatePicker).attrs({
  openTo: "month",
  disableFuture: true,
  views: ["year", "month"]
})`
  display: block !important;

  * {
    font-size: 14px !important;
  }
`;

export const Input = styled(TextField).attrs({
  fullWidth: true
})`
  display: block !important;

  input {
    font-size: 14px;
  }
`;

export const StockInfo = styled.div``;

export const Stock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5% 3%;
  border: 1px solid #b6b6b6;
  margin-bottom: 10px;
  background-color: #fff;
`;

export const StockTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 3px;
  display: block;
`;

export const StockText = styled.span`
  font-size: 12px;
`;

export const StockOptions = styled.div`
  float: right;
`;

export const StockLink = styled.span`
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

export const ExportIcon = styled(FaFileExport)`
  display: inline-block;
`;
