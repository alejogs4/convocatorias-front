import React from 'react';
import curriculum from '../utils/petitions/curriculum.petitions';

export const REGISTER_CV = 'REGISTER_CV';
export const CLEAN_CV = 'CLEAN_CV';

const CurriculumDispatchContext = React.createContext();
const CurriculumStateContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case REGISTER_CV:
      return action.payload;
    case CLEAN_CV:
      return {};
    default:
      return state;
  }
};

export const CurriculumContext = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, {});

  React.useEffect(() => {
    curriculum.getCurriculum()
      .then(({ curriculum }) => {
        dispatch({ type: REGISTER_CV, payload: curriculum });
      })
      .catch((error) => {
        console.log(`Error: ${error.message}`);
      });
  }, []);

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
