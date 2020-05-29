import axios from "axios";
import { HEADERS } from "./petitions.constants";
import firebaseContoller from '../firebase';

const curriculumPetitions = axios.create({
  baseURL: "http://173.255.216.213:3000/api/v1/"
});

const curriculum = {
  async registerCurriculum(curriculumInfo) {
    const { token } = localStorage;
    const uploaded = await firebaseContoller.uploadFile(curriculumInfo.file)
    const response = await curriculumPetitions
      .post("curriculum", curriculumInfo, {
        headers: { ...HEADERS, authorization: token }
      });
    await this.postFile(uploaded)
    return response.data.data;
  },
  async postFile(file) {
    const { token } = localStorage;
    const response = await curriculumPetitions
      .post("curriculum/file", { file: file }, {
        headers: { ...HEADERS, authorization: token }
      });
    return response.data.data;
  },
  async getCurriculum() {
    const { token } = localStorage;
    const response = await curriculumPetitions
      .get("teacher/curriculum", {
        headers: { ...HEADERS, authorization: token }
      });
    return response.data.data;
  },
  async getCurriculumLevels() {
    const response = await curriculumPetitions
      .get("teacher/levels");
    return response.data.data;
  },
  async getCandidateCurriculum(candidate_id) {
    const { token } = localStorage;

    const response = await curriculumPetitions
      .get(`candidates/${candidate_id}/curriculum`, {
        headers: { ...HEADERS, authorization: token }
      });
    return response.data.data.curriculum;
  }
};

export default curriculum;
