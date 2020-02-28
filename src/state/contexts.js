import React from 'react';
import { UserProvider } from './user';

function Contexts({ children }) {
  return <UserProvider>{children}</UserProvider>;
}

export default Contexts;
