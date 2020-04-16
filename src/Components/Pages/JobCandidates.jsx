import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";

import CandidateCurriculum from "../Organisms/CandidateCurriculum";

import candidates from "../../utils/petitions/candidates.petitions";

import "../Styles/Jobs.css";

const JobCandidates = ({ match: { params } }) => {
  const [candidatesList, setcandidatesList] = useState([]);
  const [curriculumModalShow, setCurriculumModalShow] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState({});

  function showCandidateCurriculum(candidate) {
    setSelectedCandidate(candidate);
    setCurriculumModalShow(true);
  }

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
              <th>Hoja de vida</th>
            </tr>
          </thead>
          <tbody>
            {candidatesList.map(candidate => (
              <tr>
                <td>{candidate.name}</td>
                <td>{candidate.lastname}</td>
                <td>{candidate.email}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => showCandidateCurriculum(candidate)}
                  >
                    Mirar hoja de vida
                  </Button>
                  <Modal
                    show={curriculumModalShow}
                    onHide={() => setCurriculumModalShow(false)}
                    size="xl"
                    aria-labelledby="contained-moda-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                      <Modal.Title id="contained-modal-title-vcenter" className="titles-2-center">
                        {`Hoja de vida de: ${selectedCandidate.name} ${selectedCandidate.lastname}`}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <CandidateCurriculum idCandidate={selectedCandidate.id} />
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="danger" onClick={() => setCurriculumModalShow(false)}>
                        Cerrar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default JobCandidates;
