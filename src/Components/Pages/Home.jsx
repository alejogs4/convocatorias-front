import React from 'react';
import { NavLink } from "react-router-dom";

import Carousel from "react-bootstrap/Carousel";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import prometeo from "../../Images/prometeo.jpg";
import udem from "../../Images/udem.jpg";

function Home() {
  return (
    <div style={{
      padding: "30px 0"
    }}>
      <Container>
        <Row>
          <Col sm={6}>
            <Carousel fade>
              <Carousel.Item>
                <img
                  className="w-100 h-100"
                  src={prometeo}
                  alt="HOJA DE VIDA"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="w-100 h-100"
                  src={udem}
                  alt="LOGIN"
                />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col sm={6}>
            <Card>
              <Card.Body>
                <Card.Title><h1>Sistema de convocatorias</h1></Card.Title>
                <Card.Text className="text-justify">
                  Este es un sistema desarrollado para el programa de Ingeniería de Sistemas de la Universidad de Medellín 
                  con el fin de proveer un portal donde el Jefe de programa puede gestionar las convocatorias para docentes del programa.
                </Card.Text>
                <Button className="mr-5" variant="danger" as={NavLink} to="/curriculum">Registrar Hoja de Vida</Button>
                <Button variant="outline-danger" as={NavLink} to="/login">Ingresar al sistema</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>

  );
}

export default Home;
