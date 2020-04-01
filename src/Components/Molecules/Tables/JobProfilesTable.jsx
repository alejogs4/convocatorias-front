import React, { useState } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const ProfilesTable = ({ profiles, applyProfile }) => {

  const handleClick = profile => e => {
    const classList = e.target.classList
    if (classList.contains("btn-outline-danger")) {
      classList.remove("btn-outline-danger");
      classList.add("btn-danger");
      applyProfile(profile, false);
    } else if (classList.contains("btn-danger")) {
      classList.remove("btn-danger")
      classList.add("btn-outline-danger")
      applyProfile(profile, true);
    }
    console.log(classList);
  };

  return (
    <Table responsive>
      <thead>
        <tr>
          <th>Perfil</th>
          <th>Área</th>
          <th>Descripcion</th>
          <th>Requisitos</th>
        </tr>
      </thead>
      <tbody>
        {profiles.map(profile => (
          <tr>
            <td>{profile.name}</td>
            <td>{profile.area}</td>
            <td>{profile.description}</td>
            <td>
              {Array.isArray(profile.requirements) &&
                profile.requirements.length > 0 && (
                  <div>
                    {profile.requirements.map(requirement => (
                      <p>
                        <strong>● </strong>
                        {requirement.text}
                      </p>
                    ))}
                  </div>
                )}
            </td>
            {applyProfile && (
              <td>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={handleClick(profile)}
                >
                  Aplicar
                </Button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProfilesTable;
