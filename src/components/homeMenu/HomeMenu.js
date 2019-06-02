import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { MenuGrid, MenuBox } from "./Styled";

class HomeMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  redirectTo(link) {
    this.setState({ redirect: link });
  }

  renderOptions() {
    const { optionsList, itemsPerRow } = this.props;

    return optionsList.map((option, index) => (
      <MenuBox
        itemsPerRow={itemsPerRow}
        key={index}
        onClick={() => this.redirectTo(option.link)}
        title={option.title}
        imageURL={option.imageURL}
      />
    ));
  }

  render() {
    const { redirect } = this.state;

    if (redirect) {
      return <Redirect to={redirect} />;
    }

    return <MenuGrid>{this.renderOptions()}</MenuGrid>;
  }
}

export default HomeMenu;
