import styled from "styled-components";

export const Container = styled.div``;

export const WelcomeText = styled.span`
  text-align: center;
  display: block;
  color: #212121;
  font-size: 28px;
  font-weight: bold;
`;

export const Header = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 40vh;
  left: 0;
  background-color: #303030;
`;

export const Content = styled.div`
  position: absolute;
  top: 40vh;
  right: 0;
  left: 0;
`;

export const UserImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-image: url(${props =>
    props.photoURL
      ? props.photoURL
      : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"});
  background-size: contain;
`;
