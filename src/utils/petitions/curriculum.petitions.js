import axios from "axios";
import { HEADERS } from "./petitions.constants";

const curriculumPetitions = axios.create({
  baseURL: "http://173.255.216.213:3000/api/v1/"
});

const curriculum = {
  registerCurriculum(curriculumInfo) {
    const { token } = localStorage;

    return curriculumPetitions
      .post("curriculum", curriculumInfo, {
        headers: { ...HEADERS, authorization: token }
      })
      .then(response => response.data.data);
  },
  getCurriculum() {
    const { token } = localStorage;
    return curriculumPetitions
      .get("teacher/curriculum", {
        headers: { ...HEADERS, authorization: token }
      })
      .then(response => response.data.data);
  },
  getCurriculumLevels() {
    return curriculumPetitions
      .get("teacher/levels")
      .then(response => response.data.data);
  },
  getCandidateCurriculum(candidate_id) {
    const { token } = localStorage;

    return curriculumPetitions
      .get(`candidates/${candidate_id}/curriculum`, {
        headers: { ...HEADERS, authorization: token }
      })
      .then(response => response.data.data.curriculum);
  }
};

export default curriculum;
