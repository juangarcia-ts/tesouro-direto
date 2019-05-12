import React, { Component } from "react";
import * as firebase from "firebase/app";
import { getToken, clearToken } from "../../utils/token";
import { Loading } from "../../components";
import * as css from "./Styled";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  updateUser() {}

  removeAccount() {
    const user = firebase.auth().currentUser;

    user
      .delete()
      .then(response => clearToken())
      .catch(error => {
        console.log(`ERROR ${error.code}: ${error.message}`);
      })
      .finally(() => this.setState({ isLoading: false }));
  }

  render() {
    const { isLoading } = this.state;
    const token = getToken();

    console.log(token.user);

    return (
      <>
        {isLoading && <Loading />}
        <css.Header>
          <css.HeaderWrapper>
            <css.UserImage photoURL={token.user.photoURL} />
          </css.HeaderWrapper>
        </css.Header>
        <css.Content>
          <css.Container className="container">Oi</css.Container>
        </css.Content>
        <css.WelcomeText>Bem-vindo, {token.user.email}!</css.WelcomeText>
      </>
    );
  }
}

export default Home;
