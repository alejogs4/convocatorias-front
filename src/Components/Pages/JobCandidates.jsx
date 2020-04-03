import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

import candidates from "../../utils/petitions/candidates.petitions";

import "../Styles/Jobs.css";

const JobCandidates = ({ match: { params } }) => {
  const [candidatesList, setcandidatesList] = useState([]);

  useEffect(() => {
    candidates
      .getJobCandidates(params.id)
      .then(setcandidatesList)
      .catch(error => console.log(error.message));
  }, []);

  return (
    <Container>
      <p className="titles">Lista de aspirantes: </p>
      <hr />
      {Array.isArray(candidatesList) && candidatesList.length > 0 && (
        <Table responsive>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo electrónico</th>
            </tr>
          </thead>
          <tbody>
            {candidatesList.map(candidate => (
              <tr>
                <td>{candidate.name}</td>
                <td>{candidate.lastname}</td>
                <td>{candidate.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default JobCandidates;
