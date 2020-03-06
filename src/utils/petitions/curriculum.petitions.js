import axios from 'axios';
import { HEADERS } from './petitions.constants';

const curriculumPetitions = axios.create({
  baseURL: 'http://173.255.216.213:3000/api/v1/',
});

const curriculum = {
  registerCurriculum(curriculumInfo) {
    const { token } = localStorage;

    return curriculumPetitions.post('curriculum', curriculumInfo, { headers: { ...HEADERS, authorization: token } })
      .then((response) => response.data.data);
  },
};

export default curriculum;
