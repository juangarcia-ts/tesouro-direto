import React from "react";
import { Container } from "react-bootstrap";
import { Simulator } from "../../components";
import { SimulationWrapper } from "./Styled";

function Simulation() {
  return (
    <Container>
      <SimulationWrapper>
        <Simulator />
      </SimulationWrapper>
    </Container>
  );
}

export default Simulation;
