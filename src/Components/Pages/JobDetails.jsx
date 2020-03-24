import React from 'react';
import Axios from 'axios';

function JobDetails({ match: { params } }) {
  const [job, setJob] = React.useState(null);

  React.useState(() => {
    async function getJobById() {
      try {
        const { job } = (await Axios.get(`http://173.255.216.213:3000/api/v1/job/${params.id}`)).data.data;
        setJob(job);
      } catch (error) {
        console.log(error.message);
      }
    }

    getJobById();
  }, []);

  return (
    <div>
      <pre>
        {JSON.stringify(job, 2)}
      </pre>
    </div>
  );
}

export default JobDetails;
