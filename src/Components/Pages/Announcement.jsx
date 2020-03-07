import React, { useState } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';

const INITIAL_ANNOUNCEMENT_STATE = {
  name: "",
  description: "",
  type: "",
  begin_date: "",
  finish_date: "",
  profiles: []
};

const Announcement = () => {
  const [formAnnouncement, setFormAnnouncement] = useState(
    INITIAL_ANNOUNCEMENT_STATE,
  );
  const [formProfiles, setFormProfiles] = useState({
    name: "",
    description: ""
  });
  const [profiles, setProfiles] = useState([]);

  const handleChangeProfiles = (e) => {
    setFormProfiles({
      ...formProfiles,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProfiles = (e) => {
    e.preventDefault();
    if (formProfiles.name !== "") {
      const profilesTemp = [...profiles, formProfiles];
      setProfiles(profilesTemp);
      setFormAnnouncement({
        ...formAnnouncement,
        profiles: profilesTemp
      });
      setFormProfiles({
        name: "",
        description: ""
      });
    }
  };

  const handleChange = (e) => {
    setFormAnnouncement({
      ...setFormAnnouncement,
      [e.target.name]: e.target.value
    });
  };

  function deleteProfile(profile) {
    var temp = profiles.filter(el => el.name !== profile.name);
    setProfiles(temp);
  }

  const handleSubmit = e => {
    e.preventDefault();
    setFormAnnouncement({
      ...setFormAnnouncement,
      profiles
    });
    console.log(formAnnouncement);
    setFormAnnouncement(INITIAL_ANNOUNCEMENT_STATE);
    setProfiles([]);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col />
          <Col
            sm={12}
            md={8}
            lg={6}
            mx="auto"
            style={{
              padding: '70px 0',
            }}
          >
            <Card my={5}>
              <Card.Body>
                <Card.Title className="text-center">
                  CREAR CONVOCATORIA
                </Card.Title>
                <Card.Text>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group>
                      <Form.Label>Nombre</Form.Label>
                      <Form.Control
                        name="name"
                        onChange={handleChange}
                        value={formAnnouncement.name}
                        type="text"
                        placeholder="Nombre de la convocatoria"
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Descripción</Form.Label>
                      <Form.Control
                        name="description"
                        onChange={handleChange}
                        value={formAnnouncement.description}
                        as="textarea"
                        rows="3"
                        placeholder="Descripción de la convocatoria"
                        required
                      />
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="labels">Tipo de convocatoria</Form.Label>
                      <Form.Check
                        custom
                        onChange={handleChange}
                        value="Tiempo completo"
                        type="radio"
                        label="Tiempo completo"
                        name="typeRadio"
                        id="tcRadio"
                        required
                      />
                      <Form.Check
                        custom
                        name="typeRadio"
                        onChange={handleChange}
                        value="Catedra"
                        type="radio"
                        label="Cátedra"
                        id="tcCatedra"
                      />
                    </Form.Group>
                    <Form.Row>
                      <Form.Group as={Col} lg>
                        <Form.Label className="labels">
                          Fecha de inicio
                        </Form.Label>
                        <Form.Control
                          id="begin_date"
                          name="begin_date"
                          onChange={handleChange}
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
                          name="to"
                          onChange={handleChange}
                          value={formAnnouncement.to}
                          type="date"
                          placeholder="Fin de convocatoria"
                          required
                        />
                      </Form.Group>
                    </Form.Row>
                    <Form id="formProfiles" className="studies">
                      <Form.Label className="labels-2">Perfiles</Form.Label>
                      <Form.Row>
                        <Form.Group as={Col} lg>
                          <Form.Label className="labels">Nombre</Form.Label>
                          <Form.Control
                            name="name"
                            onChange={handleChangeProfiles}
                            value={formProfiles.name}
                            type="text"
                            required
                            placeholder="Nombre del perfil"
                          />
                          <br />
                          <Form.Label className="labels">
                            Descripción
                          </Form.Label>
                          <Form.Control
                            name="description"
                            onChange={handleChangeProfiles}
                            value={formProfiles.description}
                            as="textarea"
                            rows="3"
                            required
                            placeholder="Descripción del perfil"
                          />
                        </Form.Group>
                      </Form.Row>
                      <Button variant="danger" onClick={handleSubmitProfiles}>
                        Agregar perfil
                      </Button>
                      {Array.isArray(profiles) && profiles.length > 0 && (
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>Lista de perfiles</th>
                              <th></th>
                            </tr>
                          </thead>
                          <tbody>
                            {profiles.map(profile => (
                              <tr>
                                <td>{profile.name}</td>
                                <td>
                                  <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={() => deleteProfile(profile)}
                                  >
                                    Eliminar
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      )}
                    </Form>
                    <br />
                    <Button
                      variant="danger"
                      type="submit"
                      block
                      className="form-margin"
                    >
                      Crear convocatoria
                    </Button>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col />
        </Row>
      </Container>
    </div>
  );
};

export default Announcement;
