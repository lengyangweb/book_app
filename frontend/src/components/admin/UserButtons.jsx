import React from "react";
import { Col, Row } from "react-bootstrap";
import PrButton from "../shared/Buttons/Button";

const UserButtons = ({ user }) => {
  return (
    <Row className="my-3">
      <Col sm={12} lg={3}>
        <PrButton>Remove</PrButton>
      </Col>
      <Col sm={12} lg={3}>
        <PrButton>Mark Active</PrButton>
      </Col>
    </Row>
  );
};

export default UserButtons;
