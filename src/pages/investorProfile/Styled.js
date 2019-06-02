import styled from "styled-components";
import ProfileImage from "../../media/images/profile-image.jpeg";

export const Wrapper = styled.div`
  margin-top: 10%;
`;

export const Title = styled.h1``;

export const Bold = styled.b``;

export const IntroductoryText = styled.p`
  font-size: 16px;
`;

export const CoverImage = styled.div`
  background-image: url(${ProfileImage});
  background-size: cover;
  background-position: 50% 25%;
  float: right;
  height: 300px;
  width: 100%;
  margin: 3% 0;
`;

export const StartButton = styled.button`
  display: block;
  width: 30%;
  font-size: 28px;
  padding: 0.75rem 1rem;
  margin: 5% auto 0;
  outline: 0;
  color: #fff;
  background-image: linear-gradient(90deg, #15787d 0%, #66a6ff 100%);
  border: none;
  border-radius: 10px;
  white-space: nowrap;

  &:hover,
  &:focus,
  &:active {
    background-image: linear-gradient(-90deg, #15787d 0%, #66a6ff 100%);
  }
`;
