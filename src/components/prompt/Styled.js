import styled from "styled-components";
import { SubmitButton } from "./../../pages/auth/Styled";

export const PromptWrapper = styled.div`
  padding: 3em;
  height: 100%;
  position: relative;
`;

export const PromptTitle = styled.span`
  display: block;
  text-align: center;
  padding-bottom: 1rem;
  font-size: 32px;
`;

export const PromptText = styled.span`
  display: block;
  text-align: center;
`;

export const PromptAuthText = styled.span`
  display: block;
  text-align: center;
  font-weight: 700;
  margin-top: 1em;
`;

export const PromptFooter = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  border-top: 1px solid #ccc;
  padding-top: 2rem;
`;

export const PromptButton = styled(SubmitButton)`
  width: auto;
  margin: 0;
  float: right;
  padding: 0.75rem 2rem;
  margin-right: 1em;
  background: linear-gradient(
      ${props =>
        props.type === "cancel"
          ? "90deg, #E9967A 0%, #B22222 100%"
          : "90deg, #15787d 0%, #66a6ff 100%"}
    )
    left bottom transparent no-repeat;

  &:hover {
    background: linear-gradient(
        ${props =>
          props.type === "cancel"
            ? "-90deg, #E9967A 0%, #B22222 100%"
            : "-90deg, #15787d 0%, #66a6ff 100%"}
      )
      left bottom transparent no-repeat;
  }
`;

export const SocialButton = {
  width: "70%",
  fontSize: "1.5rem",
  margin: "3em auto 0",
  marginBottom: "1rem",
  height: "40px"
};

export const EmailSentWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;
`;

export const PromptAuthButton = styled(SubmitButton)``;
