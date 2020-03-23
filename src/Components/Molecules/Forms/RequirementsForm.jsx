import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const INITIAL_FORM_REQUIREMENTS = { text: "" };

const RequirementsForm = ({ formAnnouncement, setFormAnnouncement }) => {
  const [formRequirements, setFormRequirements] = useState(
    INITIAL_FORM_REQUIREMENTS
  );
  const [requirements, setRequirements] = useState([]);

  const handleChangeRequirements = e => {
    setFormRequirements({
      ...formRequirements,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitRequirements = e => {
    e.preventDefault();

    if (formRequirements.text) {
      const requirementsTemp = [...requirements, formRequirements];
      setRequirements(requirementsTemp);

      setFormAnnouncement({
        ...formAnnouncement,
        requirements: requirementsTemp
      });

      setFormRequirements(INITIAL_FORM_REQUIREMENTS);
    }
    console.log(requirements)
  };

  return (
    <Form id="formRequirements" autoComplete="off">
      <Form.Label className="labels">Requisitos</Form.Label>
      <Form.Row>
        <Form.Group as={Col} lg>
          <Form.Control
            name="text"
            onChange={handleChangeRequirements}
            value={formRequirements.text}
            type="text"
            placeholder="Requisito"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Button variant="danger" onClick={handleSubmitRequirements}>
            Agregar
          </Button>
        </Form.Group>
      </Form.Row>
      {Array.isArray(requirements) && requirements.length > 0 && (
        <ListGroup>
          {requirements.map((requirement) => (
            <ListGroup.Item>{requirement.text}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Form>
  );
};

export default RequirementsForm;
