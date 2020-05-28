import axios from "axios";
import { HEADERS } from "./petitions.constants";

const candidatesPetitions = axios.create({
  baseURL: "http://173.255.216.213:3000/api/v1/",
});

const candidates = {
  applyToAJob(candidate) {
    const { token } = localStorage;

    return candidatesPetitions
      .post("job/candidate", candidate, {
        headers: { ...HEADERS, authorization: token },
      })
      .then((response) => response.data.data);
  },
  getJobCandidates(job_id) {
    const { token } = localStorage;

    return candidatesPetitions
      .get(`job/candidates/${job_id}`, {
        headers: { ...HEADERS, authorization: token },
      })
      .then((response) => response.data.data.candidates);
  },
  editProfile(profile) {
    const { token } = localStorage;

    return candidatesPetitions
      .put("teacher", profile, {
        headers: { ...HEADERS, authorization: token },
      })
      .then((response) => response.data.data);
  },
};

export default candidates;
