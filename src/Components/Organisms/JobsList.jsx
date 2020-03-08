import React from 'react';
import { NavLink } from 'react-router-dom';
import jobs from '../../utils/petitions/jobs.petitions';
import { useUser } from '../../state/user';
import JobsCards from '../Molecules/JobsCards';

function JobsList() {
  const [opportunities, setOpportunities] = React.useState([]);
  const user = useUser();

  React.useEffect(() => {
    jobs.getNonClosedJobs().then(setOpportunities).catch((error) => console.log(error.message));
  }, []);

  return (
    <section className="margin-bt">
      <div className="jobs-header margin-bt">
        <h2>Convocatorias abiertas</h2>
        {user.id && user.is_boss && <NavLink className="link" as={NavLink} to="/announcement">Abrir convocatoria</NavLink>}
      </div>
      <JobsCards opportunities={opportunities} />
    </section>
  );
}

export default JobsList;
