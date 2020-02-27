import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import prometeo from "../../Images/prometeo.jpg";

let sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${prometeo})`,
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundSize: "cover"
};

const Login = () => {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(formLogin);
  };

  return (
    <div style={sectionStyle}>
      <Container>
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
            <Card my={5}>
              <Card.Body>
                <Card.Title className="text-center">INICIAR SESIÓN</Card.Title>
                <Card.Text>
                  <Alert variant="danger">
                    NO tienes cuenta?
                    <Alert.Link as={NavLink} to="/register">
                      {" "}
                      REGISTRATE AQUI
                    </Alert.Link>
                    .
                  </Alert>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        name="email"
                        onChange={handleChange}
                        value={formLogin.email}
                        type="email"
                        placeholder="ejemplo@udem.co"
                        required
                      />
                      <Form.Text className="text-muted">
                        Correo con el que realizó el registro.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        name="password"
                        onChange={handleChange}
                        value={formLogin.password}
                        type="password"
                        placeholder="Contraseña"
                        required
                      />
                    </Form.Group>
                    <Button variant="danger" type="submit" block>
                      INGRESAR
                    </Button>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
};

export default Login;
