import React from "react";
import { Table } from "react-bootstrap";
import { getNaturalFormat, handleChangeDates } from "../../../utils/dates";

const CandidateTeachingExperiencesTable = ({ teachingExperiences }) => (
  <Table responsive>
    <thead>
      <tr>
        <th>Programa</th>
        <th>Materias</th>
        <th>Institucion</th>
        <th>Desde</th>
        <th>Hasta</th>
        <th>Duración (meses)</th>
      </tr>
    </thead>
    <tbody>
      {teachingExperiences.map((experience) => (
        <tr>
          <td>{experience.academic_program}</td>
          <td>{experience.subjects}</td>
          <td>{experience.organization}</td>
          <td>{getNaturalFormat(new Date(experience.begin_date))}</td>
          <td>{getNaturalFormat(new Date(experience.final_date))}</td>
          <td>
            {handleChangeDates(experience.begin_date, experience.final_date)}
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default CandidateTeachingExperiencesTable;
