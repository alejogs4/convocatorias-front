import React, { useState } from "react";

import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

const StudiesForm = ({ formCurriculum, setFormCurriculum }) => {
  const [validated, setValidated] = useState(false);

  const [formStudies, setFormStudies] = useState({
    degree: "Pregrado",
    title: "",
    area: "",
    sinceDate: "",
    toDate: ""
  });

  const [studiesDone, setStudiesDone] = useState([]);

  const handleChangeStudies = e => {
    setFormStudies({
      ...formStudies,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitStudies = e => {
    e.preventDefault();
    if (Object.keys(formStudies).every(k => formStudies[k] !== "")) {
      console.log("esta bien");
      const studiesTemp = [...studiesDone, formStudies];

      setStudiesDone(studiesTemp);
      setFormCurriculum({
        ...formCurriculum,
        studiesDone: studiesTemp
      });
      setFormStudies({
        degree: "Pregrado",
        title: "",
        area: "",
        sinceDate: "",
        toDate: ""
      });
      console.log(studiesDone);
      setValidated(false);
    } else {
      console.log("no esta bien");
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
            name="degree"
            value={formStudies.degree}
            onChange={handleChangeStudies}
          >
            <option name="degree" value="Pregrado" id="undergraduate">
              Pregrado
            </option>
            <option name="degree" value="Especialización" id="specialization">
              Especialización
            </option>
            <option name="degree" value="Maestría" id="master">
              Maestría
            </option>
            <option name="degree" value="Doctorado" id="phd">
              Doctorado
            </option>
          </Form.Control>
          <Form.Control.Feedback>Correcto!</Form.Control.Feedback>
          <Form.Control.Feedback type="invalid">
            Por favor, selecciona una opción válida
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels-2">Título obtenido</Form.Label>
          <Form.Control
            name="title"
            id="title"
            onChange={handleChangeStudies}
            value={formStudies.title}
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
            name="area"
            id="studyArea"
            onChange={handleChangeStudies}
            value={formStudies.area}
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
            name="sinceDate"
            id="since"
            onChange={handleChangeStudies}
            value={formStudies.sinceDate}
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
            name="toDate"
            id="to"
            onChange={handleChangeStudies}
            value={formStudies.toDate}
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
      {Array.isArray(studiesDone) && studiesDone.length > 0 && (
        <Table responsive>
          <thead>
            <tr>
              <th>Nivel de formación</th>
              <th>Título obtenido</th>
              <th>Área de estudios</th>
              <th>Desde</th>
              <th>Hasta</th>
            </tr>
          </thead>
          <tbody>
            {studiesDone.map(studiesDone => (
              <tr>
                <td>{studiesDone.degree}</td>
                <td>{studiesDone.title}</td>
                <td>{studiesDone.area}</td>
                <td>{studiesDone.sinceDate}</td>
                <td>{studiesDone.toDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Form>
  );
};

export default StudiesForm;
