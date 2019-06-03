import styled from "styled-components";
import { Row } from "react-bootstrap";

export const QuizWrapper = styled.div`
  padding: ${props => (props.result ? "7.5%" : "15% 10%")};

  @media (max-width: 1649px) {
    padding: ${props => (props.result ? "7.5%" : "10% 5%")};
  }
`;

export const Progress = styled.span`
  font-size: 20px;
`;

export const QuestionTitle = styled.h1`
  min-height: 80px;
`;

export const Button = styled.button`
  outline: 0;
  display: block;
  border-radius: 10px;

  &:hover,
  &:focus,
  &:active {
    background-image: linear-gradient(-90deg, #15787d 0%, #66a6ff 100%);
    color: #fff;
  }
`;

export const FlexRow = styled(Row)`
  display: flex;
  align-items: center;
`;

export const AnswerButton = styled(Button)`
  width: 100%;
  font-size: 20px;
  height: 60px;
  margin: 5% auto 0;
  color: #212121;
  background-color: #fff;
  border: 1px solid #b6b6b6;

  @media (max-width: 1649px) {
    margin: 3% auto 0;
  }
`;

export const BackButton = styled.div`
  float: right;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    border-bottom: 1px solid #212121;
  }
`;

export const BackText = styled.span`
  padding-left: 0.75rem;
  float: right;
  font-size: 16px;
  color: #212121;
  white-space: nowrap;
`;

export const ResultTitle = styled.h1``;

export const ResultImage = styled.div`
  background-image: url(${props => props.imageURL});
  background-size: cover;
  background-position: 50% 25%;
  width: 100%;
  height: 300px;
  margin: 3% 0;
`;

export const ResultSummary = styled.p`
  white-space: pre-line;
  font-size: 18px;
`;

export const ButtonsGrid = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ResultButton = styled(Button)`
  flex: 1 0 28%;
  margin: 5% 2.5% 0%;
  font-size: 20px;
  height: 60px;
  color: #212121;
  background-color: #fff;
  border: 1px solid #b6b6b6;
`;

export const OtherResults = styled.p`
  font-size: 16px;
  margin-top: 5%;
  text-align: center;
`;

export const Text = styled.span`
  cursor: pointer;
  text-decoration: ${props => (props.showUnderline ? "underline" : "none")};
`;
