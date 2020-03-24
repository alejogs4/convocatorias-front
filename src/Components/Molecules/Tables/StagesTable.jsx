import React from "react";
import { Table } from "react-bootstrap";
import { getNaturalFormat } from "../../../utils/dates";

const StagesTable = ({ stages }) => (
  <Table responsive>
    <thead>
      <tr>
        <th>Orden</th>
        <th>Nombre</th>
        <th>Fecha de inicio</th>
        <th>Fecha de fin</th>
      </tr>
    </thead>
    <tbody>
      {stages.map(stage => (
        <tr>
          <td>{stage.stage_order}</td>
          <td>{stage.text}</td>
          <td>{getNaturalFormat(new Date(stage.initial_date))}</td>
          <td>{getNaturalFormat(new Date(stage.final_date))}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default StagesTable;
