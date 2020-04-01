import React, { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const INITIAL_FORM_REQUIREMENTS = { text: "" };

const RequirementsForm = ({ form, setForm }) => {
  const [requirements, setRequirements] = useState([]);
  const [formRequirements, setFormRequirements] = useState(
    INITIAL_FORM_REQUIREMENTS
  );

  useEffect(()=> {
    setRequirements(form.requirements)
    //console.log("effect")
  })

  const handleChangeRequirements = e => {
    setFormRequirements({
      ...formRequirements,
      [e.target.name]: e.target.value
    });
    //console.log(form);
  };

  const handleSubmitRequirements = e => {
    e.preventDefault();

    if (formRequirements.text) {
      const requirementsTemp = [...requirements, formRequirements];
      setRequirements(requirementsTemp);

      setForm({
        ...form,
        requirements: requirementsTemp
      });

      setFormRequirements(INITIAL_FORM_REQUIREMENTS);
    }
    //console.log(requirements);
  };

  function deleteRequirement(requirement) {
    //setRequirements(requirements.filter(req => req.text !== requirement.text));
    setRequirements(requirements.splice(requirements.indexOf(requirement),1))
    //console.log(form.requirements)
  }

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
          <Button
            block
            variant="outline-danger"
            onClick={handleSubmitRequirements}
          >
            Agregar
          </Button>
        </Form.Group>
      </Form.Row>
      {Array.isArray(requirements) && requirements.length > 0 && (
        <ListGroup>
          {requirements.map(requirement => (
            <Container>
              <Row>
                <Col>
                  <ListGroup.Item>
                    <strong>{requirements.indexOf(requirement) + 1}. </strong>
                    {requirement.text}
                  </ListGroup.Item>
                </Col>
                <Col>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => deleteRequirement(requirement)}
                  >
                    Eliminar
                  </Button>
                </Col>
              </Row>
            </Container>
          ))}
        </ListGroup>
      )}
    </Form>
  );
};

export default RequirementsForm;
