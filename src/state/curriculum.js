import React from 'react';

export const REGISTER_CV = 'REGISTER_CV';

const CurriculumDispatchContext = React.createContext();
const CurriculumStateContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case REGISTER_CV:
      return action.payload;
    default:
      return state;
  }
};

export const CurriculumContext = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  return (
    <CurriculumStateContext.Provider value={state}>
      <CurriculumDispatchContext.Provider value={dispatch}>
        {children}
      </CurriculumDispatchContext.Provider>
    </CurriculumStateContext.Provider>
  );
};

export const useCurriculum = () => React.useContext(CurriculumStateContext);
export const useCurriculumDispatch = () => React.useContext(CurriculumDispatchContext);
