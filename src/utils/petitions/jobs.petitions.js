import axios from 'axios';
import { HEADERS } from './petitions.constants';

const jobPetitions = axios.create({
  baseURL: 'http://173.255.216.213:3000/api/v1/',
});

const jobs = {
  createJobOpportunity(job) {
    const { token } = localStorage;

    return jobPetitions.post('job', job, { headers: { ...HEADERS, authorization: token } })
      .then((response) => response.data.data);
  },
  getTypes() {
    return jobPetitions.get('jobs/types', { headers: HEADERS }).then((response) => response.data.data.types);
  },
  getNonClosedJobs() {
    const { token } = localStorage;

    return jobPetitions.get('jobs', { headers: { ...HEADERS, authorization: token } })
      .then((response) => response.data.data.opportunities);
  },
};

export default jobs;
