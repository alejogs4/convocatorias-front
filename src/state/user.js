import React from 'react';

const UserContext = React.createContext();
const UserContextDispatch = React.createContext();

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

function userReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

function UserProvider({ children }) {
  const [state, dispatch] = React.useReducer(userReducer, {});

  return (
    <UserContext.Provider value={state}>
      <UserContextDispatch.Provider value={dispatch}>
        {children}
      </UserContextDispatch.Provider>
    </UserContext.Provider>
  );
}

const useUser = () => React.useContext(UserContext);
const useUserDispatch = () => React.useContext(UserContextDispatch);

export { UserProvider, useUser, useUserDispatch };
