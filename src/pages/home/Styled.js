import styled from "styled-components";
import Cleave from "cleave.js/react";
import { SubmitButton } from "./../auth/Styled";
/* eslint-disable no-unused-vars */
import CleavePhone from "cleave.js/dist/addons/cleave-phone.i18n";
/* eslint-enable no-unused-vars */

export const HomeWrapper = styled.div`
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
  position: absolute;
  top: 0;
  right: 0;
  height: 45vh;
  left: 0;
  background-color: #303030;
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
  margin: 10rem auto 0;
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
  margin: 1em 0rem 0.5em;
`;

export const Content = styled.div`
  position: absolute;
  top: calc(45vh + 3rem);
  right: 0;
  left: 0;
`;

export const NotVerifiedWarningWrapper = styled.div`
  position: absolute;
  top: calc(45vh + 3rem);
  right: 0;
  left: 0;
`;

export const Form = styled.form``;

export const Row = styled.div``;

export const Col = styled.div``;

export const FormTitle = styled.span`
  display: block;
  color: #212121;
  font-size: 28px;
  font-weight: bold;
  padding-bottom: 1rem;
  border-bottom: 1px solid #ccc;
`;

export const TelInput = styled(Cleave).attrs({
  options: { phone: true, phoneRegionCode: "BR" }
})`
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
