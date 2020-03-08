import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import JobsList from '../Organisms/JobsList';
import { useUser } from '../../state/user';
import UserInformation from '../Molecules/UserInformation';
import '../Styles/Jobs.css';

function Jobs() {
  const user = useUser();

  return (
    <Container>
      <Row>
        <Col sm={12} lg={!user.id ? 12 : 8}><JobsList /></Col>
        {user.id && <Col sm={12} lg={4}><UserInformation user={user} /></Col>}
      </Row>
    </Container>
  );
}

export default Jobs;
