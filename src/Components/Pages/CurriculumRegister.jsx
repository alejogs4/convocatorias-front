import React, { useState, useEffect } from 'react';
import ReactFlagsSelect from 'react-flags-select';

// https://www.npmjs.com/package/react-flags-select
import 'react-flags-select/css/react-flags-select.css';
import '../Styles/Forms.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { getCountryDisplayName } from '../../utils/countries';
import { useUser } from '../../state/user';
import { Table } from 'react-bootstrap';

const INITIAL_FORM_STATE = {
  lastnames: '',
  names: '',
  idType: '',
  idNum: '',
  nationality: 'Colombia',
  gender: '',
  birthday: '',
  birthplace: 'Colombia',
  maritalStatus: 'Soltero/a',
  personalAddress: '',
  phone: '',
  cellphone: '',
  email: '',
  studiesDone: [],
  experiences: [],
};

const CurriculumRegister = ({ history }) => {
  const [formCurriculum, setFormCurriculum] = useState(INITIAL_FORM_STATE);

  const [formStudies, setFormStudies] = useState({
    degree: 'Doctorado',
    title: '',
    area: '',
    sinceDate: '',
    toDate: '',
  });

  const [formExperiences, setFormExperiences] = useState({
    program: '',
    subjects: '',
    institution: '',
    sinceDate: '',
    toDate: '',
  });

  const [studiesDone, setStudiesDone] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const user = useUser();

  useEffect(() => {
    setFormCurriculum((c) => ({
      ...c,
      names: user.name,
      lastnames: user.lastname,
      email: user.email,
    }));
  }, [user]);

  const handleChangeCurriculum = (e) => {
    setFormCurriculum({
      ...formCurriculum,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeStudies = (e) => {
    setFormStudies({
      ...formStudies,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeExperiences = (e) => {
    setFormExperiences({
      ...formExperiences,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitCurriculum = (e) => {
    e.preventDefault();
    setFormCurriculum({
      ...formCurriculum,
      studiesDone,
      experiences,
    });
    console.log(formCurriculum);
    setFormCurriculum(INITIAL_FORM_STATE);
    history.push('/home');
  };

  const handleSubmitExperiences = (e) => {
    e.preventDefault();

    const newExperiencesTemp = [...experiences, formExperiences];
    setExperiences(newExperiencesTemp);

    setFormCurriculum({
      ...formCurriculum,
      experiences: newExperiencesTemp,
    });
    setFormExperiences({
      program: '',
      subjects: '',
      institution: '',
      sinceDate: '',
      toDate: '',
    });
  };

  const handleSubmitStudies = (e) => {
    e.preventDefault();
    const studiesTemp = [...studiesDone, formStudies];

    setStudiesDone(studiesTemp);
    setFormCurriculum({
      ...formCurriculum,
      studiesDone: studiesTemp,
    });
    setFormStudies({
      degree: 'Doctorado',
      title: '',
      area: '',
      sinceDate: '',
      toDate: '',
    });
    console.log(studiesDone);
  };

  const handleSelectFlagNationality = (countryCode) => {
    setFormCurriculum({
      ...formCurriculum,
      nationality: getCountryDisplayName(countryCode),
    });
  };
  const handleSelectFlagBirthplace = (countryCode) => {
    setFormCurriculum({
      ...formCurriculum,
      birthplace: getCountryDisplayName(countryCode),
    });
  };

  return (
    <Container>
      <Form
        id="formCurriculum"
        onSubmit={(e) => handleSubmitCurriculum(e)}
        className="curriculum"
      >
        <Form.Row>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Apellidos</Form.Label>
            <Form.Control
              id="lastnames"
              name="lastnames"
              onChange={handleChangeCurriculum}
              value={formCurriculum.lastnames}
              type="text"
              placeholder="Apellidos"
              required
              autocomplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Nombres</Form.Label>
            <Form.Control
              id="names"
              name="names"
              onChange={handleChangeCurriculum}
              value={formCurriculum.names}
              type="text"
              placeholder="Nombres"
              required
              autocomplete="off"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Identificación</Form.Label>
            <Form.Check
              custom
              onChange={handleChangeCurriculum}
              value="C.C"
              type="radio"
              label="C.C"
              name="idType"
              id="ccRadio"
              required
            />
            <Form.Check
              custom
              name="idType"
              onChange={handleChangeCurriculum}
              value="C. Ext."
              type="radio"
              label="C. Ext."
              id="cextRadio"
            />
            <Form.Check
              custom
              name="idType"
              onChange={handleChangeCurriculum}
              value="Pas."
              type="radio"
              label="Pas."
              id="pasRadio"
            />
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Número Identificación</Form.Label>
            <Form.Control
              id="idNum"
              name="idNum"
              onChange={handleChangeCurriculum}
              value={formCurriculum.idNum}
              type="text"
              placeholder="Número Identificación"
              required
              autocomplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Nacionalidad</Form.Label>
            <div>
              <ReactFlagsSelect
                defaultCountry="CO"
                name="nationality"
                onSelect={handleSelectFlagNationality}
                searchable="true"
              />
            </div>
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Género</Form.Label>
            <Form.Check
              custom
              type="radio"
              label="M."
              onChange={handleChangeCurriculum}
              value="M."
              name="gender"
              id="mRadio"
              required
            />
            <Form.Check
              custom
              type="radio"
              onChange={handleChangeCurriculum}
              value="F."
              label="F."
              name="gender"
              id="fRadio"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Fecha de nacimiento</Form.Label>
            <Form.Control
              id="birthday"
              name="birthday"
              onChange={handleChangeCurriculum}
              value={formCurriculum.birthday}
              type="date"
              placeholder="Fecha de nacimiento"
              required
            />
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Lugar de nacimiento</Form.Label>
            <div>
              <ReactFlagsSelect
                defaultCountry="CO"
                searchable="true"
                name="nationality"
                onSelect={handleSelectFlagBirthplace}
              />
            </div>
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Estado Civil</Form.Label>
            <Form.Control
              as="select"
              name="maritalStatus"
              value={formCurriculum.maritalStatus}
              onChange={handleChangeCurriculum}
            >
              <option
                id="single"
                name="maritalStatus"
                value="Soltero/a"
                required
              >
                Soltero/a
              </option>
              <option id="married" name="maritalStatus" value="Casado/a">
                Casado/a
              </option>
            </Form.Control>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Dirección personal</Form.Label>
            <Form.Control
              id="address"
              name="personalAddress"
              onChange={handleChangeCurriculum}
              value={formCurriculum.personalAddress}
              type="text"
              placeholder="Dirección"
              required
              autocomplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Teléfono fijo</Form.Label>
            <Form.Control
              id="phone"
              name="phone"
              onChange={handleChangeCurriculum}
              value={formCurriculum.phone}
              type="text"
              placeholder="Teléfono fijo"
              required
              autocomplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Teléfono celular</Form.Label>
            <Form.Control
              id="cellphone"
              name="cellphone"
              onChange={handleChangeCurriculum}
              value={formCurriculum.cellphone}
              type="text"
              placeholder="Teléfono celular"
              required
              autocomplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">E-mail</Form.Label>
            <Form.Control
              id="email"
              name="email"
              onChange={handleChangeCurriculum}
              value={formCurriculum.email}
              type="email"
              placeholder="E-mail"
              required
              autocomplete="off"
            />
          </Form.Group>
        </Form.Row>
        <hr />
        <Form.Label className="labels">Estudios realizados</Form.Label>
        <Form id="formStudies" className="studies">
          <Form.Row>
            <Form.Group as={Col} lg>
              <Form.Label className="labels-2">Nivel de formación</Form.Label>
              <Form.Control
                as="select"
                name="degree"
                value={formStudies.degree}
                onChange={handleChangeStudies}
              >
                <option name="degree" value="Doctorado" id="phd">
                  Doctorado
                </option>
                <option name="degree" value="Maestría" id="master">
                  Maestría
                </option>
                <option name="degree" value="Pregrado" id="undergraduate">
                  Pregrado
                </option>
              </Form.Control>
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
            </Form.Group>
          </Form.Row>
          <Button variant="danger" onClick={handleSubmitStudies}>
            Agregar
          </Button>
          <p>{JSON.stringify(studiesDone)}</p>
        </Form>
        <hr />
        <Form.Label className="labels">Experencia docente</Form.Label>
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
        <hr />
        <Button
          form="formCurriculum"
          type="submit"
          variant="success"
          size="lg"
          block
        >
          Registrar hoja de vida
        </Button>
      </Form>
    </Container>
  );
};

export default CurriculumRegister;
