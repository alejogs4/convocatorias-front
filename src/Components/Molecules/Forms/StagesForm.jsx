import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import { DEFAULT_STAGES } from "../../../utils/stages";

const StagesForm = ({ formAnnouncement, setFormAnnouncement }) => {
  const [stages, setStages] = useState(DEFAULT_STAGES);

  const changeInitialDate = stage => e => {
    stage.initial_date = e.target.value;

    setFormAnnouncement({
      ...formAnnouncement,
      stages,
    });
  };

  const changeFinalDate = stage => e => {
    stage.final_date = e.target.value;

    setFormAnnouncement({
      ...formAnnouncement,
      stages,
    });
  };

  // const handleSubmitStages = e => {
  //   console.log(formAnnouncement);
  // };

  return (
    <div className="studies">
      <Form.Label className="labels-2">Etapas de la convocatoria</Form.Label>
      {Array.isArray(stages) && stages.length > 0 && (
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
                <td>
                  <Form.Control
                    name="initial_date"
                    onChange={changeInitialDate(stage)}
                    type="date"
                    placeholder="Fecha de inicio"
                    required
                  />
                </td>
                <td>
                  <Form.Control
                    name="final_date"
                    onChange={changeFinalDate(stage)}
                    type="date"
                    placeholder="Fecha de fin"
                    required
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* <Button onClick={handleSubmitStages}>pepe</Button> */}
    </div>
  );
};

export default StagesForm;
