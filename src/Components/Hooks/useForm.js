import React from 'react';

const INITIAL_PETITION_STATE = {
  error: null,
  loading: false,
};

function useForm() {
  const [petitionState, setPetitionState] = React.useState(INITIAL_PETITION_STATE);

  const updatePetitionState = (overrides = {}) => {
    setPetitionState((currentPetitionState) => ({
      ...currentPetitionState,
      ...overrides,
    }));
  };

  function resetFormState() {
    setPetitionState(INITIAL_PETITION_STATE);
  }

  return { petitionState, resetFormState, updatePetitionState };
}

export default useForm;
