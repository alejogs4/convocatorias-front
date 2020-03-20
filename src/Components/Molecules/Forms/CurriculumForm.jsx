import React from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

import ReactFlagsSelect from 'react-flags-select';
import StudiesForm from './StudiesForm';
import ExperiencesForm from './ExperiencesForm';

import { getCountryDisplayName } from '../../../utils/countries';

// https://www.npmjs.com/package/react-flags-select
import 'react-flags-select/css/react-flags-select.css';
import '../../Styles/Forms.css';

const CurriculumForm = ({
  curriculumForm,
  formCurriculum,
  setFormCurriculum,
  onChangeCurriculum,
  onSubmitCurriculum,
}) => {
  const handleNationalitySelectors = (field) => (countryCode) => {
    setFormCurriculum({
      ...formCurriculum,
      [field]: getCountryDisplayName(countryCode),
    });
  };

  const handleMilitaryCardValue = () => {
    if (formCurriculum.gender === 'Masculino') {
      return formCurriculum.military_card;
    }
    formCurriculum.military_card = '';
    return '';
  };
  return (
    <Container>
      <Form
        id="formCurriculum"
        onSubmit={onSubmitCurriculum}
        className="curriculum"
      >
        <Form.Row>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Tipo de identificación</Form.Label>
            <Form.Check
              custom
              type="radio"
              label="Cédula"
              onChange={onChangeCurriculum}
              value="Cedula"
              name="dni_type"
              id="mRadio-cedula"
              required
            />
            <Form.Check
              custom
              type="radio"
              label="Pasaporte"
              onChange={onChangeCurriculum}
              value="Pasaporte"
              name="dni_type"
              id="mRadio-passport"
              required
            />
            <Form.Check
              custom
              type="radio"
              label="Cédula extranjera"
              onChange={onChangeCurriculum}
              value="Cedula extranjera"
              name="dni_type"
              id="mRadio-foreigner"
              required
            />
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Número Identificación</Form.Label>
            <Form.Control
              id="idNum"
              name="dni"
              onChange={onChangeCurriculum}
              value={formCurriculum.idNum}
              type="text"
              placeholder="Número Identificación"
              required
              autocomplete="off"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Tarjeta profesional</Form.Label>
            <Form.Control
              id="professional-card"
              name="professional_card"
              onChange={onChangeCurriculum}
              value={formCurriculum.professional_card}
              type="text"
              placeholder="Tarjeta profesional"
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
              label="Masculino"
              onChange={onChangeCurriculum}
              value="Masculino"
              name="gender"
              id="mRadio"
              required
            />
            <Form.Check
              custom
              type="radio"
              onChange={onChangeCurriculum}
              value="Femenino"
              label="Femenino"
              name="gender"
              id="fRadio"
            />
            <Form.Check
              custom
              type="radio"
              onChange={onChangeCurriculum}
              value="Otro"
              label="Otro"
              name="gender"
              id="otroRadio"
            />
          </Form.Group>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Libreta militar</Form.Label>
            <Form.Control
              id="military-card"
              name="military_card"
              disabled={formCurriculum.gender !== 'Masculino'}
              onChange={onChangeCurriculum}
              value={handleMilitaryCardValue()}
              type="text"
              placeholder="Libreta militar"
              autocomplete="off"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} lg>
            <Form.Label className="labels">Fecha de nacimiento</Form.Label>
            <Form.Control
              id="birthday"
              name="birthday"
              onChange={onChangeCurriculum}
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
              onChange={onChangeCurriculum}
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
              <option id="freeUnion" name="maritalStatus" value="Unión libre">
                Unión libre
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
              onChange={onChangeCurriculum}
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
              onChange={onChangeCurriculum}
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
              onChange={onChangeCurriculum}
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
        <StudiesForm
          formCurriculum={formCurriculum}
          setFormCurriculum={setFormCurriculum}
        />
        <hr />
        <Form.Label className="labels">Experencia docente</Form.Label>
        <ExperiencesForm
          formCurriculum={formCurriculum}
          setFormCurriculum={setFormCurriculum}
        />
        <hr />
        <Form.Row>
          <Form.Group as={Col} lg>
            <Form.Check
              custom
              id="checkTerms"
              required
              type="checkbox"
              label={(
                <>
                  Acepto los
                  {' '}
                  <a
                    href="https://www.udem.edu.co/index.php/categoria-noticias-recientes/3461-proteccion-de-datos-personales-2016"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    términos y condiciones
                  </a>
                  {' '}
                  de tratamiento de datos y privacidad.
                </>
              )}
              feedback="Debes aceptar los términos y condiciones"
            />
          </Form.Group>
        </Form.Row>
        <Button
          form="formCurriculum"
          type="submit"
          variant="success"
          size="lg"
          block
        >
          {curriculumForm.petitionState.loading
            ? 'Registrando...'
            : 'Registrar hoja de vida'}
        </Button>
      </Form>
      {curriculumForm.petitionState.error && (
        <Alert variant="danger">{curriculumForm.petitionState.error}</Alert>
      )}
      {curriculumForm.petitionState.success && (
        <Alert variant="success">Hoja de vida registrada con exito</Alert>
      )}
    </Container>
  );
};

export default CurriculumForm;
