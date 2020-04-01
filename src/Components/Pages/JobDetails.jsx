import React, { useState, useEffect } from "react";
import Axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import JobProfilesTable from "../Molecules/Tables/JobProfilesTable";
import StagesTable from "../Molecules/Tables/StagesTable";

import "../Styles/Jobs.css";

import { useUser } from "../../state/user";
import { getNaturalFormat } from "../../utils/dates";
import jobs from "../../utils/petitions/jobs.petitions";

function JobDetails({ match: { params } }) {
  const [job, setJob] = useState(null);
  const user = useUser();

  const INITIAL_CANDIDATES = {
    teacher_id: user.id,
    job_id: params.id,
    profiles: []
  };

  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [applyProfiles, setApplyProfiles] = useState([]);

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
    if (job !== null && job !== undefined) {
      return job[parameter];
    }
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
    setCandidates({ ...candidates, teacher_id: user.id });
    console.log(candidates);
    //console.log(INITIAL_CANDIDATES)
  };

  function applyProfile(profile, clicked) {
    let apply_profiles = candidates.profiles;
    if (!clicked) {
      apply_profiles.push(profile.id);
      setApplyProfiles(apply_profiles);
      setCandidates({ ...candidates, profiles: apply_profiles });
      console.log(candidates);
    } else {
      apply_profiles = apply_profiles.filter(el => el !== profile.id);
      console.log("--------------");
      console.log(apply_profiles.filter(el => el !== profile.id));
      console.log("--------------");
      setApplyProfiles(apply_profiles);
      setCandidates({ ...candidates, profiles: apply_profiles });
      console.log(candidates);
    }
  }

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
        <div>
          {requirements.map(requirement => (
            <p>
              <strong>● </strong>
              {requirement.text}
            </p>
          ))}
        </div>
      )}
      <hr />
      <p className="titles-2">Cronograma de las etapas: </p>
      {Array.isArray(stages) && stages.length > 0 && (
        <StagesTable stages={stages} />
      )}
      <hr />
      <p className="titles-2">Perfiles: </p>
      <JobProfilesTable profiles={profiles} applyProfile={applyProfile} />
      <hr />
      <Button
        block
        size="lg"
        variant={candidates.profiles.length == 0 ? "secondary" : "success"}
        onClick={click}
        disabled={candidates.profiles.length == 0}
      >
        Aplicar a convocatoria
      </Button>
      <br />
      <p>{JSON.stringify(candidates)}</p>
    </Container>
  );
}

export default JobDetails;
