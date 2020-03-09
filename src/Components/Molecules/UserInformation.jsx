import React from 'react';
import { Card } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

function UserInformation({ user }) {
  const auth = useAuth()

  return (
    <section className="sticky">
      <h2 className="margin-bt">Usuario</h2>
      <Card>
        <Card.Body>
          <Card.Title>{user.name} {user.lastname}</Card.Title>
          <Card.Text><strong>Correo: </strong>{user.email}</Card.Text>
          <Card.Link as={NavLink} to="/login" onClick={auth.logout}>Cerrar sesión</Card.Link>
        </Card.Body>
        <Card.Footer>{(user.is_boss || user.is_program) ? 'Parte del programa' : 'Usuario del sistema'}</Card.Footer>
      </Card>
    </section>
  );
}

export default UserInformation;
