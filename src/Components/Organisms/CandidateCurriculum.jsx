import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import CandidateStudiesTable from "../Molecules/Tables/CandidateStudiesTable";

import curriculum from "../../utils/petitions/curriculum.petitions";

import { getNaturalFormat } from "../../utils/dates";

import "../Styles/Jobs.css";
import CandidateTeachingExperiencesTable from "../Molecules/Tables/CandidateTeachingExperiencesTable";

const INITIAL_CURRICULUM = {
  dni: "",
  dni_type: "",
  professional_card: "",
  military_card: "",
  country: "",
  gender: "",
  birthday: "",
  hometown: "",
  civil_status: "",
  personal_address: "",
  home_phone: "",
  cellphone_phone: "",
  studies: [],
  teaching_experiences: []
};

const CandidateCurriculum = ({ idCandidate }) => {
  const [candidateCurriculum, setCandidateCurriculum] = useState(
    INITIAL_CURRICULUM
  );

  useEffect(() => {
    curriculum
      .getCandidateCurriculum(idCandidate)
      .then(setCandidateCurriculum)
      .catch(error => console.log(error.message));
  }, []);

  return (
    candidateCurriculum && (
      <Container>
        <Row>
          <Col>
            <p className="subtitles">
              <strong>Tipo de identificación: </strong>
              {candidateCurriculum.dni_type}
            </p>
          </Col>
          <Col>
            <p className="subtitles">
              <strong>Número de identificación: </strong>
              {candidateCurriculum.dni}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="subtitles">
              <strong>Número de tarjeta profesional: </strong>
              {candidateCurriculum.professional_card}
            </p>
          </Col>
          <Col>
            <p className="subtitles">
              <strong>Nacionalidad: </strong>
              {candidateCurriculum.country}
            </p>
          </Col>
          <Col>
            <p className="subtitles">
              <strong>Género: </strong>
              {candidateCurriculum.gender}
            </p>
          </Col>
          {candidateCurriculum.gender == "Masculino" && (
            <Col>
              <p className="subtitles">
                <strong>Libreta militar: </strong>
                {candidateCurriculum.military_card}
              </p>
            </Col>
          )}
        </Row>
        <Row>
          <Col>
            <p className="subtitles">
              <strong>Fecha de nacimiento: </strong>
              {candidateCurriculum.birthday && getNaturalFormat(new Date(candidateCurriculum.birthday))}
            </p>
          </Col>
          <Col>
            <p className="subtitles">
              <strong>Lugar de nacimiento: </strong>
              {candidateCurriculum.hometown}
            </p>
          </Col>
          <Col>
            <p className="subtitles">
              <strong>Estado civil: </strong>
              {candidateCurriculum.civil_status}
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="subtitles">
              <strong>Dirección personal: </strong>
              {candidateCurriculum.personal_address}
            </p>
          </Col>
          <Col>
            <p className="subtitles">
              <strong>Teléfono fijo: </strong>
              {candidateCurriculum.home_phone}
            </p>
          </Col>
          <Col>
            <p className="subtitles">
              <strong>Teléfono celular: </strong>
              {candidateCurriculum.cellphone_phone}
            </p>
          </Col>
        </Row>
        <hr />
        <p className="subtitles">
          <strong>Estudios realizados</strong>
        </p>
        {Array.isArray(candidateCurriculum.studies) &&
          candidateCurriculum.studies.length > 0 && (
            <CandidateStudiesTable studies={candidateCurriculum.studies} />
          )}
        <hr />
        <p className="subtitles">
          <strong>Experiencia docente</strong>
        </p>
        {Array.isArray(candidateCurriculum.teaching_experiences) &&
          candidateCurriculum.teaching_experiences.length > 0 && (
            <CandidateTeachingExperiencesTable
              teachingExperiences={candidateCurriculum.teaching_experiences}
            />
          )}
      </Container>
    )
  );
};

export default CandidateCurriculum;
