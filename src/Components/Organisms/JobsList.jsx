import React from 'react';
import jobs from '../../utils/petitions/jobs.petitions';
import JobsCards from '../Molecules/JobsCards';

function JobsList() {
  const [opportunities, setOpportunities] = React.useState([]);

  React.useEffect(() => {
    jobs.getNonClosedJobs().then(setOpportunities).catch((error) => console.log(error.message));
  }, []);

  return (
    <section className="margin-bt">
      <JobsCards opportunities={opportunities} />
    </section>
  );
}

export default JobsList;
