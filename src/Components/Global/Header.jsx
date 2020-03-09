import React from 'react';
import { NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import '../Styles/Header.css';

import logoUdem from '../../Images/logo_udem.png';
import { useUser } from '../../state/user';
import useAuth from '../Hooks/useAuth';

const Header = () => {
  const auth = useAuth();
  const user = useUser();

  return (
    <Navbar className="header-color" variant="dark" expand="lg">
      <Navbar.Brand as={NavLink} to="/">
        <img
          alt="logo udem"
          src={logoUdem}
          width="182"
          height="54"
          className="d-inline-block align-top"
        />
        {' '}
      </Navbar.Brand>
      <Navbar.Toggle />
      <NavLink to="/">
        <h1 className="header-font header-title">Sistema de convocatorias</h1>
      </NavLink>
      <Navbar.Collapse className="justify-content-end">
        <Nav className="justify-content-end header-font">
          {user && user.id && (
            <NavLink to="/home" className="nav-link">
              HOME
            </NavLink>
          )}
          {!user || !user.id ? (
            <>
              <NavLink to="/login" className="nav-link">
                LOGIN
              </NavLink>
              <NavLink to="/register" className="nav-link">
                REGISTRO
              </NavLink>
            </>
          ) : (
            <NavLink
              to="/login"
              className="nav-link"
              onClick={auth.logout}
            >
              LOGOUT
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
