import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

function UserInformation({ user }) {
  const auth = useAuth();

  return (
    <>
      <Card as="section" className="sticky">
        <Card.Body>
          <Card.Title className="first-letter-uppercase">{user.name} {user.lastname}</Card.Title>
          <Card.Text><strong>Correo: </strong>{user.email}</Card.Text>
          <Card.Link as={NavLink} to="/login" onClick={auth.logout}>Cerrar sesión</Card.Link>
        </Card.Body>
        <Card.Footer>{(user.is_boss || user.is_program) ? 'Jefe de programa' : 'Aspirante'}</Card.Footer>
      </Card>
    </>
  );
}

export default UserInformation;
