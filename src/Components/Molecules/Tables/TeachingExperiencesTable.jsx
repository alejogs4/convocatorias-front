import React from 'react';
import { Table } from 'react-bootstrap';

const TeachingExperiencesTable = ({ teachingExperiences }) => (
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
      {teachingExperiences.map((experience) => (
        <tr>
          <td>{experience.academic_program}</td>
          <td>{experience.subjects}</td>
          <td>{experience.organization}</td>
          <td>{experience.begin_date}</td>
          <td>{experience.final_date}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default TeachingExperiencesTable;
