import React from "react";
import { Card, Col, Row, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

function UserInformation({ user }) {
  const auth = useAuth();

  const getUserTitle = () => {
    if (user.is_boss) return "Jefe del programa";
    if (user.is_program) return "Coordinador del programa";
    return "Aspirante";
  };

  return (
    <Card>
      <Card.Header>
        <Row>
          <Col>Logueado como</Col>
          <Col></Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <h5 className="text-muted">
          <em>{getUserTitle()}</em>
        </h5>
        <Card.Title className="first-letter-uppercase mt-3">
          {user.name} {user.lastname}
        </Card.Title>
        <Card.Text>
          <strong>Correo: </strong>
          {user.email}
        </Card.Text>

        <Card.Link as={NavLink} to="/login" onClick={auth.logout}>
          <Button className="mt-5" block variant="outline-danger" size="sm">
            Cerrar sesión
          </Button>
        </Card.Link>
      </Card.Body>
    </Card>
  );
}

export default UserInformation;
