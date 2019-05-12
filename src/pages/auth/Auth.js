import React, { Component } from "react";
import * as firebase from "firebase/app";
import {
  FacebookLoginButton,
  GoogleLoginButton
} from "react-social-login-buttons";
import { Redirect } from "react-router-dom";
import { Loading } from "../../components";
import { setToken, getToken } from "../../utils/token";
import * as css from "./Styled";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      isLoading: false,
      isRegisterForm: true,
      isRecaptchaValid: false,
      warningTexts: []
    };
  }

  isFormValid() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const {
      isRegisterForm,
      email,
      password,
      passwordConfirmation
    } = this.state;
    let isValid = true;
    const warningTexts = [];

    if (!email || !password || (isRegisterForm && !passwordConfirmation)) {
      warningTexts.push("Todos os campos devem ser preenchidos.");
      this.setState({ warningTexts });
      return false;
    }

    if (!re.test(email)) {
      warningTexts.push("O e-mail inserido não é válido.");
      isValid = false;
    }

    if (password.length < 6) {
      warningTexts.push("A senha deve ter no mínimo 6 caracteres");
      isValid = false;
    }

    if (isRegisterForm && password !== passwordConfirmation) {
      warningTexts.push("Os campos de senha não coincidem.");
      isValid = false;
    }

    this.setState({ warningTexts });
    return isValid;
  }

  createAccount() {
    const { email, password } = this.state;

    this.setState({ isLoading: true });

    if (!this.isFormValid()) {
      this.setState({ isLoading: false });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => setToken({ ...response, isAdmin: false }))
      .catch(error => console.log(`ERROR ${error.code}: ${error.message}`))
      .finally(() => this.setState({ isLoading: false }));
  }

  signWithSocialNetwork(socialNetwork) {
    const { warningTexts } = this.state;
    let provider = null;

    firebase.auth().languageCode = "pt";

    if (socialNetwork === "facebook") {
      provider = new firebase.auth.FacebookAuthProvider();
    } else if (socialNetwork === "google") {
      provider = new firebase.auth.GoogleAuthProvider();
    } else {
      return;
    }

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(response => setToken({ ...response, isAdmin: false }))
      .catch(error => {
        console.log(`ERROR ${error.code}: ${error.message}`);

        if (error.code === "auth/web-storage-unsupported") {
          this.setState({
            warningTexts: [
              ...warningTexts,
              "Por favor, libere o uso de cookies antes de prosseguir."
            ]
          });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  signInWithEmail() {
    const { email, password, warningTexts } = this.state;
    const isAdmin = email === "admin@meu-tesouro.com";

    this.setState({ isLoading: true });

    if (!this.isFormValid()) {
      this.setState({ isLoading: false });
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => setToken({ ...response, isAdmin }))
      .catch(error => {
        console.log(`ERROR ${error.code}: ${error.message}`);

        if (error.code === "auth/wrong-password") {
          this.setState({
            warningTexts: [
              ...warningTexts,
              "E-mail e/ou senha não estão corretos"
            ]
          });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  toggleForm() {
    const { isRegisterForm } = this.state;

    this.setState({ isRegisterForm: !isRegisterForm, warningTexts: [] });
  }

  render() {
    const { isLoading, isRegisterForm, warningTexts } = this.state;
    const token = getToken();

    if (token) {
      return <Redirect to={token.isAdmin ? "/admin/posts" : "/home"} />;
    }

    return (
      <>
        {isLoading && <Loading />}
        <css.Background />
        <css.Container>
          <css.Wrapper>
            <css.Form autocomplete="new-form">
              {isRegisterForm ? (
                <css.FormTitle>Nova conta</css.FormTitle>
              ) : (
                <css.FormTitle>Login</css.FormTitle>
              )}

              <FacebookLoginButton
                iconSize={"16px"}
                align="center"
                style={css.SocialButton}
                onClick={() => this.signWithSocialNetwork("facebook")}
              >
                {isRegisterForm
                  ? "Cadastre-se com o Facebook"
                  : "Entrar com o Facebook"}
              </FacebookLoginButton>
              <GoogleLoginButton
                iconSize={"16px"}
                align="center"
                style={css.SocialButton}
                onClick={() => this.signWithSocialNetwork("google")}
              >
                {isRegisterForm
                  ? "Cadastre-se com o Google"
                  : "Entrar com o Google"}
              </GoogleLoginButton>

              <css.CenteredText>ou</css.CenteredText>

              <css.Label style={{ marginTop: "0" }}>E-mail</css.Label>
              <css.Input
                required
                type="email"
                autocomplete="new-email"
                onChange={e => this.setState({ email: e.target.value })}
              />

              <css.Label>Senha</css.Label>
              <css.Input
                required
                type="password"
                autocomplete="new-password"
                onChange={e => this.setState({ password: e.target.value })}
              />

              {isRegisterForm ? (
                <>
                  <css.Label>Confirmação de senha</css.Label>
                  <css.Input
                    required
                    type="password"
                    name="confirmacao"
                    autocomplete="new-password"
                    onChange={e =>
                      this.setState({ passwordConfirmation: e.target.value })
                    }
                  />

                  <css.SubmitButton
                    type="button"
                    onClick={() => this.createAccount()}
                  >
                    Cadastre-se
                  </css.SubmitButton>

                  <css.CenteredText>
                    Já tem uma conta?{" "}
                    <css.Link onClick={() => this.toggleForm()}>
                      Entre agora
                    </css.Link>
                  </css.CenteredText>
                </>
              ) : (
                <>
                  <css.SubmitButton
                    type="button"
                    onClick={() => this.signInWithEmail()}
                  >
                    Entrar
                  </css.SubmitButton>

                  <css.CenteredText>
                    Ainda não é um usuário?{" "}
                    <css.Link onClick={() => this.toggleForm()}>
                      Cadastre-se
                    </css.Link>
                  </css.CenteredText>
                </>
              )}

              {warningTexts.map((text, index) => (
                <css.WarningText
                  key={index}
                  style={
                    index === 0
                      ? { marginTop: "3rem" }
                      : { marginTop: "0.5rem" }
                  }
                >
                  {text}
                </css.WarningText>
              ))}
            </css.Form>
            <css.Info>
              <css.InfoContent>
                <css.InfoTitle>Simule. Acompanhe. Gerencie.</css.InfoTitle>
                <css.InfoText>
                  Com o Meu Tesouro você pode fazer isso e muito mais
                </css.InfoText>
              </css.InfoContent>
              <css.Overlay />
            </css.Info>
          </css.Wrapper>
        </css.Container>
      </>
    );
  }
}

export default Auth;
