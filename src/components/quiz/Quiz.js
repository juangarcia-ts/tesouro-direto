import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Col } from "react-bootstrap";
import { FaChevronLeft } from "react-icons/fa";
import { profiles } from "../../utils/data";
import * as css from "./Styled";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      responses: [],
      result: "",
      redirect: false
    };
  }

  redirectTo(link) {
    this.setState({ redirect: link });
  }

  restartQuiz() {
    this.setState({
      responses: [],
      currentQuestion: 0,
      result: null
    });
  }

  goBack() {
    const { currentQuestion, responses } = this.state;

    this.setState({
      responses: responses.slice(0, -1),
      currentQuestion: currentQuestion - 1
    });
  }

  calculateProfile(answers) {
    let result = null;
    let largest = 0;
    let aggressiveProfile = 0;
    let moderateProfile = 0;
    let conservativeProfile = 0;

    answers.forEach(answer => {
      largest = Math.max(
        aggressiveProfile,
        moderateProfile,
        conservativeProfile
      );

      if (answer.indexOf("A") !== -1) {
        aggressiveProfile += 1;

        if (aggressiveProfile > largest) {
          result = "A";
        }
      }

      if (answer.indexOf("B") !== -1) {
        moderateProfile += 1;

        if (moderateProfile > largest) {
          result = "B";
        }
      }

      if (answer.indexOf("C") !== -1) {
        conservativeProfile += 1;

        if (conservativeProfile > largest) {
          result = "C";
        }
      }
    });

    this.setState({ result });
  }

  answerQuestion(result) {
    const { currentQuestion, responses } = this.state;
    const { questions } = this.props;

    if (currentQuestion + 1 === questions.length) {
      const finalResponses = [...responses, result];

      return this.calculateProfile(finalResponses);
    }

    this.setState({
      responses: [...responses, result],
      currentQuestion: currentQuestion + 1
    });
  }

  renderAllProfiles(result) {
    const allProfiles = Object.values(profiles);

    return allProfiles.map((profile, index) => {
      return (
        <>
          <css.Text
            showUnderline={result === profile.shortcut}
            onClick={() => this.setState({ result: profile.shortcut })}
          >
            {profile.name}
          </css.Text>
          {index < allProfiles.length - 1 && <css.Text>{", "}</css.Text>}
        </>
      );
    });
  }

  renderResult() {
    const { result } = this.state;
    const profile = profiles[result];

    return (
      <>
        <css.ResultTitle>Seu perfil é: {profile.name}</css.ResultTitle>
        <css.ResultImage imageURL={profile.image} />
        <css.ResultSummary>{profile.summary}</css.ResultSummary>

        <css.ButtonsGrid>
          <css.ResultButton onClick={() => this.restartQuiz()}>
            Responder novamente
          </css.ResultButton>
          <css.ResultButton onClick={() => this.redirectTo("/pagina-inicial")}>
            Voltar a página inicial
          </css.ResultButton>
        </css.ButtonsGrid>

        <css.OtherResults>
          Todos os perfis: {this.renderAllProfiles(result)}
        </css.OtherResults>
      </>
    );
  }

  renderAnswers(answers) {
    const { currentQuestion } = this.state;

    return answers.map(answer => {
      const index = currentQuestion + Math.floor(Math.random() * 9999);

      return (
        <css.AnswerButton
          key={index}
          onClick={() => this.answerQuestion(answer.result)}
        >
          {answer.text}
        </css.AnswerButton>
      );
    });
  }

  renderQuestion() {
    const { questions } = this.props;
    const { currentQuestion } = this.state;

    const question = questions[currentQuestion];

    return (
      <>
        <css.FlexRow>
          <Col xs={9} sm={9} md={9} lg={9}>
            <css.Progress>
              Questão {currentQuestion + 1} de {questions.length}
            </css.Progress>
            <css.QuestionTitle>{question.title}</css.QuestionTitle>
          </Col>
          <Col xs={3} sm={3} md={3} lg={3}>
            {currentQuestion > 0 && (
              <css.BackButton onClick={() => this.goBack()}>
                <FaChevronLeft />
                <css.BackText>Questão anterior</css.BackText>
              </css.BackButton>
            )}
          </Col>
        </css.FlexRow>
        {this.renderAnswers(question.answers)}
      </>
    );
  }

  render() {
    const { result, redirect } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return (
      <css.QuizWrapper result={!!result}>
        {result ? this.renderResult() : this.renderQuestion()}
      </css.QuizWrapper>
    );
  }
}

export default Quiz;
