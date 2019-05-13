import React, { Component } from "react";
import * as firebase from "firebase/app";
import Modal from "react-awesome-modal";
import { FaEnvelope } from "react-icons/fa";
import { Loading } from "../";
import { getToken } from "../../utils/token";
import { validateEmail } from "../../utils/validations";
import { Input, Label, WarningText } from "../../pages/auth/Styled";
import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";
import {
  PromptWrapper,
  PromptTitle,
  PromptText,
  PromptFooter,
  PromptAuthText,
  PromptAuthButton,
  PromptButton,
  SocialButton,
  EmailSentWrapper
} from "./Styled";

export default class Prompt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      email: "",
      warningText: "",
      emailSent: false,
      isLoading: false
    };
  }

  handleSubmit() {
    const { emailReset, onConfirm } = this.props;

    if (emailReset) {
      this.sendPasswordResetEmail();
      return;
    }

    onConfirm();
  }

  sendPasswordResetEmail() {
    const { email } = this.state;

    if (!email) {
      return this.setState({
        warningText: "O campo de e-mail deve ser preenchido."
      });
    }

    if (!validateEmail(email)) {
      return this.setState({ warningText: "O e-mail não é válido" });
    }

    this.setState({ isLoading: true });

    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .finally(() => this.setState({ isLoading: false, emailSent: true }));
  }

  signWithSocialNetwork(socialNetwork) {
    const { onConfirm } = this.props;
    let provider = null;

    firebase.auth().languageCode = "pt";

    if (socialNetwork === "facebook") {
      provider = new firebase.auth.FacebookAuthProvider();
    } else if (socialNetwork === "google") {
      const { user } = getToken();
      provider = new firebase.auth.GoogleAuthProvider();
      provider.setCustomParameters({
        login_hint: user.email
      });
    } else {
      return;
    }

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => onConfirm())
      .finally(() => this.setState({ isLoading: false }));
  }

  reauthenticateWithEmail() {
    const { onConfirm } = this.props;
    const { password } = this.state;
    const { user } = getToken();
    const currentUser = firebase.auth().currentUser;

    if (!password) {
      return this.setState({
        warningText: "O campo de senha deve ser preenchido."
      });
    }

    this.setState({ isLoading: true });

    const credential = firebase.auth.EmailAuthProvider.credential(
      user.email,
      password
    );

    return currentUser
      .reauthenticateWithCredential(credential)
      .then(() => onConfirm())
      .catch(error => {
        console.log(`ERROR ${error.code}: ${error.message}`);

        if (error.code === "auth/wrong-password") {
          this.setState({
            warningText: "A senha digitada não está correta"
          });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  renderAuthMethod() {
    const { provider } = this.props;
    const { warningText } = this.state;

    if (provider === "password") {
      return (
        <>
          <Label>Senha</Label>
          <Input
            type="password"
            onChange={e => this.setState({ password: e.target.value })}
          />
          <WarningText style={{ marginTop: "1rem" }}>{warningText}</WarningText>
        </>
      );
    } else if (provider === "google.com") {
      return (
        <GoogleLoginButton
          iconSize={"16px"}
          align="center"
          style={SocialButton}
          onClick={() => this.signWithSocialNetwork("google")}
        >
          Entrar com o Google
        </GoogleLoginButton>
      );
    } else if (provider === "facebook.com") {
      return (
        <FacebookLoginButton
          iconSize={"16px"}
          align="center"
          style={SocialButton}
          onClick={() => this.signWithSocialNetwork("facebook")}
        >
          Entrar com o Facebook
        </FacebookLoginButton>
      );
    }

    return null;
  }

  render() {
    const { warningText, emailSent, isLoading } = this.state;
    const {
      width,
      height,
      authenticate,
      emailReset,
      provider,
      isVisible,
      title,
      text,
      onCancel
    } = this.props;

    return (
      <>
        {isLoading && <Loading />}
        <Modal
          visible={isVisible}
          width={width}
          height={height}
          effect="fadeInUp"
        >
          <PromptWrapper>
            <PromptTitle>{emailSent ? "E-mail enviado" : title}</PromptTitle>
            {emailSent && (
              <>
                <EmailSentWrapper>
                  <FaEnvelope size="60" />
                </EmailSentWrapper>
              </>
            )}
            <PromptText>
              {emailSent
                ? "Cheque sua caixa de entrada ou de spam e clique no link enviado!"
                : text}
            </PromptText>
            {authenticate && (
              <>
                <PromptAuthText>Autentique-se para confirmar</PromptAuthText>
                {this.renderAuthMethod()}
                {provider === "password" && (
                  <PromptAuthButton
                    style={
                      warningText
                        ? { marginTop: "1rem" }
                        : { marginTop: "3rem" }
                    }
                    onClick={() => this.reauthenticateWithEmail()}
                  >
                    Confirmar
                  </PromptAuthButton>
                )}
              </>
            )}
            {emailReset &&
              (!emailSent && (
                <>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    onChange={e => this.setState({ email: e.target.value })}
                  />
                  <WarningText style={{ marginTop: "1rem" }}>
                    {warningText}
                  </WarningText>
                </>
              ))}
            <PromptFooter>
              {emailSent ? (
                <PromptButton type="cancel" onClick={() => onCancel()}>
                  Fechar
                </PromptButton>
              ) : (
                <>
                  {!authenticate && (
                    <PromptButton
                      type="confirm"
                      onClick={() => this.handleSubmit()}
                    >
                      {emailReset ? "Enviar" : "Confirmar"}
                    </PromptButton>
                  )}
                  <PromptButton type="cancel" onClick={() => onCancel()}>
                    Cancelar
                  </PromptButton>
                </>
              )}
            </PromptFooter>
          </PromptWrapper>
        </Modal>
      </>
    );
  }
}
