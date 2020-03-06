import React, { useState } from "react";

import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const ExperiencesForm = ({ formCurriculum, setFormCurriculum }) => {
  const [formExperiences, setFormExperiences] = useState({
    program: "",
    subjects: "",
    institution: "",
    sinceDate: "",
    toDate: ""
  });

  const [experiences, setExperiences] = useState([]);

  const handleChangeExperiences = e => {
    setFormExperiences({
      ...formExperiences,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitExperiences = e => {
    e.preventDefault();

    const newExperiencesTemp = [...experiences, formExperiences];
    setExperiences(newExperiencesTemp);

    setFormCurriculum({
      ...formCurriculum,
      experiences: newExperiencesTemp
    });
    setFormExperiences({
      program: "",
      subjects: "",
      institution: "",
      sinceDate: "",
      toDate: ""
    });
  };
  return (
    <Form id="experiencesForm" className="studies">
      <Form.Row>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Programa Académico</Form.Label>
          <Form.Control
            name="program"
            id="program"
            onChange={handleChangeExperiences}
            value={formExperiences.program}
            type="text"
            placeholder="Programa Académico"
            required
            autocomplete="off"
          />
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Asignaturas dictadas</Form.Label>
          <Form.Control
            name="subjects"
            id="subjects"
            onChange={handleChangeExperiences}
            value={formExperiences.subjects}
            type="text"
            placeholder="Asignaturas dictadas"
            required
            autocomplete="off"
          />
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Institución y lugar</Form.Label>
          <Form.Control
            name="institution"
            id="institution"
            onChange={handleChangeExperiences}
            value={formExperiences.institution}
            type="text"
            placeholder="Institución y lugar"
            required
            autocomplete="off"
          />
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Duración (Desde)</Form.Label>
          <Form.Control
            name="sinceDate"
            id="sinceExperience"
            onChange={handleChangeExperiences}
            value={formExperiences.sinceDate}
            type="date"
            required
            placeholder="Desde ..."
          />
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Duración (Hasta)</Form.Label>
          <Form.Control
            name="toDate"
            id="toExperience"
            onChange={handleChangeExperiences}
            value={formExperiences.toDate}
            type="date"
            required
            placeholder="Hasta ..."
          />
        </Form.Group>
      </Form.Row>
      <Button variant="danger" onClick={handleSubmitExperiences}>
        Agregar
      </Button>
      {Array.isArray(experiences) && experiences.length > 0 && (
        <Table responsive>
          <thead>
            <tr>
              <th>Programa</th>
              <th>Materias</th>
              <th>Institucion</th>
              <th>Desde</th>
              <th>Hasta</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map(experience => (
              <tr>
                <td>{experience.program}</td>
                <td>{experience.subjects}</td>
                <td>{experience.institution}</td>
                <td>{experience.sinceDate}</td>
                <td>{experience.toDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Form>
  );
};

export default ExperiencesForm;
