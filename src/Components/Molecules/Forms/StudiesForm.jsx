import React, { useState } from "react";

import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import StudiesTable from "../Tables/StudiesTable";

const INITIAL_STUDIES_STATE = {
  degree: "Doctorado",
  degree_topic: "",
  begin_date: "",
  final_date: "",
  title_level_id: 2
};

const StudiesForm = ({ formCurriculum, setFormCurriculum }) => {
  const [validated, setValidated] = useState(false);

  const [formStudies, setFormStudies] = useState(INITIAL_STUDIES_STATE);

  const [studies, setStudiesDone] = useState([]);

  const handleChangeStudies = e => {
    setFormStudies({
      ...formStudies,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitStudies = (e) => {
    e.preventDefault();

    const allKeysFilled = Object.keys(formStudies).every(k => formStudies[k] !== "")

    if (allKeysFilled) {
      const studiesTemp = [...studies, formStudies];
      setStudiesDone(studiesTemp);
      setFormCurriculum({
        ...formCurriculum,
        studies: studiesTemp
      });
      setFormStudies(INITIAL_STUDIES_STATE);
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  return (
    <Form noValidate validated={validated} id="formStudies" className="studies">
      <Form.Row>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Nivel de formación</Form.Label>
          <Form.Control
            as="select"
            name="title_level_id"
            onChange={handleChangeStudies}
          >
            <option name="degree" value={2} id="phd">
              Doctorado
            </option>
            {/* <option name="degree" value="Maestría" id="master">
                  Maestría
                </option>
                <option name="degree" value="Pregrado" id="undergraduate">
                  Pregrado
                </option> */}
          </Form.Control>
          <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor, selecciona una opción válida
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Título obtenido</Form.Label>
          <Form.Control
            name="degree"
            id="title"
            onChange={handleChangeStudies}
            value={formStudies.degree}
            type="text"
            placeholder="Título"
            required
            autocomplete="off"
          />
          <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa el título obtenido
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Área de estudios</Form.Label>
          <Form.Control
            name="degree_topic"
            id="studyArea"
            onChange={handleChangeStudies}
            value={formStudies.degree_topic}
            type="text"
            placeholder="Área de estudio"
            required
            autocomplete="off"
          />
          <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa una área de estudios
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Duración (Desde)</Form.Label>
          <Form.Control
            name="begin_date"
            id="since"
            onChange={handleChangeStudies}
            value={formStudies.begin_date}
            type="date"
            required
            placeholder="Desde ..."
          />
          <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa una fecha de inicio
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Duración (Hasta)</Form.Label>
          <Form.Control
            name="final_date"
            id="to"
            onChange={handleChangeStudies}
            value={formStudies.final_date}
            type="date"
            required
            placeholder="Hasta ..."
          />
          <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor, ingresa una fecha de finalización
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Button variant="danger" onClick={handleSubmitStudies}>
        Agregar
      </Button>
      {Array.isArray(studies) && studies.length > 0 && (
        <StudiesTable studies={studies} />
      )}
    </Form>
  );
};

export default StudiesForm;
