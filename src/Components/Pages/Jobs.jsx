import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import JobsList from '../Organisms/JobsList';
import { useUser } from '../../state/user';
import UserInformation from '../Molecules/UserInformation';
import '../Styles/Jobs.css';

function Jobs() {
  const user = useUser();

  return (
    <Container>
      <h2>Convocatorias abiertas</h2>
      {(user.is_boss || user.is_program) && <Link to="/announcement">Crear convocatoria</Link>}
      <Row className="home-jobs-container">
        <Col sm={12} lg={!user.id ? 12 : 8}>
          <JobsList />
        </Col>
        {user.id && <Col sm={12} lg={4}><UserInformation user={user} /></Col>}
      </Row>
    </Container>
  );
}

export default Jobs;
