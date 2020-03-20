import React, { useState } from 'react';

import '../Styles/Forms.css';

import CurriculumForm from '../Molecules/Forms/CurriculumForm';

import curriculum from '../../utils/petitions/curriculum.petitions';
import useForm from '../Hooks/useForm';
import { useCurriculumDispatch, REGISTER_CV } from '../../state/curriculum';
import withLogin from '../Hoc/withLogin';

const INITIAL_FORM_STATE = {
  dni: '',
  dni_type: '',
  professional_card: '',
  military_card: '',
  country: 'Colombia',
  gender: '',
  birthday: '',
  hometown: 'Colombia',
  civil_status: 'Soltero/a',
  personal_address: '',
  home_phone: '',
  cellphone_phone: '',
  studies: [],
  teaching_experiences: [],
};

const CurriculumRegister = ({ history }) => {
  const [formCurriculum, setFormCurriculum] = useState(INITIAL_FORM_STATE);

  const curriculumForm = useForm();
  const curriculumDispacth = useCurriculumDispatch();

  const handleChangeCurriculum = (e) => {
    setFormCurriculum({
      ...formCurriculum,
      [e.target.name]: e.target.value,
    });
    console.log(formCurriculum)
  };

  const handleSubmitCurriculum = (e) => {
    e.preventDefault();

    curriculumForm.updatePetitionState({ loading: true });

    curriculum
      .registerCurriculum({
        ...formCurriculum,
      })
      .then((curriculum) => {
        setFormCurriculum(INITIAL_FORM_STATE);
        curriculumDispacth({ type: REGISTER_CV, payload: curriculum });

        curriculumForm.resetFormState();
        curriculumForm.setSuccesfulPetition();

        setTimeout(() => {
          history.push('/home');
        }, 3000);
      })
      .catch(() => {
        curriculumForm.updatePetitionState({
          loading: false,
          error: 'Error registrando hoja de vida',
        });
      });
  };

  return (
    <CurriculumForm
      curriculumForm={curriculumForm}
      formCurriculum={formCurriculum}
      setFormCurriculum={setFormCurriculum}
      onChangeCurriculum={handleChangeCurriculum}
      onSubmitCurriculum={handleSubmitCurriculum}
    />
  );
};

export default withLogin(CurriculumRegister);
