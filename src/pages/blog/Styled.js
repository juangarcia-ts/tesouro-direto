import styled from "styled-components";

export const Container = styled.div``;

export const Paragraph = styled.p``;

export const PostWrapper = styled.div``;

export const PostTitle = styled.h1``;

export const PostDate = styled.span`
    color: #666;
    display: block;
    margin-bottom: 3%;
`;

export const PostBox = styled.div`
    border: 1px solid #ccc;
    margin-bottom: 3%;
    padding: 24px 5%;
    margin-top: 5%;
`;

export const PostBoxTitle = styled.p`
    font-size: 32px;
    text-align: justify;
    text-justify: newspaper;  
`;

export const PostLink = styled.span`
    text-decoration: underline;
    font-size: 20px;
    color: #0645ad;
    cursor: pointer;

    &:hover {
        color: #0b0080;
    } 
`;

export const PostImage = styled.img`
    width: 100%;
    height: auto;
    cursor: pointer;
`;

export const PostCover = styled.img`
    width: 100%;
    height: auto;
    margin-bottom: 5%;
`;

export const PostSummary = styled.p`
    padding: 3% 1%;
    white-space: pre-line;
    text-align: justify;
`;

export const PostContent = styled.div``;

export const HighlightWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 500px;
`;

export const HighlightImage = styled.img`
    width: 100%;
    height: 100%;
`;

export const HighlightTitle = styled.p`
    cursor: pointer;
    opacity: 0.85;
    background-color: #000;
    text-shadow: 0 0 10px #000;
    position: absolute;
    text-align: justify;
    min-width: 1%;
    max-width: 70%;
    font-size: 32px;
    bottom: 15px;
    left: 30px;
    color: #fff;
    padding: 5px 10px;
`;

export const Row = styled.div``;

export const Col = styled.div``;

export const TextRight = styled.div``;
