import React from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import StudiesForm from "./StudiesForm";
import ExperiencesForm from "./ExperiencesForm";

// https://www.npmjs.com/package/react-flags-select
import ReactFlagsSelect from "react-flags-select";
import "react-flags-select/css/react-flags-select.css";

import "../Styles/Forms.css";

const CurriculumForm = ({
  formCurriculum,
  setFormCurriculum,
  onChangeCurriculum,
  onSubmitCurriculum,
  onSelectNationality,
  onSelectBirthplace
}) => (
  <Container>
    <Form
      id="formCurriculum"
      onSubmit={onSubmitCurriculum}
      className="curriculum"
    >
      <Form.Row>
        <Form.Group as={Col} lg>
          <Form.Label className="labels">Apellidos</Form.Label>
          <Form.Control
            id="lastnames"
            name="lastnames"
            onChange={onChangeCurriculum}
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
            onChange={onChangeCurriculum}
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
            onChange={onChangeCurriculum}
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
            onChange={onChangeCurriculum}
            value="C. Ext."
            type="radio"
            label="C. Ext."
            id="cextRadio"
          />
          <Form.Check
            custom
            name="idType"
            onChange={onChangeCurriculum}
            value="Pasaporte"
            type="radio"
            label="Pasaporte"
            id="pasRadio"
          />
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels">Número Identificación</Form.Label>
          <Form.Control
            id="idNum"
            name="idNum"
            onChange={onChangeCurriculum}
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
              onSelect={onSelectNationality}
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
            onChange={onChangeCurriculum}
            value="M."
            name="gender"
            id="mRadio"
            required
          />
          <Form.Check
            custom
            type="radio"
            onChange={onChangeCurriculum}
            value="F."
            label="F."
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
              name="nationality"
              onSelect={onSelectBirthplace}
            />
          </div>
        </Form.Group>
        <Form.Group as={Col} lg>
          <Form.Label className="labels">Estado Civil</Form.Label>
          <Form.Control
            as="select"
            name="maritalStatus"
            value={formCurriculum.maritalStatus}
            onChange={onChangeCurriculum}
          >
            <option id="single" name="maritalStatus" value="Soltero/a" required>
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
            name="personalAddress"
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
            name="phone"
            onChange={onChangeCurriculum}
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
            onChange={onChangeCurriculum}
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
            onChange={onChangeCurriculum}
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
            label={
              <>
                Acepto los{" "}
                <a
                  href="https://www.udem.edu.co/index.php/categoria-noticias-recientes/3461-proteccion-de-datos-personales-2016"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  términos y condiciones
                </a>{" "}
                de tratamiento de datos
              </>
            }
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
        Registrar hoja de vida
      </Button>
    </Form>
  </Container>
);

export default CurriculumForm;
