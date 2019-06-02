import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Loading, HomeMenu } from "../../components";
import { menuOptions } from "../../utils/data";
import { getToken } from "../../utils/token";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false
    };
  }

  render() {
    const { isLoading } = this.state;
    const token = getToken();

    if (!token || !token.user) {
      return <Redirect to="/entrar" />;
    }

    return (
      <>
        {isLoading && <Loading />}
        <Container>
          <HomeMenu itemsPerRow={3} optionsList={menuOptions} />
        </Container>
      </>
    );
  }
}

export default Home;
