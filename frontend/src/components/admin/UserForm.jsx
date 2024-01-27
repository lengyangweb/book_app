import { useForm } from "react-hook-form";
import { Card, Form } from "react-bootstrap";
import React, { useEffect, useMemo, useState } from "react";
import {
  useRegisterUserMutation,
  useUpdateUserInfoMutation,
} from "../../slices/userApiSlice";
import { InputText } from "primereact/inputtext";

const UserForm = ({ user }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const { name, email } = user;
    reset({ name, email });
  }, [user]);

  const [registerUser] = useRegisterUserMutation();
  const [updateUser] = useUpdateUserInfoMutation();

  function onSubmit(data) {
    // run method
    user ? handleUpdate(data) : handleRegister(data);
  }

  function handleRegister(data) {
    console.log(`Registering user...`);
  }

  function handleUpdate(data) {
    console.log(`Updating user...`);
  }

  return (
    <Card className="shadow">
      <Card.Header style={headerStyle} className="py-3">
        User Form
      </Card.Header>
      <Card.Body className="px-4">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label htmlFor="name">Name</Form.Label>
            <Form.Control
              id="name"
              name="name"
              autoComplete="name"
              {...register("name", { required: `Required` })}
            />
            {errors.name && (
              <span className="text-danger">{errors.name?.message}</span>
            )}
          </Form.Group>
          <Form.Group className="my-3">
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              {...register("email", { required: "Required" })}
            />
            {errors.email && (
              <span className="text-danger">{errors.email?.message}</span>
            )}
          </Form.Group>
          <Form.Group>
            <div className="d-flex justify-content-center">
              <button className="btn btn-outline-primary w-25" type="submit">
                <span>{Object.keys(user).length ? "Update" : "Save"}</span>
              </button>
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
