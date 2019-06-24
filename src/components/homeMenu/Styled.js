import styled from "styled-components";

export const MenuGrid = styled.div`
  margin: 12.5% 0 10%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  @media (max-width: 1649px) {
    margin: 7.5% 0 5%;
  }
`;

export const MenuBox = styled.div`
  flex: 1 0 ${props => 100 / props.itemsPerRow}%;
  height: 300px;
  border: 2px solid white;
  background-image: url(${props => props.imageURL});
  background-size: cover;
  position: relative;
  cursor: pointer;
  filter: grayscale(100%);

  &:hover {
    filter: grayscale(0%);
  }

  &:after {
    content: "${props => props.title}";
    font-size: 32px;
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    color: #FFF;
  }
`;
