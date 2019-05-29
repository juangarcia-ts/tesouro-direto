import styled from "styled-components";
import img from "../../media/images/landing-bg.jpg";

export const LandingWrapper = styled.div``;

export const Header = styled.div`
    height: 45%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
`;

export const HeaderImage = styled(Header)`
    background-image: url(${img});
    background-size: cover;
    background-position: top;
    z-index: 100;
    filter: blur(1.5px)
`;

export const HeaderOverlay = styled(Header)`    
    z-index: 101;
    background-color: #000;
    opacity: 0.5;
`;

export const HeaderInfo = styled(Header)`
    z-index: 102;
    height: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin: 0 auto;

    @media (min-width: 768px) and (max-width: 1023px) {
      width: 60%;
    }

    @media (min-width: 1024px) {
      width: 40%;
    }
`;

export const HeaderText = styled.h2`
    color: #fff !important;
    font-size: 3rem;
    margin-bottom: 3rem;
`;

export const Content = styled.div`
    position: absolute;
    top: 47%;
    left: 0;
    right: 0;
    padding-bottom: 3rem;
`;

export const TextCenter = styled.div``;

export const Button = styled.button``;
