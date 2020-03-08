import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, ListGroupItem, ListGroup } from 'react-bootstrap';
import { differenceInCalendarDays } from 'date-fns';
import { getNaturalFormat } from '../../utils/dates';

function JobsCards({ opportunities }) {
  return (
    <div className="jobs-container">
      {opportunities.length > 0 && opportunities.map((opportunity) => {
        const creationDate = new Date(opportunity.begin_date);
        const closeDate = new Date(opportunity.final_date);

        return (
          <Card className="margin-bt" key={opportunity.id}>
            <Card.Body>
              <Card.Title>{opportunity.name}</Card.Title>
              <span className="small margin-bt">{getNaturalFormat(creationDate)}</span>
              <Card.Text>{opportunity.description}</Card.Text>
              <Card.Link as={NavLink} to={`/convocatoria/${opportunity.id}`}>Ver mas</Card.Link>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroupItem>
                <strong>Cierra el</strong>
                {' '}
                {getNaturalFormat(closeDate)}
                {' '}
                (
                {differenceInCalendarDays(closeDate, creationDate)}
                {' '}
                dias)
              </ListGroupItem>
            </ListGroup>
          </Card>
        );
      })}
    </div>
  );
}

export default JobsCards;
