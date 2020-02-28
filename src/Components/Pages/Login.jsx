import React, { useState, useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';

import prometeo from '../../Images/prometeo.jpg';
import useForm from '../Hooks/useForm';
import auth from '../../utils/petitions/auth.petitions';

const sectionStyle = {
  width: '100%',
  height: '100%',
  backgroundImage: `url(${prometeo})`,
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundSize: 'cover',
};

const INITIAL_LOGIN_STATE = {
  email: '',
  password: '',
};

const Login = () => {
  const [formLogin, setFormLogin] = useState(INITIAL_LOGIN_STATE);
  const [cameFromSignip, setCameFromRegistry] = useState(false);

  const form = useForm();
  const history = useHistory();

  useEffect(() => {
    setCameFromRegistry(window.location.href.includes('?success'));
  }, []);

  const handleChange = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    form.updatePetitionState({ loading: true, error: null });
    setFormLogin(INITIAL_LOGIN_STATE);

    auth.login(formLogin)
      .then(({ user, token }) => {
        form.updatePetitionState({ loading: false });
        localStorage.setItem('udemuser', JSON.stringify(user));
        localStorage.setItem('token', token);
        history.push('/');
      })
      .catch(() => {
        form.updatePetitionState({ loading: false, error: 'El usuario o la contraseña son incorrectas.' });
      });
  };

  return (
    <div style={sectionStyle}>
      <Container>
        <Row>
          <Col />
          <Col
            sm={6}
            md={5}
            lg={5}
            mx="auto"
            style={{
              padding: '70px 0',
            }}
          >
            <Card my={5}>
              <Card.Body>
                <Card.Title className="text-center">INICIAR SESIÓN</Card.Title>
                <Card.Text>
                  <Alert variant={cameFromSignip ? 'success' : 'danger'}>
                    {!cameFromSignip ? (
                      <>
                        NO tienes cuenta?
                        <Alert.Link as={NavLink} to="/register">
                          {' '}
                          REGISTRATE AQUI
                        </Alert.Link>
                        .
                      </>
                    ) : <>Te has registrado con exito</>}
                  </Alert>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Correo electrónico</Form.Label>
                      <Form.Control
                        name="email"
                        onChange={handleChange}
                        value={formLogin.email}
                        type="email"
                        placeholder="ejemplo@udem.co"
                        required
                      />
                      <Form.Text className="text-muted">
                        Correo con el que realizó el registro.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Contraseña</Form.Label>
                      <Form.Control
                        name="password"
                        onChange={handleChange}
                        value={formLogin.password}
                        type="password"
                        placeholder="Contraseña"
                        required
                      />
                    </Form.Group>
                    <Button variant="danger" type="submit" block className="form-margin">
                      {form.petitionState.loading ? 'Ingresando...' : 'Ingresar'}
                    </Button>
                    {form.petitionState.error && (
                      <Alert variant="danger">
                        {form.petitionState.error}
                      </Alert>
                    )}
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

export default Login;
