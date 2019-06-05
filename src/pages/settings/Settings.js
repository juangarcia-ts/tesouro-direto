import React, { Component } from "react";
import * as firebase from "firebase/app";
import { Redirect } from "react-router-dom";
import { FaCheckDouble, FaTimes, FaCamera } from "react-icons/fa";
import { Row, Col } from "react-bootstrap";
import { UserService } from "../../services";
import { getToken, clearToken, setUser } from "../../utils/token";
import { convertToBase64 } from "../../utils/convertions";
import { validateUserForm } from "../../utils/validations";
import { Loading, AccountNotVerifiedModal, Prompt } from "../../components";
import { Input, Link, WarningText } from "../auth/Styled";
import * as css from "./Styled";

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPromptVisible: 0,
      showAccountVerification: false,
      warningTexts: [],
      provider: "",
      user: {
        photoURL: "",
        displayName: "",
        email: "",
        phoneNumber: "",
        password: "",
        passwordConfirmation: "",
        promptTitle: "",
        proptText: ""
      }
    };
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.removeAccount = this.removeAccount.bind(this);
    this.updatePhoto = this.updatePhoto.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => {
      if (currentUser) {
        const { user } = getToken();

        if (!user.phoneNumber) user.phoneNumber = "";
        if (!user.displayName) user.displayName = "";

        user.emailVerified = currentUser.emailVerified;

        this.setState({ showAccountVerification: !user.emailVerified });

        const provider = user.providerData[0].providerId;

        UserService.obterUsuario(user.uid)
          .then(response => {
            const { foto, telefone } = response.data;

            user.photoURL = foto;
            user.phoneNumber = telefone;
          })
          .finally(() => {
            setUser(user);
            this.setState({ user, provider, isLoading: false });
          });
      }
    });
  }

  updatePhoto(event) {
    const { user } = getToken();
    const photo = event.target.files[0];

    if (photo) {
      convertToBase64(photo, file => {
        const params = {          
          firebase_id: user.uid,
          foto: file,
          telefone: user.phoneNumber || ""
        };

        this.setState({ isLoading: true });

        UserService.editarUsuario(params).then(response => {
          const { foto, telefone } = response.data;
          user.photoURL = foto;
          user.telefone = telefone;
          setUser(user);
          this.setState({ isLoading: false, user });
        });
      });
    }
  }

  removePhoto() {
    const { user } = getToken();
    const params = {      
      firebase_id: user.uid,
      foto: "",
      telefone: user.phoneNumber || ""
    };

    this.setState({ isLoading: true });

    UserService.editarUsuario(params).then(response => {
      const { foto, telefone } = response.data;
      user.photoURL = foto;
      user.telefone = telefone;
      setUser(user);
      this.setState({ isLoading: false, user });
    });
  }

  updateUser() {
    const promisesChain = [];
    const { user } = getToken();
    const { user: params } = this.state;
    const currentUser = firebase.auth().currentUser;

    const errors = validateUserForm(params);

    if (errors.length > 0) return this.setState({ warningTexts: errors });

    if (params.displayName !== user.displayName)
      promisesChain.push(
        currentUser.updateProfile({ displayName: params.displayName })
      );

    if (params.email !== user.email)
      promisesChain.push(currentUser.updateEmail(params.email));

    if (params.password)
      promisesChain.push(currentUser.updatePassword(params.password));

    if (promisesChain.length === 0) return;

    this.setState({ isLoading: true, warningTexts: [] });

    Promise.all(promisesChain)
      .then(() => {
        const updatedUser = firebase.auth().currentUser;

        user.displayName = updatedUser.displayName;
        user.email = updatedUser.email;
        user.phoneNumber = updatedUser.phoneNumber;
        user.password = updatedUser.password;

        setUser(user);

        if (!user.phoneNumber) user.phoneNumber = "";
        if (!user.displayName) user.displayName = "";

        this.setState({ user });
      })
      .catch(error => {
        console.log(`ERROR ${error.code}: ${error.message}`);

        if (error.code === "auth/requires-recent-login") {
          this.setState({
            isPromptVisible: 2,
            promptTitle: "Antes disso...",
            promptText:
              "Precisamos validar sua ação antes de editar informações sensíveis"
          });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  removeAccount() {
    const user = firebase.auth().currentUser;

    this.setState({ isLoading: true });

    user
      .delete()
      .then(() => clearToken())
      .catch(error => {
        console.log(`ERROR ${error.code}: ${error.message}`);

        if (error.code === "auth/requires-recent-login") {
          this.setState({
            isPromptVisible: 1,
            promptTitle: "Tem certeza?",
            promptText:
              "Pense bem! Após confirmação, a conta não poderá ser recuperada"
          });
        }
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  handlePhoneChange(e) {
    const { user } = this.state;

    this.setState({
      user: { ...user, phoneNumber: e.target.rawValue }
    });
  }

  render() {
    const {
      user,
      provider,
      isLoading,
      warningTexts,
      isPromptVisible,
      promptTitle,
      promptText,
      showAccountVerification
    } = this.state;
    const token = getToken();

    if (!token || !token.user) {
      return <Redirect to="/entrar" />;
    }

    return (
      <>
        {isLoading && <Loading />}
        <AccountNotVerifiedModal
          isVisible={showAccountVerification}
          email={token.user.email}
        />
        <Prompt
          width="500"
          height="400"
          authenticate={true}
          provider={provider}
          isVisible={isPromptVisible}
          title={promptTitle}
          text={promptText}
          onConfirm={isPromptVisible ? this.removeAccount : this.updateUser}
          onCancel={() => this.setState({ isPromptVisible: 0 })}
        />
        <css.SettingsWrapper isVerified={token.user.emailVerified}>
          <css.Header>
            <css.HeaderWrapper>
              <css.UserImage
                photoURL={
                  !isLoading &&
                  (user.photoURL || token.user.providerData[0].photoURL)
                }
              >
                <css.Label htmlFor="userPhoto">
                  <FaCamera
                    size="32px"
                    color="#FFF"
                    style={css.EditPhotoIcon}
                  />
                </css.Label>
                <Input
                  id="userPhoto"
                  style={{ display: "none" }}
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={this.updatePhoto}
                />
                {user.photoURL && (
                  <FaTimes
                    size="32px"
                    color="#FFF"
                    style={css.RemovePhotoIcon}
                    onClick={() => this.removePhoto()}
                  />
                )}
              </css.UserImage>
              <css.WelcomeText>
                Olá, {token.user.displayName || token.user.email}!
              </css.WelcomeText>
              {token.user.emailVerified ? (
                <css.Badge className="verified">
                  Conta verificada <FaCheckDouble />
                </css.Badge>
              ) : (
                <css.Badge className="not-verified">
                  Conta não verificada <FaTimes />
                </css.Badge>
              )}
            </css.HeaderWrapper>
          </css.Header>
          <css.Content>
            <css.Container>
              <Row>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <css.FormTitle>Editar informações</css.FormTitle>
                </Col>
                <css.Form>
                  <Col xs={8} sm={8} md={8} lg={8}>
                    <css.Label>Nome ou Apelido</css.Label>
                    <Input
                      type="text"
                      value={user.displayName}
                      onChange={e =>
                        this.setState({
                          user: { ...user, displayName: e.target.value }
                        })
                      }
                    />
                  </Col>

                  <Col xs={4} sm={4} md={4} lg={4}>
                    <css.Label>E-mail</css.Label>
                    <Input
                      type="email"
                      disabled={provider !== "password"}
                      value={user.email}
                      onChange={e =>
                        this.setState({
                          user: { ...user, email: e.target.value }
                        })
                      }
                    />
                  </Col>

                  <Col xs={6} sm={6} md={6} lg={6}>
                    <css.Label>Nova senha</css.Label>
                    <Input
                      type="password"
                      disabled={provider !== "password"}
                      onChange={e =>
                        this.setState({
                          user: { ...user, password: e.target.value }
                        })
                      }
                    />
                  </Col>

                  <Col xs={6} sm={6} md={6} lg={6}>
                    <css.Label>Confirmação de senha</css.Label>
                    <Input
                      type="password"
                      disabled={!user.password}
                      onChange={e =>
                        this.setState({
                          user: {
                            ...user,
                            passwordConfirmation: e.target.value
                          }
                        })
                      }
                    />
                  </Col>

                  {warningTexts && (
                    <Col xs={12} sm={12} md={12} lg={12}>
                      {warningTexts.map((text, index) => (
                        <WarningText
                          key={index}
                          style={
                            index === 0
                              ? { marginTop: "3rem" }
                              : { marginTop: "0.5rem" }
                          }
                        >
                          {text}
                        </WarningText>
                      ))}
                    </Col>
                  )}

                  <Col xs={12} sm={12} md={12} lg={12}>
                    <css.CallToActionWrapper>
                      <css.DeleteAccountText>
                        Gostaria de excluir sua conta?{" "}
                        <Link
                          onClick={() =>
                            this.setState({
                              isPromptVisible: 1,
                              promptTitle: "Tem certeza?",
                              promptText:
                                "Pense bem! Após confirmação, a conta não poderá ser recuperada"
                            })
                          }
                        >
                          Clique aqui
                        </Link>
                      </css.DeleteAccountText>
                      <css.ConfirmButton
                        type="button"
                        onClick={() => this.updateUser()}
                      >
                        Confirmar edição
                      </css.ConfirmButton>
                    </css.CallToActionWrapper>
                  </Col>
                </css.Form>
              </Row>
            </css.Container>
          </css.Content>
        </css.SettingsWrapper>
      </>
    );
  }
}

export default Settings;
