import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import AnnouncementForm from '../Molecules/Forms/AnnouncementForm';

import withLogin from '../Hoc/withLogin';
import jobs from '../../utils/petitions/jobs.petitions';
import useForm from '../Hooks/useForm';
import { DEFAULT_STAGES } from '../../utils/stages';

const INITIAL_ANNOUNCEMENT_STATE = {
  name: '',
  description: '',
  job_type_id: 1,
  begin_date: '',
  final_date: '',
  profiles: [],
  program: 'Ingeniería de Sistemas',
  requirements: [],
  stages: DEFAULT_STAGES,
};

const Announcement = () => {
  const history = useHistory();
  const form = useForm();

  const [formAnnouncement, setFormAnnouncement] = useState(
    INITIAL_ANNOUNCEMENT_STATE,
  );
  //const [profiles, setProfiles] = useState([]);

  const handleChangeAnnouncement = (e) => {
    setFormAnnouncement({
      ...formAnnouncement,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitAnnouncement = (e) => {
    e.preventDefault();
    form.updatePetitionState({ loading: true });

    jobs
      .createJobOpportunity({ ...formAnnouncement })
      .then(() => {
        setFormAnnouncement(INITIAL_ANNOUNCEMENT_STATE);
        //setProfiles([]);
        form.updatePetitionState({ loading: false });
        form.setSuccesfulPetition();

        setTimeout(() => {
          form.resetFormState();
          history.push('/');
        }, 2000);
      })
      .catch((error) => {
        form.updatePetitionState({
          loading: false,
          error: 'Error creando convocatoria',
        });
        console.log(error.message);
      });
  };

  return (
    <AnnouncementForm
      form={form}
      formAnnouncement={formAnnouncement}
      setFormAnnouncement={setFormAnnouncement}
      onChangeAnnouncement={handleChangeAnnouncement}
      onSubmitAnnouncement={handleSubmitAnnouncement}
      // profiles={profiles}
      // setProfiles={setProfiles}
    />
  );
};

export default withLogin(Announcement);
