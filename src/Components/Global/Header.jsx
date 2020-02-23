import React from "react";
import { NavLink } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";

import "../Styles/Header.css";
import logoUdem from "../../Images/logo_udem.png";
import { Toolbar } from "@material-ui/core";

const Header = () => (
  <AppBar className="header" position="static">
    <Toolbar>
      <img alt="logo_udem" src={logoUdem} width="182" height="54" />
      <h1 className="header-title">Sistema de convocatorias</h1>
    </Toolbar>
  </AppBar>
);

export default Header;
