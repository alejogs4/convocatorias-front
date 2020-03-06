import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Alert from "react-bootstrap/Alert";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

const INITIAL_ANNOUNCEMENT_STATE = {
  name: "",
  description: "",
  from: "",
  to: "",
  profilesList: []
};

const Announcement = () => {
  const [formAnnouncement, setFormAnnouncement] = useState(
    INITIAL_ANNOUNCEMENT_STATE
  );
  const [formProfiles, setFormProfiles] = useState({
    profile: ""
  });
  const [profilesList, setProfilesList] = useState([]);

  const handleChangeProfiles = e => {
    setFormProfiles({
      ...formProfiles,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitProfiles = e => {
    e.preventDefault();
    const profilesTemp = [...profilesList, formProfiles];

    setProfilesList(profilesTemp);
    setFormAnnouncement({
      ...formAnnouncement,
      profilesList: profilesTemp
    });
    setFormProfiles({
      profile: ""
    });
  };

  const handleChange = e => {
    setFormAnnouncement({
      ...setFormAnnouncement,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setFormAnnouncement({
      ...setFormAnnouncement,
      profilesList
    });
    console.log(formAnnouncement);
    setFormAnnouncement(INITIAL_ANNOUNCEMENT_STATE);
    setProfilesList([]);
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
              padding: "70px 0"
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
                    <Form.Row>
                      <Form.Group as={Col} lg>
                        <Form.Label className="labels">
                          Fecha de inicio
                        </Form.Label>
                        <Form.Control
                          id="from"
                          name="from"
                          onChange={handleChange}
                          value={formAnnouncement.from}
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

                    <Form id="formProfiles">
                      <Form.Row>
                        <Form.Group as={Col}>
                          <Form.Label className="labels-2">Perfiles</Form.Label>
                          <Form.Control
                            name="profile"
                            onChange={handleChangeProfiles}
                            value={formProfiles.profile}
                            type="text"
                            required
                            placeholder="Perfil para la convocatoria"
                          />
                        </Form.Group>
                      </Form.Row>
                      <Button variant="danger" onClick={handleSubmitProfiles}>
                        Agregar perfil
                      </Button>
                      {Array.isArray(profilesList) && profilesList.length > 0 && (
                        <Table responsive>
                          <thead>
                            <tr>
                              <th>Lista de perfiles</th>
                            </tr>
                          </thead>
                          <tbody>
                            {profilesList.map(profile => (
                              <tr>
                                <td>{profile.profile}</td>
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
