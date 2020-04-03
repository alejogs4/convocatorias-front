import React, { useState, useEffect } from "react";
import Axios from "axios";

import { useHistory } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";

import JobProfilesTable from "../Molecules/Tables/JobProfilesTable";
import StagesTable from "../Molecules/Tables/StagesTable";

import "../Styles/Jobs.css";

import { useUser } from "../../state/user";
import useForm from "../Hooks/useForm";
import { getNaturalFormat } from "../../utils/dates";

import jobs from "../../utils/petitions/jobs.petitions";
import { default as candidatesPetitions } from "../../utils/petitions/candidates.petitions";

function JobDetails({ match: { params } }) {
  const history = useHistory();
  const form = useForm();
  const user = useUser();

  const [job, setJob] = useState(null);

  const INITIAL_CANDIDATE = {
    job_id: params.id,
    profiles: []
  };

  const [candidate, setCandidate] = useState(INITIAL_CANDIDATE);

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

  const handleApplyClick = e => {
    e.preventDefault();
    form.updatePetitionState({ loading: true });

    candidatesPetitions
      .applyToAJob({ ...candidate })
      .then(() => {
        setCandidate(INITIAL_CANDIDATE);
        form.updatePetitionState({ loading: false });
        form.setSuccesfulPetition();

        setTimeout(() => {
          form.resetFormState();
          history.push("/");
        }, 2000);
      })
      .catch(error => {
        form.updatePetitionState({
          loading: false,
          error: "Error aplicando a convocatoria"
        });
        console.log(error.message);
      });
    // console.log(types.find((type) => type.id == 1));
    console.log(candidate);
    // console.log(INITIAL_CANDIDATES)
  };

  function returnByParameter(parameter) {
    return job ? job[parameter] : "";
  }

  function returnByDate(parameter) {
    if (job !== null) {
      const date = job[parameter];
      const formatDate = new Date(date);
      return getNaturalFormat(formatDate);
    }
  }

  function applyProfile(profile, clicked) {
    if (!clicked) {
      setCandidate({
        ...candidate,
        profiles: [...candidate.profiles, profile.id]
      });
    } else {
      setCandidate({
        ...candidate,
        profiles: candidate.profiles.filter(el => el !== profile.id)
      });
    }
  }

  return (
    job && (
      <Container>
        <p className="titles">{returnByParameter("name")}</p>
        <p>{returnByParameter("description")}</p>
        <hr />
        <p>
          <strong>Tipo de convocatoria: </strong>
          {types.length > 0 &&
            types.find(type => type.id == returnByParameter("job_type_id"))
              .text}
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
        <JobProfilesTable profiles={profiles} applyProfile={!user.is_boss ? applyProfile : ''} />
        <hr />

        {!user.is_boss && (
          <Button
            block
            size="lg"
            variant={candidate.profiles.length === 0 ? "secondary" : "success"}
            onClick={handleApplyClick}
            disabled={candidate.profiles.length === 0}
          >
            {!form.petitionState.loading
              ? "Aplicar a convocatoria"
              : "Aplicando ..."}
          </Button>
        )}
        {form.petitionState.error && (
          <Alert variant="danger">{form.petitionState.error}</Alert>
        )}
        {form.petitionState.success && (
          <Alert variant="success">Ha aplicado correctamente!</Alert>
        )}
        <br />
        {/* <p>{JSON.stringify(candidate)}</p> */}
      </Container>
    )
  );
}

export default JobDetails;
