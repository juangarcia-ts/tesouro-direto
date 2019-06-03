import styled from "styled-components";
import { Form } from "react-bootstrap";

export const AlertsWrapper = styled.div`
  margin: 15%;

  @media (max-width: 1649px) {
    margin: 10%;
  }
`;

export const Title = styled.span`
  font-size: 42px;
  font-weight: bold;
  display: block;
  margin-bottom: 1%;
`;

export const Label = styled.span`
  font-size: 26px;
`;

export const Section = styled.div`  
  padding-left: 3%;
  display: flex;
  align-items: center;
`;

export const Dropdown = styled.select.attrs({ className:"form-control" })`
  flex: 1;
  margin-left: 10px;
  font-size: 18px;
  padding: 0;
`;

export const Option = styled.option`
  font-size: 14px;
`;

export const Input = styled(Form.Control).attrs({ type: "email"})`
  flex: 1;
  margin-left: 10px;
`;

export const Divider = styled.div`
  margin: 3% 0;
`;

export const SubmitButton = styled.button`
  outline: 0;
  display: block;
  border-radius: 10px;
  padding: 0.75rem 2rem;
  float: right;
  border: none;
  color: #fff;
  cursor: pointer;
  background-image: linear-gradient(90deg, #15787d 0%, #66a6ff 100%);

  &:hover,
  &:focus,
  &:active {
    background-image: linear-gradient(-90deg, #15787d 0%, #66a6ff 100%);    
  }
`;

