import React from "react";
import { NavLink } from "react-router-dom";
import { Card, Button, Row, Col } from "react-bootstrap";
import { differenceInCalendarDays } from "date-fns";
import { getNaturalFormat } from "../../utils/dates";
import { useUser } from "../../state/user";

function JobsCards({ opportunities }) {
  const user = useUser();

  return (
    <div className="jobs-container">
      {opportunities.length > 0 &&
        opportunities.map(opportunity => {
          const creationDate = new Date(opportunity.begin_date);
          const closeDate = new Date(opportunity.final_date);

          return (
            <Card className="margin-bt" key={opportunity.id}>
              <Card.Body>
                <Card.Title>
                  <h3>
                    <em>{opportunity.name}</em>
                  </h3>
                </Card.Title>
                <Row>
                  <Col>
                    <span className="small margin-bt text-muted">
                      Publicada el {getNaturalFormat(creationDate)}
                    </span>
                  </Col>
                  <Col></Col>
                </Row>
                <Card.Text>{opportunity.description}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Row>
                  <Col>
                    <Card.Link
                      as={NavLink}
                      to={`/convocatoria/${opportunity.id}`}
                    >
                      <Button variant="outline-dark" size="sm">
                        Más información
                      </Button>
                    </Card.Link>
                    {user.is_boss && (
                      <Card.Link
                        as={NavLink}
                        to={`/aspirantes/convocatoria/${opportunity.id}`}
                      >
                        <Button variant="outline-info" size="sm">
                          Aspirantes inscritos
                        </Button>
                      </Card.Link>
                    )}
                  </Col>
                  <Col>
                    {differenceInCalendarDays(closeDate, new Date()) > 0 && (
                      <label>
                        Cierra el{" "}
                        <strong>{getNaturalFormat(closeDate)} </strong>(
                        <em>
                          {differenceInCalendarDays(closeDate, new Date())} dias
                        </em>
                        )
                      </label>
                    )}
                    {differenceInCalendarDays(closeDate, new Date()) === 0 && (
                      <label>
                        Cierra el{" "}
                        <strong>{getNaturalFormat(closeDate)} </strong>(
                        <em className="text-info">
                          HOY
                        </em>
                        )
                      </label>
                    )}
                    {differenceInCalendarDays(closeDate, new Date()) < 0 && (
                      <label>
                        Cierra el{" "}
                        <strong>{getNaturalFormat(closeDate)} </strong>(
                        <em className="text-danger">
                          CERRADA
                        </em>
                        )
                      </label>
                    )}
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          );
        })}
    </div>
  );
}

export default JobsCards;
