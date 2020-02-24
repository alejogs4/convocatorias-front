import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Jumbotron,
  Image
} from "react-bootstrap";
import prometeo from "../../Images/prometeo.jpg";

export default function Register() {
  return (
    <Container>
      <Row>
        <Col>
          <Image src={prometeo} fluid />
        </Col>
        <Col>
          <Jumbotron fluid>
            <Container>
              <h1>REGISTRO</h1>
              <p>
                Registrate para poder acceder y aplicar a convocatorias.
              </p>
              <br></br>
              <Button href="/login" variant="outline-danger" block>
              Ya tienes cuenta? INGRESA AQUI
            </Button>
            </Container>
          </Jumbotron>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control type="email" placeholder="ejemplo@udem.co" />
              <Form.Text className="text-muted">
                Correo donde llegarán notificaciones y con el que iniciarás sesión.
              </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Nombre" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" placeholder="Contraseña" />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirmar contraseña</Form.Label>
              <Form.Control type="password" placeholder="Confimar contraseña" />
            </Form.Group>
            <Button variant="danger" type="submit" block>
              REGISTRARSE
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
