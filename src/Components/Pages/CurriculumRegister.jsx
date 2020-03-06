import React, { useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';

// https://www.npmjs.com/package/react-flags-select
import 'react-flags-select/css/react-flags-select.css';
import '../Styles/Forms.css';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { Alert } from 'react-bootstrap';
import { getCountryDisplayName } from '../../utils/countries';
import curriculum from '../../utils/petitions/curriculum.petitions';
import useForm from '../Hooks/useForm';
import TeachingExperiencesTable from '../Molecules/Tables/TeachingExperiencesTable';
import StudiesTable from '../Molecules/Tables/StudiesTable';
import { useCurriculumDispatch, REGISTER_CV } from '../../state/curriculum';

const INITIAL_FORM_STATE = {
  dni: '',
  country: 'Colombia',
  gender: '',
  birthday: '',
  hometown: 'Colombia',
  civil_status: 'Soltero/a',
  personal_address: '',
  home_phone: '',
  cellphone_phone: '',
  studies: [],
  teaching_experiences: [],
};

const INITIAL_STUDIES_STATE = {
  degree: 'Doctorado',
  degree_topic: '',
  begin_date: '',
  final_date: '',
  title_level_id: 2,
};

const INITIAL_EXPERIENCES_STATE = {
  academic_program: '',
  subjects: '',
  organization: '',
  begin_date: '',
  final_date: '',
};

const CurriculumRegister = ({ history }) => {
  const [formCurriculum, setFormCurriculum] = useState(INITIAL_FORM_STATE);
  const [formStudies, setFormStudies] = useState(INITIAL_STUDIES_STATE);
  const [formExperiences, setFormExperiences] = useState(INITIAL_EXPERIENCES_STATE);

  const [studies, setStudiesDone] = useState([]);
  const [teaching_experiences, setExperiences] = useState([]);

  const curriculumForm = useForm();
  const curriculumDispacth = useCurriculumDispatch();

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

    curriculumForm.updatePetitionState({ loading: true });

    curriculum.registerCurriculum({
      ...formCurriculum,
      studies,
      teaching_experiences,
    }).then((curriculum) => {
      setFormCurriculum(INITIAL_FORM_STATE);
      curriculumForm.resetFormState();
      curriculumDispacth({ type: REGISTER_CV, payload: curriculum });

      history.push('/home');
    })
      .catch(() => {
        curriculumForm.updatePetitionState({ loading: false, error: 'Error registrando hoja de vida' });
      });
  };

  const handleSubmitExperiences = (e) => {
    e.preventDefault();

    const newExperiencesTemp = [...teaching_experiences, formExperiences];
    setExperiences(newExperiencesTemp);

    setFormCurriculum({
      ...formCurriculum,
      teaching_experiences: newExperiencesTemp,
    });
    setFormExperiences(INITIAL_EXPERIENCES_STATE);
  };

  const handleSubmitStudies = (e) => {
    const studiesTemp = [...studies, formStudies];

    setStudiesDone(studiesTemp);
    setFormCurriculum({
      ...formCurriculum,
      studies: studiesTemp,
    });

    setFormStudies(INITIAL_STUDIES_STATE);
  };

  const handleNationalitySelectors = (field) => (countryCode) => {
    setFormCurriculum({
      ...formCurriculum,
      [field]: getCountryDisplayName(countryCode),
    });
  };

  return (
    <Container>
      <Form
        id="formCurriculum"
        onSubmit={handleSubmitCurriculum}
        className="curriculum"
      >
        <Form.Row>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Número Identificación</Form.Label>
            <Form.Control
              id="idNum"
              name="dni"
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
                name="country"
                onSelect={handleNationalitySelectors('country')}
                searchable="true"
              />
            </div>
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Género</Form.Label>
            <Form.Check
              custom
              type="radio"
              label="M"
              onChange={handleChangeCurriculum}
              value="M"
              name="gender"
              id="mRadio"
              required
            />
            <Form.Check
              custom
              type="radio"
              onChange={handleChangeCurriculum}
              value="F"
              label="F"
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
                name="hometown"
                onSelect={handleNationalitySelectors('hometown')}
              />
            </div>
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Estado Civil</Form.Label>
            <Form.Control
              as="select"
              name="civil_status"
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
              name="personal_address"
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
              name="home_phone"
              onChange={handleChangeCurriculum}
              value={formCurriculum.phone}
              type="number"
              placeholder="Teléfono fijo"
              required
              autocomplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Teléfono celular</Form.Label>
            <Form.Control
              id="cellphone"
              name="cellphone_phone"
              onChange={handleChangeCurriculum}
              value={formCurriculum.cellphone}
              type="number"
              placeholder="Teléfono celular"
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
            </Form.Group>
          </Form.Row>
          <Button variant="danger" onClick={handleSubmitStudies}>
            Agregar
          </Button>
          {Array.isArray(studies) && studies.length > 0 && <StudiesTable studies={studies} />}
        </Form>
        <hr />
        <Form.Label className="labels">Experencia docente</Form.Label>
        <Form id="experiencesForm" className="studies">
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
                name="organization"
                id="institution"
                onChange={handleChangeExperiences}
                value={formExperiences.organization}
                type="text"
                placeholder="Institución y lugar"
                required
                autocomplete="off"
              />
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
            </Form.Group>
          </Form.Row>
          <Button variant="danger" onClick={handleSubmitExperiences}>
            Agregar
          </Button>
          {Array.isArray(teaching_experiences) && teaching_experiences.length > 0 && (
            <TeachingExperiencesTable teachingExperiences={teaching_experiences} />
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
          {curriculumForm.petitionState.loading ? 'Registrando...' : 'Registrar hoja de vida'}
        </Button>
      </Form>
      {curriculumForm.petitionState.error && <Alert variant="danger">{curriculumForm.petitionState.error}</Alert>}
    </Container>
  );
};

export default CurriculumRegister;
