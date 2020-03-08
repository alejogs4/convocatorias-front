import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import Alert from "react-bootstrap/Alert";
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import withLogin from '../Hoc/withLogin';
import jobs from '../../utils/petitions/jobs.petitions';
import { useHistory } from 'react-router-dom';
import useForm from '../Hooks/useForm';
import { Alert } from 'react-bootstrap';

const INITIAL_ANNOUNCEMENT_STATE = {
  name: '',
  description: '',
  job_type_id: 1,
  begin_date: '',
  final_date: '',
  profiles: [],
};

const INITIAL_FORM_PROFILE = { name: '', description: '' };

const Announcement = () => {
  const history = useHistory();
  const form = useForm();

  const [formAnnouncement, setFormAnnouncement] = useState(INITIAL_ANNOUNCEMENT_STATE);
  const [formProfiles, setFormProfiles] = useState(INITIAL_FORM_PROFILE);
  const [profiles, setProfiles] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    jobs.getTypes().then(setTypes).catch((error) => console.log(error.message));
  }, []);

  const handleChangeProfiles = (e) => {
    setFormProfiles({
      ...formProfiles,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProfiles = (e) => {
    e.preventDefault();

    if (formProfiles.name) {
      const profilesTemp = [...profiles, formProfiles];
      setProfiles(profilesTemp);

      setFormAnnouncement({
        ...formAnnouncement,
        profiles: profilesTemp,
      });

      setFormProfiles(INITIAL_FORM_PROFILE);
    }
  };

  const handleChange = (e) => {
    setFormAnnouncement({
      ...formAnnouncement,
      [e.target.name]: e.target.value,
    });
  };

  function deleteProfile(profile) {
    setProfiles(profiles.filter((el) => el.name !== profile.name));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    form.updatePetitionState({ loading: true });

    jobs.createJobOpportunity({ ...formAnnouncement, profiles })
      .then(() => {
        setFormAnnouncement(INITIAL_ANNOUNCEMENT_STATE);
        setProfiles([]);
        form.updatePetitionState({ loading: false });
        form.setSuccesfulPetition();

        setTimeout(() => {
          form.resetFormState();
          history.push('/');
        }, 2000);
      })
      .catch((error) => {
        form.updatePetitionState({ loading: false, error: 'Error creando convocatoria' });
        console.log(error.message);
      });
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
                    {types.length > 0 && (
                      <Form.Group>
                        <Form.Label className="labels">Tipo de convocatoria</Form.Label>
                        {types.map((type) => (
                          <Form.Check
                            key={type.id}
                            custom
                            onChange={handleChange}
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
                          name="final_date"
                          onChange={handleChange}
                          value={formAnnouncement.final_date}
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
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {profiles.map((profile) => (
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
                      {!form.petitionState.loading ? 'Crear convocatoria' : 'Creando convocatoria...'}
                    </Button>
                  </Form>
                  {form.petitionState.error && <Alert variant="danger">{form.petitionState.error}</Alert>}
                  {form.petitionState.success && <Alert variant="success">Convocatoria creada</Alert>}
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

export default withLogin(Announcement);
