import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

import curriculum from "../../../utils/petitions/curriculum.petitions";

import { getNaturalFormat, handleChangeDates } from "../../../utils/dates";

const CandidateStudiesTable = ({ studies }) => {
  const [levels, setLevels] = useState([]);

  useEffect(() => {
    curriculum.getCurriculumLevels().then((data) => setLevels(data.levels));
  }, []);

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Nivel de formación</th>
          <th>Titulo obtenido</th>
          <th>Área</th>
          <th>Inicio</th>
          <th>Fin</th>
          <th>Duración (meses)</th>
        </tr>
      </thead>
      <tbody>
        {studies.map((study) => (
          <tr>
            <td>
              {Array.isArray(levels) && levels.length > 0 && (
                <p>
                  {levels.find((level) => level.id == study.title_level_id).text}
                </p>
              )}
            </td>
            <td>{study.degree}</td>
            <td>{study.degree_topic}</td>
            <td>{getNaturalFormat(new Date(study.begin_date))}</td>
            <td>{getNaturalFormat(new Date(study.final_date))}</td>
            <td>{handleChangeDates(study.begin_date, study.final_date)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CandidateStudiesTable;
