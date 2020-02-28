import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import udem from "../../Images/udem.jpg";

let sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${udem})`,
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundSize: "cover"
};

const Register = () => {
  const [formRegister, setFormRegister] = useState({
    email: "",
    name: "",
    password: ""
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChange = e => {
    setFormRegister({
      ...formRegister,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirmPassword = e => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formRegister.password !== confirmPassword) {
      alert("No coinciden las contraseñas!");
    } else {
      console.log(formRegister);
    }
  };
  return (
    <div style={sectionStyle}>
      <Row>
        <Col />
        <Col
          sm={6}
          md={5}
          lg={5}
          mx="auto"
          style={{
            padding: "70px 0"
          }}
        >
          <Container>
            <Card my={5}>
              <Card.Body>
                <Card.Title className="text-center">REGISTRO</Card.Title>
                <Card.Text>
                  <Alert variant="danger">
                    Ya tienes cuenta?
                    <Alert.Link as={NavLink} to="/login">
                      {" "}
                      INGRESA AQUI.
                    </Alert.Link>
                  </Alert>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        onChange={handleChange}
                        value={formRegister.email}
                        placeholder="ejemplo@udem.co"
                        required
                      />
                      <Form.Text className="text-muted">
                        Correo donde llegarán notificaciones y con el que
                        iniciarás sesión.
                      </Form.Text>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        name="name"
                        onChange={handleChange}
                        value={formRegister.name}
                        type="text"
                        placeholder="Nombre"
                        required
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        name="password"
                        onChange={handleChange}
                        value={formRegister.password}
                        type="password"
                        placeholder="Contraseña"
                        required
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Confirmar contraseña</Form.Label>
                      <Form.Control
                        name="confirmPassword"
                        onChange={handleConfirmPassword}
                        value={confirmPassword}
                        type="password"
                        placeholder="Confimar contraseña"
                        required
                      />
                    </Form.Group>
                    <Button variant="danger" type="submit" block>
                      REGISTRARSE
                    </Button>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Container>
        </Col>
        <Col />
      </Row>
    </div>
  );
};

export default Register;
