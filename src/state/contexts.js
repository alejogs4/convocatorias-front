import React from 'react';
import { UserProvider } from './user';
import { CurriculumContext } from './curriculum';

function Contexts({ children }) {
  return (
    <CurriculumContext>
      <UserProvider>{children}</UserProvider>
    </CurriculumContext>
  );
}

export default Contexts;
