import { Card, Form } from "react-bootstrap";
import PrButton from "../shared/Buttons/Button";
import React, { useEffect, useState } from "react";

const UserForm = ({ user }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName(user.name ?? "");
    setEmail(user.email ?? "");
  }, [user]);

  function onSubmit() {
    console.log({ name, email });
  }

  return (
    <Card className="shadow">
      <Card.Header style={headerStyle} className="py-3">
        User Form
      </Card.Header>
      <Card.Body className="px-4">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </Form.Group>
          <Form.Group>
            <div className="d-flex justify-content-center">
              <PrButton type="submit">
                <span>{Object.keys(user).length ? "Update" : "Save"}</span>
              </PrButton>
            </div>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

const headerStyle = {
  backgroundColor: "#4a2569",
  color: "#ffffff",
  fontWeight: "700",
};

export default UserForm;
