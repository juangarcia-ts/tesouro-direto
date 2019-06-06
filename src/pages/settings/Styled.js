import styled from "styled-components";
import { SubmitButton } from "../auth/Styled";
import PhoneInput from "react-phone-number-input/basic-input";
import "react-phone-number-input/style.css";
import "react-responsive-ui/style.css";

export const SettingsWrapper = styled.div`
  opacity: ${props => !props.isVerified && "0.3"};
`;

export const Container = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
  width: 730px;
`;

export const Header = styled.div``;

export const HeaderWrapper = styled.div`
  padding: 3% 0%;
  background-color: #303030;
`;

export const Content = styled.div`
  padding: 3% 0;
`;

export const UserImage = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: url(${props =>
    props.photoURL
      ? props.photoURL
      : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"});
  background-size: cover;
  margin: 5em auto 0;
`;

export const Badge = styled.span`
  display: inline-block;
  margin-top: 5px;
  padding: 0.25em 0.4em;
  font-size: 85%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;

  &.verified {
    background-color: #28a745;
  }

  &.not-verified {
    background-color: #6c757d;
  }
`;

export const WelcomeText = styled.span`
  text-align: center;
  display: block;
  color: #fff;
  font-size: 28px;
  font-weight: bold;
  margin: 1em 0 0.5em;

  @media (min-width: 768px) and (max-width: 1024px) {
    margin: 0.75em 0 0.25em;
  }

  @media (min-width: 1025px) {
    font-size: 32px;
  }
`;

export const NotVerifiedWarningWrapper = styled.div`
  position: absolute;
  top: calc(50vh + 1.5rem);
  right: 0;
  left: 0;
`;

export const Form = styled.form``;

export const FormTitle = styled.span`
  display: block;
  color: #212121;
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
`;

export const Label = styled.label`
  margin-top: 0.75em;
  color: #333;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
`;

export const TelInput = styled(PhoneInput)`
  border: 0;
  color: #333;
  font-size: 14px;
  height: 25px;
  line-height: 25px;
  outline: none !important;
  width: 100%;
  background: linear-gradient(90deg, #15787d 0%, #66a6ff 100%) left bottom
    transparent no-repeat;
  background-size: 100% 3px;
  padding-bottom: 5px;
  opacity: 0.9;
`;

export const CallToActionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ConfirmButton = styled(SubmitButton)`
  width: auto;
  margin: 3rem 0 0;
  float: right;
  padding: 0.75rem 2rem;
`;

export const DeleteAccountText = styled.small`
  margin-top: 3rem;
`;

export const EditPhotoIcon = {
  position: "absolute",
  bottom: "0px",
  right: "-15px",
  cursor: "pointer"
};

export const RemovePhotoIcon = {
  position: "absolute",
  bottom: "-2px",
  right: "-50px",
  cursor: "pointer"
};
