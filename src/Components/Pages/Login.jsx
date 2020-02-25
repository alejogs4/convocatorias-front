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
import prometeo from "../../Images/prometeo.jpg";

var sectionStyle = {
  width: "100%",
  height: "100%",
  backgroundImage: `url(${prometeo})`,
  backgroundRepeat: "no-repeat",
  backgroundAttachment: "fixed",
  backgroundSize: "cover"
};

export default function Login() {
  return (
    <div style={sectionStyle}>
      <Container>
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
            <Card my={5}>
              <Card.Body>
                <Card.Title className="text-center">INICIAR SESIÓN</Card.Title>
                <Card.Text>
                  <Alert variant="danger">
                    NO tienes cuenta?
                    <Alert.Link href="/register"> REGISTRATE AQUI</Alert.Link>.
                  </Alert>
                  <Form>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="ejemplo@udem.co"
                      />
                      <Form.Text className="text-muted">
                        Correo con el que realizó el registro.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control type="password" placeholder="Contraseña" />
                    </Form.Group>
                    <Button variant="danger" type="submit" block>
                      INGRESAR
                    </Button>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
