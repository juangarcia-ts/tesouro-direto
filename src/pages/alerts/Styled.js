import styled, { keyframes } from "styled-components";
import { FaEnvelope, FaMobileAlt } from "react-icons/fa";
import { Form, Badge } from "react-bootstrap";
import { fadeIn  } from 'react-animations';
import AlertsImage from "../../media/images/alerts-image.jpeg";

const fadeInAnimation = keyframes`${fadeIn }`;

export const Text = styled.span``;

export const AlertsWrapper = styled.div`
  margin: 12.5%;

  @media (max-width: 1649px) {
    margin: 7.5%;
  }
`;

export const CoverImage = styled.div`
  background-image: url(${AlertsImage});
  background-size: cover;
  background-position: 50% 30%;
  height: 250px;
  width: 100%;
  margin: 3% 0; 
`;

export const Title = styled.span`
  font-size: 36px;
  font-weight: bold;
  display: block;
  margin-bottom: 1%;
  white-space: nowrap;
`;

export const Label = styled.span`
  font-size: 16px;
`;

export const FadeIn = styled.div`
  animation: 2s ${fadeInAnimation};
`;

export const Section = styled(FadeIn)`   
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

export const Dropdown = styled.select.attrs({ className:"form-control" })`
  flex: 1;
  margin-left: 10px;
  font-size: 14px;
  padding: 0;
`;

export const Option = styled.option`
  font-size: 12px;
`;

export const Input = styled(Form.Control).attrs({ type: "email"})`
  flex: 1;
  margin-left: 10px;
  padding: 0;
  font-size: 14px;
  color: #555
`;

export const SubmitButton = styled.button`
  outline: 0;
  display: block;
  border-radius: 10px;
  margin-top: 3%;
  margin-left: 1.5%;
  font-size: 16px;
  padding: 0.75rem 2.5rem;
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

export const CustomRow = styled.div`
  display: flex;
  margin-bottom: 3%;
`;

export const CustomCol = styled.div`
  flex: 1;
`;

export const Alert = styled.div`
  display: block;
  padding: 10px 0;
  border-bottom: 1px solid #999;

  &:last-child {
    border-bottom: none;
  }
`;

export const SMSIcon = styled(FaMobileAlt)`
  display: inline-block;
  margin-right: 5px;
`;

export const EmailIcon = styled(FaEnvelope)`
  display: inline-block;
  margin-right: 5px;
`;

export const AlertText = styled.span`
  font-size: 14px;
`;

export const AlertOptions = styled.div`
  float: right;
`;

export const AlertLink = styled.span`
  cursor: pointer;

  &:hover {
    font-weight: bold;
  }
`;

export const WarningText = styled.span`
  font-size: 20px;
`;

export const FilterBadge = styled(Badge)`
  margin-left: 1%;
  padding: 0.5rem 1.5rem;
  cursor: pointer;
  background-color: #FFF;
  font-weight: ${props => props.active ? 'bold' : 'normal'}
  opacity: ${props => props.active ? '1' : '0.5'}
  color: ${props => props.active ? '#3d5afe' : '#B6B6B6'};
  border: 1px solid ${props => props.active ? '#3d5afe' : '#B6B6B6'}

  &:hover, &:active, &:focus {
    color: ${props => !props.active && '#FFF'};
    background-color: ${props => !props.active && '#3d5afe'};
    border: ${props => !props.active && '1px solid #3d5afe'};
    opacity: 1.0;
  }
`;