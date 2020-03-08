/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useCurriculumDispatch, CLEAN_CV } from '../../state/curriculum';
import { useUserDispatch, LOGOUT } from '../../state/user';

function withLogin(WrappedComponent) {
  return function WithLoginComponent(props) {
    const history = useHistory();
    const curriculumDispatch = useCurriculumDispatch();
    const userDispatch = useUserDispatch();

    React.useEffect(() => {
      const { token } = localStorage;
      if (!token) {
        curriculumDispatch({ type: CLEAN_CV });
        userDispatch({ type: LOGOUT });
        history.push('/');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}

export default withLogin;
