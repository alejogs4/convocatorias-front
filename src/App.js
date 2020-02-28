// packages
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import Pages from './Components/Pages';
import { useUserDispatch, LOGIN } from './state/user';

function App() {
  const userDispatch = useUserDispatch();

  React.useEffect(() => {
    const user = localStorage.udemuser;
    if (user) {
      userDispatch({ type: LOGIN, payload: JSON.parse(user) });
    }
  }, []);

  return (
    <>
      <Pages />
    </>
  );
}

export default App;
