import React, { Component } from "react";
import Modal from "react-awesome-modal";
import * as firebase from "firebase/app";
import { Redirect } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { clearToken } from "../../utils/token";
import { Loading } from "../";
import {
  ModalContent,
  ModalTitle,
  ModalSection,
  ModalButton,
  ModalObs,
  Highlight
} from "./Styled";

export default class AccountNotVerifiedModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailSent: false,
      redirect: false,
      isLoading: false
    };
  }

  returnToHomePage() {
    clearToken();
    this.setState({ redirect: true });
  }

  resendEmail() {
    const user = firebase.auth().currentUser;

    this.setState({ isLoading: true });
    user
      .sendEmailVerification()
      .then(() => this.setState({ emailSent: true }))
      .catch(error => console.log(`ERROR ${error.code}: ${error.message}`))
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { emailSent, isLoading, redirect } = this.state;
    const { isVisible, email } = this.props;

    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <>
        {isLoading && <Loading />}
        <Modal visible={isVisible} width="550" height="450" effect="fadeInUp">
          <ModalContent>
            {!emailSent ? (
              <>
                <ModalTitle>Bem-vindo!</ModalTitle>
                <ModalSection>
                  Antes de prosseguir e utilizar o{" "}
                  <Highlight>Meu Tesouro</Highlight>, você deve confirmar a sua
                  conta! Enviamos um email para <Highlight>{email}</Highlight>{" "}
                  com um link para verificação.
                </ModalSection>

                <ModalSection>
                  Caso o e-mail não tenha chegado, cheque sua caixa de spam
                </ModalSection>

                <ModalSection isDivider={true}>ou</ModalSection>

                <ModalButton onClick={() => this.resendEmail()}>
                  Reenvie o e-mail
                </ModalButton>
              </>
            ) : (
              <>
                <ModalTitle>E-mail enviado!</ModalTitle>
                <ModalSection>
                  <FaEnvelope size="120" />
                </ModalSection>
                <ModalSection>
                  Cheque sua caixa de entrada ou de spam e clique no link de
                  ativação enviado!
                </ModalSection>
              </>
            )}

            <ModalObs onClick={() => this.returnToHomePage()}>
              Clique aqui para voltar para a página inicial
            </ModalObs>
          </ModalContent>
        </Modal>
      </>
    );
  }
}
