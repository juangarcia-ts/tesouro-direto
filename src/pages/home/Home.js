import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { FaCheckDouble, FaTimes, FaCamera } from "react-icons/fa";
import { Loading } from "../../components";
import { getToken } from "../../utils/token";
import * as css from "./Styled";

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
      return <Redirect to="/auth" />;
    }

    return (
      <>
        {isLoading && <Loading />}
        <p>Oi</p>
      </>
    );
  }
}

export default Home;
