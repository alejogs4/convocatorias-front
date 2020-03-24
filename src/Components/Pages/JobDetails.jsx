import React, { useState, useEffect } from "react";
import Axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";

import StagesTable from "../Molecules/Tables/StagesTable";

import "../Styles/Jobs.css";

import { getNaturalFormat } from "../../utils/dates";
import jobs from "../../utils/petitions/jobs.petitions";

function JobDetails({ match: { params } }) {
  const [job, setJob] = useState(null);

  const [types, setTypes] = useState([]);
  const [stages, setStages] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    jobs
      .getTypes()
      .then(setTypes)
      .catch(error => console.log(error.message));
  }, []);

  useState(() => {
    async function getJobById() {
      try {
        const { job } = (
          await Axios.get(`http://173.255.216.213:3000/api/v1/job/${params.id}`)
        ).data.data;
        setJob(job);
        setStages(job.stages);
        setRequirements(job.requirements);
        setProfiles(job.profiles);
      } catch (error) {
        console.log(error.message);
      }
    }
    getJobById();
  }, []);

  function returnByParameter(parameter) {
    if (job !== null) return job[parameter];
  }

  function returnByList(parameter) {
    if (job !== null) {
      const list = job[parameter];
      if (Array.isArray(list) && list.length > 0) {
        console.log(typeof list);
        return "";
      }
    }
  }

  function returnByDate(parameter) {
    if (job !== null) {
      const date = job[parameter];
      const formatDate = new Date(date);
      return getNaturalFormat(formatDate);
    }
  }

  const click = e => {
    //console.log(types.find((type) => type.id == 1));
    console.log(job);
  };

  return (
    <Container>
      <p className="titles">{returnByParameter("name")}</p>
      <p>{returnByParameter("description")}</p>
      <hr />
      <p>
        <strong>Tipo de convocatoria: </strong>
        {types.length > 0 &&
          types.find(type => type.id == returnByParameter("job_type_id")).text}
      </p>
      <p>
        <strong>Programa: </strong>
        {returnByParameter("program")}
      </p>
      <p>
        <strong>Fecha de inicio: </strong>
        {returnByDate("begin_date")}
      </p>
      <p>
        <strong>Fecha de fin: </strong>
        {returnByDate("final_date")}
      </p>
      <hr />
      <p>
        <strong>Requisitos:</strong>
      </p>
      {Array.isArray(requirements) && requirements.length > 0 && (
        <ListGroup>
          {requirements.map(requirement => (
            <ListGroup.Item>
              <strong>{requirements.indexOf(requirement) + 1}. </strong>
              {requirement.text}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
      <hr />
      <p className="titles-2">Cronograma de las etapas: </p>
      {Array.isArray(stages) && stages.length > 0 && (
        <StagesTable stages={stages} />
      )}
      <hr />
      <p className="titles-2">Perfiles: </p>
      {Array.isArray(profiles) && profiles.length > 0 && (
        <div>
          {profiles.map(profile => (
            <div>
              <p>
                <strong>Nombre: </strong>
                {profile.name}
              </p>
              <p>
                <strong>Area: </strong>
                {profile.area}
              </p>
              <p>
                <strong>Descripción: </strong>
                {profile.description}
              </p>
              <hr />
            </div>
          ))}
        </div>
      )}
      {/* <Button onClick={click}>Pepito</Button> */}
    </Container>
    // <p>{JSON.stringify(job)}</p>
  );
}

export default JobDetails;
