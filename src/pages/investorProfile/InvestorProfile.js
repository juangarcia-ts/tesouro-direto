import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Quiz } from "../../components";
import { quizQuestions } from "../../utils/data";
import {
  Wrapper,
  Title,
  Bold,
  CoverImage,
  StartButton,
  IntroductoryText
} from "./Styled";

class InvestorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasQuizStarted: true,
      result: null
    };
    this.showResult = this.showResult.bind(this);
  }

  showResult(profile) {
    this.setState({ hazQuizStarted: false, result: profile });
  }

  startQuiz() {
    const { hasQuizStarted } = this.state;

    this.setState({ hasQuizStarted: !hasQuizStarted });
  }

  render() {
    const { hasQuizStarted } = this.state;

    return (
      <Container>
        {!hasQuizStarted ? (
          <Wrapper>
            <Title>O que é o perfil do investidor?</Title>
            <CoverImage />
            <IntroductoryText>
              Cada investidor possui objetivos diferentes para o eu patrimônio
              e, além disso, tolera riscos diferentes. Dessa forma, a
              identificação do perfil tem por finalidade encontrar uma
              distribuição de investimentos que seja compatível com esse perfil,
              sem gerar ansiedade, mal-estar ou qualquer desconforto ao
              investidor.
            </IntroductoryText>
            <IntroductoryText>
              Existem 3 possíveis perfis que você conhecerá ao final do quiz:{" "}
              <Bold>Conservador</Bold>, <Bold>Moderado</Bold> ou{" "}
              <Bold>Agressivo</Bold>
            </IntroductoryText>
            <StartButton onClick={() => this.startQuiz()}>
              Inicie agora!
            </StartButton>
          </Wrapper>
        ) : (
          <Quiz questions={quizQuestions} />
        )}
      </Container>
    );
  }
}

export default InvestorProfile;
