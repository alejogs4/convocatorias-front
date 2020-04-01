import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";

import ProfilesForm from "./ProfilesForm";
import RequirementsForm from "./RequirementsForm";
import StagesForm from './StagesForm'

import jobs from "../../../utils/petitions/jobs.petitions";

const AnnouncementForm = ({
  form,
  formAnnouncement,
  setFormAnnouncement,
  onChangeAnnouncement,
  onSubmitAnnouncement,
  // profiles,
  // setProfiles
}) => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    jobs
      .getTypes()
      .then(setTypes)
      .catch(error => console.log(error.message));
  }, []);

  return (
    <Container>
      <Row>
        <Col />
        <Col
          lg
          mx="auto"
          style={{
            padding: "70px 0"
          }}
        >
          <Card my={5}>
            <Card.Body>
              <Card.Title className="text-center">
                CREAR CONVOCATORIA
              </Card.Title>
              <Card.Text>
                <Form onSubmit={onSubmitAnnouncement} autoComplete="off">
                  <Form.Group>
                    <Form.Label className="labels">Programa</Form.Label>
                    <Form.Control
                      as="select"
                      name="announcement_program"
                      value=""
                      onChange=""
                    >
                      <option
                        id="ingSistemas"
                        name="program"
                        value="Ingeniería de Sistemas"
                        required
                      >
                        Ingeniería de Sistemas
                      </option>
                      <option
                        id="ingCivil"
                        name="program"
                        value="Ingeniería Civil"
                      >
                        Ingeniería Civil
                      </option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="labels">Nombre</Form.Label>
                    <Form.Control
                      name="name"
                      onChange={onChangeAnnouncement}
                      value={formAnnouncement.name}
                      type="text"
                      placeholder="Nombre de la convocatoria"
                      required
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="labels">Descripción</Form.Label>
                    <Form.Control
                      name="description"
                      onChange={onChangeAnnouncement}
                      value={formAnnouncement.description}
                      as="textarea"
                      rows="3"
                      placeholder="Descripción de la convocatoria"
                      required
                    />
                  </Form.Group>
                  {types.length > 0 && (
                    <Form.Group>
                      <Form.Label className="labels">
                        Tipo de convocatoria
                      </Form.Label>
                      {types.map(type => (
                        <Form.Check
                          key={type.id}
                          custom
                          onChange={onChangeAnnouncement}
                          value={type.id}
                          type="radio"
                          label={type.text}
                          name="job_type_id"
                          id={type.id}
                          required
                        />
                      ))}
                    </Form.Group>
                  )}
                  <Form.Row>
                    <Form.Group as={Col} lg>
                      <Form.Label className="labels">
                        Fecha de inicio
                      </Form.Label>
                      <Form.Control
                        id="begin_date"
                        name="begin_date"
                        onChange={onChangeAnnouncement}
                        value={formAnnouncement.begin_date}
                        type="date"
                        placeholder="Inicio de convocatoria"
                        required
                      />
                    </Form.Group>
                    <Form.Group as={Col} lg>
                      <Form.Label className="labels">
                        Fecha de cierre
                      </Form.Label>
                      <Form.Control
                        id="to"
                        name="final_date"
                        onChange={onChangeAnnouncement}
                        value={formAnnouncement.final_date}
                        type="date"
                        placeholder="Fin de convocatoria"
                        required
                      />
                    </Form.Group>
                  </Form.Row>
                  <RequirementsForm
                    form={formAnnouncement}
                    setForm={setFormAnnouncement}
                  />
                  <br />
                  <StagesForm
                    formAnnouncement={formAnnouncement}
                    setFormAnnouncement={setFormAnnouncement}
                  />
                  <br />
                  <ProfilesForm
                    formAnnouncement={formAnnouncement}
                    setFormAnnouncement={setFormAnnouncement}
                    // profiles={profiles}
                    // setProfiles={setProfiles}
                  />
                  <br />
                  <Button
                    variant="success"
                    type="submit"
                    size="lg"
                    block
                    className="form-margin"
                  >
                    {!form.petitionState.loading
                      ? "Crear convocatoria"
                      : "Creando convocatoria..."}
                  </Button>
                </Form>
                {form.petitionState.error && (
                  <Alert variant="danger">{form.petitionState.error}</Alert>
                )}
                {form.petitionState.success && (
                  <Alert variant="success">Convocatoria creada</Alert>
                )}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col />
      </Row>
    </Container>
  );
};

export default AnnouncementForm;
