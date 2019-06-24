import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
import ReportBackground from "../../media/images/report-background.jpg";

const fadeInAnimation = keyframes`${fadeIn}`;

export const FadeIn = styled.div`
  animation: 2s ${fadeInAnimation};
`;

export const Title = styled.h2`
  margin: 0 auto;
`;

export const Text = styled.label`
  font-size: 10px;
  color: #333;
  display: block;
`;

export const Span = styled.label`
  font-size: 12px;
  color: #333;
  display: inline-block;
  padding-right: 5px;
  margin-bottom: 0;
`;

export const HighlightedSpan = styled(Span)`
  color: #87027b;
`;

export const VersusWrapper = styled.div``;

export const Col = styled.div`
  width: 25%;
  font-size: 12px;
`;

export const SectionTitle = styled.label`
  font-size: 16px;
  border-bottom: 1px dashed #b6b6b6;
  color: #333;
  display: block;
  margin: 20px 0 10px;
`;

export const SimulatorWrapper = styled.div`
  margin-top: 7.5%;

  small {
    font-size: 9px;
    font-weight: normal;
    width: 500px;
    top: -25px;
    margin-top: 2%;
  }

  label {
    font-size: 12px;
  }

  span {
    width: 200px !important;
  }
`;

export const LeftHeader = styled(Col)``;

export const RightHeader = styled(Col)`
  text-align: right;
`;

export const ReportWrapper = styled.div`
  margin-top: 7.5%;

  @media (max-width: 1649px) {
    margin-top: 5%;
  }
`;

export const Paper = styled.div`
  height: 792px;
  width: 612px;
  padding: 0;
  background-color: #fff;
  box-shadow: 5px 5px 5px #888888;
  margin: auto;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const PaperBorder = styled.div`
  height: 100%;
  width: 100%;
  padding: 25px;
  background-image: url(${ReportBackground});
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const Header = styled.div`
  padding: 0;
  margin: 0;
`;

export const Body = styled.div`
  padding: 0;
  margin: 0;
`;
