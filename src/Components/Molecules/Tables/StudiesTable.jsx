import React from 'react';
import { Table } from 'react-bootstrap';

const StudiesTable = ({ studies }) => (
  <Table responsive>
    <thead>
      <tr>
        <th>Titulo obtenido</th>
        <th>Área</th>
        <th>Inicio</th>
        <th>Fin</th>
      </tr>
    </thead>
    <tbody>
      {studies.map((study) => (
        <tr>
          <td>{study.degree}</td>
          <td>{study.degree_topic}</td>
          <td>{study.begin_date}</td>
          <td>{study.final_date}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default StudiesTable;
