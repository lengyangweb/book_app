import React from "react";
import { Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Logo = () => {
  return (
    <LinkContainer to="/home">
      <Navbar.Brand>BMS</Navbar.Brand>
    </LinkContainer>
  );
};

export default Logo;
