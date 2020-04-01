import React from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const ProfilesTable = ({ profiles, deleteProfile }) => (
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
          {deleteProfile && (
            <td>
              <Button
                size="sm"
                variant="danger"
                onClick={() => deleteProfile(profile)}
              >
                Eliminar
              </Button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ProfilesTable;
