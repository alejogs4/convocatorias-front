import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { Container, Row, Col, Form } from "react-bootstrap";
import { Button, Card, Alert } from "react-bootstrap";

import withLogin from "../Hoc/withLogin";
import { useUserDispatch, LOGIN } from "../../state/user";
import useForm from "../Hooks/useForm";
import candidates from "../../utils/petitions/candidates.petitions";

const Profile = () => {
  const history = useHistory();
  const user = JSON.parse(localStorage.udemuser);
  const form_edit = useForm();
  const form_pass = useForm();
  const dispatch = useUserDispatch();

  const [formEdit, setFormEdit] = useState({
    email: user.email,
    name: user.name,
    lastname: user.lastname,
    oldPassword: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = (e) => {
    console.log(localStorage.udemuser);
    setFormEdit({
      ...formEdit,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmitPassword = (e) => {
    e.preventDefault();

    form_pass.updatePetitionState({ loading: true });

    if (
      formEdit.password == "" ||
      formEdit.oldPassword == "" ||
      confirmPassword == ""
    ) {
      form_pass.updatePetitionState({
        loading: false,
        error: "Llenar todos los campos",
      });
      return;
    }

    if (formEdit.password !== confirmPassword) {
      form_pass.updatePetitionState({
        loading: false,
        error: "Ambas contraseñas deben de coincidir",
      });
      return;
    }
    candidates
      .editProfile({ ...formEdit })
      .then((user) => {
        console.log(user.user);
        dispatch({ type: LOGIN, payload: user.user });
        localStorage.udemuser = JSON.stringify(user.user);

        setTimeout(() => {
          form_pass.updatePetitionState({ loading: false });
          form_pass.setSuccesfulPetition();
          form_pass.resetFormState();
          history.push("/");
        }, 500);
      })
      .catch((error) => {
        form_pass.updatePetitionState({
          loading: false,
          error: "Error modificando la contraseña",
        });
        console.log(error.message);
      });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();

    form_edit.updatePetitionState({ loading: true });

    if (
      formEdit.name == "" ||
      formEdit.lastname == "" ||
      formEdit.email == ""
    ) {
      form_edit.updatePetitionState({
        loading: false,
        error: "Llenar todos los campos",
      });
      return;
    }

    candidates
      .editProfile({ ...formEdit })
      .then((user) => {
        console.log(user.user);
        dispatch({ type: LOGIN, payload: user.user });
        localStorage.udemuser = JSON.stringify(user.user);

        setTimeout(() => {
          form_edit.updatePetitionState({ loading: false });
          form_edit.setSuccesfulPetition();
          form_edit.resetFormState();
          history.push("/");
        }, 500);
      })
      .catch((error) => {
        form_edit.updatePetitionState({
          loading: false,
          error: "Error modificando el perfil",
        });
        console.log(error.message);
      });
  };

  return (
    user && (
      <Container>
        <Row>
          <Col>
            <h2 className="jobs-header margin-bt">Editar perfil</h2>
          </Col>
        </Row>
        <Card>
          <Form id="formProfile" autoComplete="off" required>
            <Container>
              <Row>
                <Form.Group as={Col} lg>
                  <Form.Label className="labels">
                    <strong>Nombres:</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    name="name"
                    onChange={handleChange}
                    value={formEdit.name}
                    type="text"
                    placeholder="Nombre"
                  />
                </Form.Group>
                <Form.Group as={Col} lg>
                  <Form.Label className="labels">
                    <strong>Apellidos:</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    name="lastname"
                    onChange={handleChange}
                    value={formEdit.lastname}
                    type="text"
                    placeholder="Apellidos"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} lg>
                  <Form.Label className="labels">
                    <strong>Correo electrónico:</strong>
                  </Form.Label>
                  <Form.Control
                    required
                    name="email"
                    onChange={handleChange}
                    value={formEdit.email}
                    type="email"
                    placeholder="E-Mail"
                  />
                </Form.Group>
              </Row>
              <Button block variant="success" onClick={handleSubmitEdit}>
                {!form_edit.petitionState.loading
                  ? "Confirmar"
                  : "Editando ..."}
              </Button>
              <br />
              {form_edit.petitionState.error && (
                <Alert variant="danger">{form_edit.petitionState.error}</Alert>
              )}
              {form_edit.petitionState.success && (
                <Alert variant="success">
                  Cambios realizados correctamente!
                </Alert>
              )}
            </Container>
          </Form>
        </Card>
        <Row>
          <Col>
            <h2 className="jobs-header margin-bt">Cambiar contraseña</h2>
          </Col>
        </Row>
        <Card>
          <Form id="formPassword" autoComplete="off">
            <Container>
              <Row>
                <Form.Group as={Col} lg>
                  <Form.Label className="labels">
                    <strong>Contraseña actual:</strong>
                  </Form.Label>
                  <Form.Control
                    name="oldPassword"
                    onChange={handleChange}
                    value={formEdit.oldPassword}
                    type="password"
                    placeholder="Contraseña actual"
                  />
                </Form.Group>
              </Row>
              <Row>
                <Form.Group as={Col} lg>
                  <Form.Label className="labels">
                    <strong>Nueva contraseña:</strong>
                  </Form.Label>
                  <Form.Control
                    name="password"
                    onChange={handleChange}
                    value={formEdit.password}
                    type="password"
                    placeholder="Contraseña nueva"
                  />
                </Form.Group>
                <Form.Group as={Col} lg>
                  <Form.Label className="labels">
                    <strong>Confirmar contraseña:</strong>
                  </Form.Label>
                  <Form.Control
                    name="confirmPassword"
                    onChange={handleConfirmPassword}
                    value={confirmPassword}
                    type="password"
                    placeholder="Contraseña nueva"
                  />
                </Form.Group>
              </Row>
              <Button block variant="success" onClick={handleSubmitPassword}>
                {!form_pass.petitionState.loading
                  ? "Confirmar cambio"
                  : "Editando ..."}
              </Button>
              <br />
              {form_pass.petitionState.error && (
                <Alert variant="danger">{form_pass.petitionState.error}</Alert>
              )}
              {form_pass.petitionState.success && (
                <Alert variant="success">
                  Cambios realizados correctamente!
                </Alert>
              )}
            </Container>
          </Form>
        </Card>
      </Container>
    )
  );
};

export default withLogin(Profile);
