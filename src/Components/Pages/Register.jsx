import React from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert,
  Card
} from "react-bootstrap";
import udem from "../../Images/udem.jpg";

var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${udem})`,
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundSize: "cover"
};

export default function Register() {
  return (
    <div style={sectionStyle}>
      <Row>
        <Col></Col>
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
                    <Alert.Link href="/login"> INGRESA AQUI</Alert.Link>.
                  </Alert>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="ejemplo@udem.co"
                      />
                      <Form.Text className="text-muted">
                        Correo donde llegarán notificaciones y con el que
                        iniciarás sesión.
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
                      <Form.Control
                        type="password"
                        placeholder="Confimar contraseña"
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
        <Col></Col>
      </Row>
    </div>
  );
}
