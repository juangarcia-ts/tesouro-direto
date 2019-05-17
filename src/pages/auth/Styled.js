import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: -5px;
  left: 0;
  background: linear-gradient(-90deg, #15787d 0%, #66a6ff 100%);
  z-index: 100;
`;

export const Container = styled.div`
  position: absolute;
  height: calc(100vh - 80px);
  width: 100%;
  z-index: 102;
`;

export const Wrapper = styled.div`
  display: flex;
  width: 65vw;
  margin: 5% auto;
  -webkit-box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);
  -moz-box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);
  box-shadow: 0px 10px 20px 0px rgba(50, 50, 50, 0.52);
`;

export const Form = styled.form`
  padding: 1.5em;
  background-color: #fff;
  border-radius: 5px 0px 0px 5px;
  height: 70vh;
  width: 25vw;
`;

export const Info = styled.form`
  position: relative;
  padding: 1.5em;
  background-color: #fff;
  border-radius: 0px 5px 5px 0px;
  height: 70vh;
  width: 40vw;
  background: url(https://images.pexels.com/photos/618613/pexels-photo-618613.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=680&w=680)
    no-repeat center;
  background-size: cover;
`;

export const Overlay = styled.div`
  z-index: 1;
  background: linear-gradient(90deg, #15787d 0%, #66a6ff 100%);
  opacity: 0.6;
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
`;

export const InfoContent = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  color: #fff;
  z-index: 2;
`;

export const InfoTitle = styled.span`
  position: absolute;
  bottom: 15%;
  left: 5%;
  word-spacing: 100vw;
  font-size: 48px;
`;

export const InfoText = styled.span`
  position: absolute;
  bottom: 10%;
  left: 5%;
  font-size: 18px;
`;

export const FormTitle = styled.span`
  text-align: center;
  display: block;
  color: #212121;
  font-size: 28px;
  font-weight: bold;
  border-bottom: 1px solid #ccc;
  margin-bottom: 0.7em;
`;

export const Label = styled.label`
  margin-top: 0.75em;
  color: #333;
  font-size: 12px;
  height: 30px;
  line-height: 30px;
`;

export const Input = styled.input`
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

  &:disabled {
    opacity: 0.3;
    background: linear-gradient(90deg, #333 0%, #666 100%) left bottom
      transparent no-repeat;
    background-size: 100% 3px;
  }
`;

export const CenteredText = styled.span`
  margin-top: 1em;
  text-align: center;
  color: #333;
  display: block;
`;

export const SubmitButton = styled.button`
  padding: 0.75rem 1rem;
  display: block;
  margin: 1.5em auto 0;
  width: 50%;
  outline: 0;
  color: #fff;
  background-image: linear-gradient(90deg, #15787d 0%, #66a6ff 100%);
  border: none;
  border-radius: 10px;

  &:hover,
  &:focus,
  &:active {
    background-image: linear-gradient(-90deg, #15787d 0%, #66a6ff 100%);
  }
`;

export const Link = styled.a`
  cursor: pointer;
  text-decoration: underline;
`;

export const WarningText = styled.small`
  color: red;
  display: block;
  text-align: center;
`;

export const SocialButton = {
  fontSize: "1em",
  margin: "0 auto",
  marginBottom: "1rem",
  height: "40px"
};
