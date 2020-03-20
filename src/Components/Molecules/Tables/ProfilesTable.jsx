import React from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const ProfilesTable = ({ profiles, deleteProfile }) => (
  <Table responsive>
    <thead>
      <tr>
        <th>Perfil</th>
        <th>Descripcion</th>
      </tr>
    </thead>
    <tbody>
      {profiles.map((profile) => (
        <tr>
          <td>{profile.name}</td>
          <td>{profile.description}</td>
          <td>
            <Button
              size="sm"
              variant="danger"
              onClick={() => deleteProfile(profile)}
            >
              Eliminar
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default ProfilesTable;
