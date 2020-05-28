import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";
import JobsList from "../Organisms/JobsList";
import { useUser } from "../../state/user";
import UserInformation from "../Molecules/UserInformation";
import "../Styles/Jobs.css";

function Jobs() {
  const user = useUser();

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="jobs-header margin-bt">Convocatorias abiertas</h2>
        </Col>
      </Row>
      <Row className="home-jobs-container">
        <Col sm={12} lg={!user.id ? 12 : 8}>
          <JobsList />
        </Col>
        {user.id && (
          <Col sm={12} lg={4} className="sticky">
            <UserInformation user={user} />
            {(user.is_boss || user.is_program) && (
              <Link className="mt-4" to="/announcement">
                <Button block className="mt-4" variant="danger">
                  Crear <strong>nueva</strong> convocatoria
                </Button>
              </Link>
            )}
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Jobs;
