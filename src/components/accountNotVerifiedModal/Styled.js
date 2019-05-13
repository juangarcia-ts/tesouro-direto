import styled from "styled-components";
import { SubmitButton } from "../../pages/auth/Styled";

export const ModalContent = styled.div`
  padding: 5rem;
`;

export const ModalTitle = styled.span`
  display: block;
  text-align: center;
  font-size: 32px;
`;

export const ModalSection = styled.span`
  display: block;
  max-width: 80%;
  text-align: center;
  margin: ${props => (props.isDivider ? "1.5rem auto " : "3rem auto 0")};
`;

export const ModalButton = styled(SubmitButton)`
  margin-top: 0;
`;

export const ModalObs = styled.small`
  font-size: 75%;
  display: block;
  text-align: center;
  margin-top: 1rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Highlight = styled.b``;
