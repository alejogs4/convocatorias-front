import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

function UserInformation({ user }) {
  const auth = useAuth();

  const getUserTitle = () => {
    if (user.is_boss) return 'Jefe del programa'
    if (user.is_program) return 'Coordinador del programa'
    return 'Aspirante'
  }

  return (
    <>
      <Card as="section" className="sticky">
        <Card.Body>
          <Card.Title className="first-letter-uppercase">{user.name} {user.lastname}</Card.Title>
          <Card.Text><strong>Correo: </strong>{user.email}</Card.Text>
          <Card.Link as={NavLink} to="/login" onClick={auth.logout}>Cerrar sesión</Card.Link>
        </Card.Body>
        <Card.Footer>{getUserTitle()}</Card.Footer>
      </Card>
    </>
  );
}

export default UserInformation;
