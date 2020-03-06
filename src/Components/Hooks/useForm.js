import React from 'react';

const INITIAL_PETITION_STATE = {
  error: null,
  loading: false,
  success: false,
};

function useForm() {
  const [petitionState, setPetitionState] = React.useState(INITIAL_PETITION_STATE);

  function updatePetitionState(overrides = {}) {
    setPetitionState((currentPetitionState) => ({
      ...currentPetitionState,
      ...overrides,
    }));
  }

  function setSuccesfulPetition() {
    setPetitionState((currentPetitionState) => ({
      ...currentPetitionState,
      success: true,
    }));
  }

  function resetFormState() {
    setPetitionState(INITIAL_PETITION_STATE);
  }

  return {
    petitionState, resetFormState, updatePetitionState, setSuccesfulPetition,
  };
}

export default useForm;
