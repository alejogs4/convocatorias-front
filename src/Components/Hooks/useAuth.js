import { LOGOUT, useUserDispatch } from '../../state/user';
import { CLEAN_CV, useCurriculumDispatch } from '../../state/curriculum';


function useAuth() {
  const userDispatch = useUserDispatch();
  const curriculumDispatch = useCurriculumDispatch();

  function logout() {
    localStorage.removeItem('udemuser');
    localStorage.removeItem('token');
    userDispatch({ type: LOGOUT });
    curriculumDispatch({ type: CLEAN_CV });
  }

  return { logout };
}

export default useAuth;
