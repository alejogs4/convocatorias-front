import React, { useState } from "react";

import ReactFlagsSelect from "react-flags-select";

// https://www.npmjs.com/package/react-flags-select
import "react-flags-select/css/react-flags-select.css";
import "../Styles/Forms.css";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { getCountryDisplayName } from "../../utils/countries";

const CurriculumRegister = ({ history }) => {
  const [formCurriculum, setFormCurriculum] = useState({
    lastnames: "",
    names: "",
    idType: "",
    idNum: "",
    nationality: "Colombia",
    gender: "",
    birthday: "",
    birthplace: "Colombia",
    maritalStatus: "Soltero/a",
    personalAddress: "",
    phone: "",
    cellphone: "",
    email: "",
    studiesDone: [],
    experiences: []
  });

  const [formStudies, setFormStudies] = useState({
    degree: "Doctorado",
    title: "",
    area: "",
    sinceDate: "",
    toDate: ""
  });

  const [formExperiences, setFormExperiences] = useState({
    program: "",
    subjects: "",
    institution: "",
    sinceDate: "",
    toDate: ""
  });

  const [studiesDone, setStudiesDone] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const handleChangeCurriculum = e => {
    setFormCurriculum({
      ...formCurriculum,
      [e.target.name]: e.target.value
    });
  };

  const handleChangeStudies = e => {
    setFormStudies({
      ...formStudies,
      [e.target.name]: e.target.value
    });
    console.log(e.target.value);
  };

  const handleChangeExperiences = e => {
    setFormExperiences({
      ...formExperiences,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitCurriculum = e => {
    e.preventDefault();
    setFormCurriculum({
      ...formCurriculum,
      studiesDone: studiesDone,
      experiences: experiences
    });
    console.log(formCurriculum);
    setFormCurriculum({
      lastnames: "",
      names: "",
      idType: "",
      idNum: "",
      nationality: "Colombia",
      gender: "",
      birthday: "",
      birthplace: "Colombia",
      maritalStatus: "Soltero/a",
      personalAddress: "",
      phone: "",
      cellphone: "",
      email: "",
      studiesDone: [],
      experiences: []
    });
    history.push("/home");
  };

  const handleSubmitExperiences = e => {
    e.preventDefault();
    let experiencesTemp = experiences;
    experiencesTemp.push(formExperiences);
    setExperiences(experiencesTemp);
    setFormExperiences({
      program: "",
      subjects: "",
      institution: "",
      sinceDate: "",
      toDate: ""
    });
  };

  const handleSubmitStudies = e => {
    e.preventDefault();
    let studiesTemp = studiesDone;
    studiesTemp.push(formStudies);
    setStudiesDone(studiesTemp);
    setFormStudies({
      degree: "Doctorado",
      title: "",
      area: "",
      sinceDate: "",
      toDate: ""
    });
    console.log(studiesDone);
  };

  const handleSelectFlagNationality = countryCode => {
    setFormCurriculum({
      ...formCurriculum,
      nationality: getCountryDisplayName(countryCode)
    });
  };
  const handleSelectFlagBirthplace = countryCode => {
    setFormCurriculum({
      ...formCurriculum,
      birthplace: getCountryDisplayName(countryCode)
    });
  };

  return (
    <Container>
      <Form onSubmit={e => handleSubmitCurriculum(e)} className="curriculum">
        <Form.Row>
          <Form.Group as={Col} lg={true}>
            <Form.Label className="labels">Apellidos</Form.Label>
            <Form.Control
              id="lastnames"
              name="lastnames"
              onChange={e => handleChangeCurriculum(e)}
              value={formCurriculum.lastnames}
              type="text"
              placeholder="Apellidos"
              required
              autocomplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} lg={true}>
            <Form.Label className="labels">Nombres</Form.Label>
            <Form.Control
              id="names"
              name="names"
              onChange={e => handleChangeCurriculum(e)}
              value={formCurriculum.names}
              type="text"
              placeholder="Nombres"
              required
              autocomplete="off"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} lg={true}>
            <Form.Label className="labels">Identificación</Form.Label>
            <Form.Check
              custom
              onChange={e => handleChangeCurriculum(e)}
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
              onChange={e => handleChangeCurriculum(e)}
              value="C. Ext."
              type="radio"
              label="C. Ext."
              id="cextRadio"
            />
            <Form.Check
              custom
              name="idType"
              onChange={e => handleChangeCurriculum(e)}
              value="Pas."
              type="radio"
              label="Pas."
              id="pasRadio"
            />
          </Form.Group>
          <Form.Group as={Col} lg={true}>
            <Form.Label className="labels">Número Identificación</Form.Label>
            <Form.Control
              id="idNum"
              name="idNum"
              onChange={e => handleChangeCurriculum(e)}
              value={formCurriculum.idNum}
              type="text"
              placeholder="Número Identificación"
              required
              autocomplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} lg={true}>
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
          <Form.Group as={Col} lg={true}>
            <Form.Label className="labels">Género</Form.Label>
            <Form.Check
              custom
              type="radio"
              label="M."
              onChange={e => handleChangeCurriculum(e)}
              value="M."
              name="gender"
              id="mRadio"
              required
            />
            <Form.Check
              custom
              type="radio"
              onChange={e => handleChangeCurriculum(e)}
              value="F."
              label="F."
              name="gender"
              id="fRadio"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col} lg={true}>
            <Form.Label className="labels">Fecha de nacimiento</Form.Label>
            <Form.Control
              id="birthday"
              name="birthday"
              onChange={e => handleChangeCurriculum(e)}
              value={formCurriculum.birthday}
              type="date"
              placeholder="Fecha de nacimiento"
              required
            />
          </Form.Group>
          <Form.Group as={Col} lg={true}>
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
          <Form.Group as={Col} lg={true}>
            <Form.Label className="labels">Estado Civil</Form.Label>
            <Form.Control
              as="select"
              name="maritalStatus"
              value={formCurriculum.maritalStatus}
              onChange={e => handleChangeCurriculum(e)}
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
          <Form.Group as={Col} lg={true}>
            <Form.Label className="labels">Dirección personal</Form.Label>
            <Form.Control
              id="address"
              name="personalAddress"
              onChange={e => handleChangeCurriculum(e)}
              value={formCurriculum.personalAddress}
              type="text"
              placeholder="Dirección"
              required
              autocomplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} lg={true}>
            <Form.Label className="labels">Teléfono fijo</Form.Label>
            <Form.Control
              id="phone"
              name="phone"
              onChange={e => handleChangeCurriculum(e)}
              value={formCurriculum.phone}
              type="text"
              placeholder="Teléfono fijo"
              required
              autocomplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} lg={true}>
            <Form.Label className="labels">Teléfono celular</Form.Label>
            <Form.Control
              id="cellphone"
              name="cellphone"
              onChange={e => handleChangeCurriculum(e)}
              value={formCurriculum.cellphone}
              type="text"
              placeholder="Teléfono celular"
              required
              autocomplete="off"
            />
          </Form.Group>
          <Form.Group as={Col} lg={true}>
            <Form.Label className="labels">E-mail</Form.Label>
            <Form.Control
              id="email"
              name="email"
              onChange={e => handleChangeCurriculum(e)}
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
        <Form
          id="formStudies"
          onSubmit={e => handleSubmitStudies(e)}
          className="studies"
        >
          <Form.Row>
            <Form.Group as={Col} lg={true}>
              <Form.Label className="labels-2">Nivel de formación</Form.Label>
              <Form.Control
                as="select"
                name="degree"
                value={formStudies.degree}
                onChange={e => handleChangeStudies(e)}
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
            <Form.Group as={Col} lg={true}>
              <Form.Label className="labels-2">Título obtenido</Form.Label>
              <Form.Control
                name="title"
                id="title"
                onChange={e => handleChangeStudies(e)}
                value={formStudies.title}
                type="text"
                placeholder="Título"
                required
                autocomplete="off"
              />
            </Form.Group>
            <Form.Group as={Col} lg={true}>
              <Form.Label className="labels-2">Área de estudios</Form.Label>
              <Form.Control
                name="area"
                id="studyArea"
                onChange={e => handleChangeStudies(e)}
                value={formStudies.area}
                type="text"
                placeholder="Área de estudio"
                required
                autocomplete="off"
              />
            </Form.Group>
            <Form.Group as={Col} lg={true}>
              <Form.Label className="labels-2">Duración (Desde)</Form.Label>
              <Form.Control
                name="sinceDate"
                id="since"
                onChange={e => handleChangeStudies(e)}
                value={formStudies.sinceDate}
                type="date"
                required
                placeholder="Desde ..."
              />
            </Form.Group>
            <Form.Group as={Col} lg={true}>
              <Form.Label className="labels-2">Duración (Hasta)</Form.Label>
              <Form.Control
                name="toDate"
                id="to"
                onChange={e => handleChangeStudies(e)}
                value={formStudies.toDate}
                type="date"
                required
                placeholder="Hasta ..."
              />
            </Form.Group>
          </Form.Row>
          <Button variant="danger" type="submit" form="formStudies">
            Agregar
          </Button>
          <p>{JSON.stringify(studiesDone)}</p>
        </Form>
        <hr />
        <Form.Label className="labels">Experencia docente</Form.Label>
        <Form
          id="experiencesForm"
          onSubmit={e => handleSubmitExperiences(e)}
          className="studies"
        >
          <Form.Row>
            <Form.Group as={Col} lg={true}>
              <Form.Label className="labels-2">Programa Académico</Form.Label>
              <Form.Control
                name="program"
                id="program"
                onChange={e => handleChangeExperiences(e)}
                value={formExperiences.program}
                type="text"
                placeholder="Programa Académico"
                required
                autocomplete="off"
              />
            </Form.Group>
            <Form.Group as={Col} lg={true}>
              <Form.Label className="labels-2">Asignaturas dictadas</Form.Label>
              <Form.Control
                name="subjects"
                id="subjects"
                onChange={e => handleChangeExperiences(e)}
                value={formExperiences.subjects}
                type="text"
                placeholder="Asignaturas dicatadas"
                required
                autocomplete="off"
              />
            </Form.Group>
            <Form.Group as={Col} lg={true}>
              <Form.Label className="labels-2">Institución y lugar</Form.Label>
              <Form.Control
                name="institution"
                id="institution"
                onChange={e => handleChangeExperiences(e)}
                value={formExperiences.institution}
                type="text"
                placeholder="Institución y lugar"
                required
                autocomplete="off"
              />
            </Form.Group>
            <Form.Group as={Col} lg={true}>
              <Form.Label className="labels-2">Duración (Desde)</Form.Label>
              <Form.Control
                name="sinceDate"
                id="sinceExperience"
                onChange={e => handleChangeExperiences(e)}
                value={formExperiences.sinceDate}
                type="date"
                required
                placeholder="Desde ..."
              />
            </Form.Group>
            <Form.Group as={Col} lg={true}>
              <Form.Label className="labels-2">Duración (Hasta)</Form.Label>
              <Form.Control
                name="toDate"
                id="toExperience"
                onChange={e => handleChangeExperiences(e)}
                value={formExperiences.toDate}
                type="date"
                required
                placeholder="Hasta ..."
              />
            </Form.Group>
          </Form.Row>
          <Button type="submit" variant="danger" form="experiencesForm">
            Agregar
          </Button>
          <p>{JSON.stringify(experiences)}</p>
        </Form>
        <hr />
        <Button type="submit" variant="success" size="lg" block>
          Registrar hoja de vida
        </Button>
      </Form>
    </Container>
  );
};

export default CurriculumRegister;