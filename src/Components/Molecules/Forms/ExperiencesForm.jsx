import React, { useState } from "react";

import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import TeachingExperiencesTable from "../Tables/TeachingExperiencesTable";

import { handleChangeDates } from "../../../utils/dates";

const INITIAL_EXPERIENCES_STATE = {
  academic_program: "",
  subjects: "",
  organization: "",
  begin_date: "",
  final_date: ""
};

const ExperiencesForm = ({ formCurriculum, setFormCurriculum }) => {
  const [validated, setValidated] = useState(false);

  const [formExperiences, setFormExperiences] = useState(
    INITIAL_EXPERIENCES_STATE
  );

  const [teaching_experiences, setExperiences] = useState([]);

  const handleChangeExperiences = e => {
    setFormExperiences({
      ...formExperiences,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitExperiences = e => {
    e.preventDefault();
    const allKeysFilled = Object.keys(formExperiences).every(
      k => formExperiences[k] !== ""
    );

    if (allKeysFilled) {
      const newExperiencesTemp = [...teaching_experiences, formExperiences];
      setExperiences(newExperiencesTemp);

      setFormCurriculum({
        ...formCurriculum,
        teaching_experiences: newExperiencesTemp
      });
      setFormExperiences(INITIAL_EXPERIENCES_STATE);
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  return (
    <Form
      noValidate
      validated={validated}
      id="experiencesForm"
      className="studies"
    >
      <Form.Row>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Programa Académico</Form.Label>
          <Form.Control
            name="academic_program"
            id="program"
            onChange={handleChangeExperiences}
            value={formExperiences.academic_program}
            type="text"
            placeholder="Programa Académico"
            required
            autocomplete="off"
          />{" "}
          <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa el programa académico
          </Form.Control.Feedback>
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
          <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa las asignaturas dictadas
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Institución y lugar</Form.Label>
          <Form.Control
            name="organization"
            id="institution"
            onChange={handleChangeExperiences}
            value={formExperiences.organization}
            type="text"
            placeholder="Institución y lugar"
            required
            autocomplete="off"
          />
          <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa la institución
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Duración (Desde)</Form.Label>
          <Form.Control
            name="begin_date"
            id="sinceExperience"
            onChange={handleChangeExperiences}
            value={formExperiences.begin_date}
            type="date"
            required
            placeholder="Desde ..."
          />
          <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa la fecha de inicio
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Duración (Hasta)</Form.Label>
          <Form.Control
            name="final_date"
            id="toExperience"
            onChange={handleChangeExperiences}
            value={formExperiences.final_date}
            type="date"
            required
            placeholder="Hasta ..."
          />
          <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa la fecha de finalización
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Duración (Meses)</Form.Label>
          <br />
          <Form.Control
            className="title-duration"
            value={handleChangeDates(formExperiences.begin_date, formExperiences.final_date)}
            disabled
          />
        </Form.Group>
      </Form.Row>
      <Button variant="danger" onClick={handleSubmitExperiences}>
        Agregar
      </Button>
      {Array.isArray(teaching_experiences) &&
        teaching_experiences.length > 0 && (
          <TeachingExperiencesTable
            teachingExperiences={teaching_experiences}
          />
        )}
    </Form>
  );
};

export default ExperiencesForm;
