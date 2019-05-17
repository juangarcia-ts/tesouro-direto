import React, { Component } from "react";
import * as firebase from "firebase/app";
import { Redirect } from "react-router-dom";
import { Loading, Prompt } from "../../components";
import { setToken, getToken } from "../../utils/token";
import { validateAuthForm } from "../../utils/validations";
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
      warningTexts: []
    };
  }

  createAccount() {
    const { warningTexts, email, password } = this.state;
    const errors = validateAuthForm(this.state);

    this.setState({ isLoading: true });

    if (errors.length > 0) {
      return this.setState({ isLoading: false, warningTexts: errors });
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        firebase.auth().onAuthStateChanged(currentUser => {
          if (currentUser) {
            currentUser.sendEmailVerification().finally(() => {
              setToken({ ...response, isAdmin: false });
              this.setState({ isLoading: false });
            });
          }
        });
      })
      .catch(error => {
        console.log(`ERROR ${error.code}: ${error.message}`);

        if (error.code === "auth/email-already-in-use") {
          this.setState({
            warningTexts: [
              ...warningTexts,
              "Esse e-mail já está sendo utilizado."
            ]
          });
        }

        this.setState({ isLoading: false });
      });
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
      .then(response => {
        if (socialNetwork === "google") {
          return setToken({ ...response, isAdmin: false });
        }

        firebase.auth().onAuthStateChanged(currentUser => {
          if (currentUser) {
            currentUser.sendEmailVerification().finally(() => {
              setToken({ ...response, isAdmin: false });
              this.setState({ isLoading: false });
            });
          }
        });
      })
      .catch(error => {
        console.log(`ERROR ${error.code}: ${error.message}`);

        if (error.code === "auth/web-storage-unsupported") {
          this.setState({
            warningTexts: [
              ...warningTexts,
              "Por favor, libere o uso de cookies antes de prosseguir."
            ]
          });
        } else if (
          error.code === "auth/account-exists-with-different-credential"
        ) {
          this.setState({
            warningTexts: [
              ...warningTexts,
              "Essa conta já está vinculado a outro tipo de acesso."
            ]
          });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  signInWithEmail() {
    const { email, password, warningTexts } = this.state;
    const errors = validateAuthForm(this.state);
    const isAdmin = email === "admin@meu-tesouro.com";

    this.setState({ isLoading: true });

    if (errors.length > 0) {
      return this.setState({ isLoading: false, warningTexts: errors });
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => setToken({ ...response, isAdmin }))
      .catch(error => {
        console.log(`ERROR ${error.code}: ${error.message}`);

        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found"
        ) {
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

    this.setState({
      isRegisterForm: !isRegisterForm,
      warningTexts: [],
      email: "",
      password: "",
      passwordConfirmation: ""
    });
  }

  render() {
    const {
      isLoading,
      isRegisterForm,
      warningTexts,
      email,
      password,
      passwordConfirmation,
      isPromptVisible
    } = this.state;
    const token = getToken();

    if (token) {
      return <Redirect to={token.isAdmin ? "/admin/posts" : "/home"} />;
    }

    return (
      <>
        {isLoading && <Loading />}
        <Prompt
          width="400"
          height="320"
          emailReset={true}
          isVisible={isPromptVisible}
          title={"Recuperar acesso"}
          text={"Digite seu e-mail para receber um link para alterar sua senha"}
          onCancel={() => this.setState({ isPromptVisible: false })}
        />
        <css.Background />
        <css.Container>
          <css.Wrapper>
            <css.Form autocomplete="new-form">
              {isRegisterForm ? (
                <css.FormTitle>Nova conta</css.FormTitle>
              ) : (
                <css.FormTitle>Login</css.FormTitle>
              )}

              <css.FormContent>
                <css.FacebookButton
                  iconSize={"16px"}
                  align="center"
                  onClick={() => this.signWithSocialNetwork("facebook")}
                >
                  Entrar com o Facebook
                </css.FacebookButton>
                <css.GoogleButton
                  iconSize={"16px"}
                  align="center"
                  onClick={() => this.signWithSocialNetwork("google")}
                >
                  Entrar com o Google
                </css.GoogleButton>

                <css.CenteredText>ou</css.CenteredText>

                <css.Label style={{ marginTop: "0" }}>E-mail</css.Label>
                <css.Input
                  required
                  type="email"
                  autocomplete="new-email"
                  value={email}
                  onChange={e => this.setState({ email: e.target.value })}
                />

                <css.Label>Senha</css.Label>
                <css.Input
                  required
                  type="password"
                  autocomplete="new-password"
                  value={password}
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
                      value={passwordConfirmation}
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
                      Esqueceu sua senha?{" "}
                      <css.Link
                        onClick={() => this.setState({ isPromptVisible: true })}
                      >
                        Clique aqui
                      </css.Link>
                    </css.CenteredText>

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
              </css.FormContent>
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
