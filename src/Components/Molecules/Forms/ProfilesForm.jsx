import React, { useState } from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ProfilesTable from '../Tables/ProfilesTable';

const INITIAL_FORM_PROFILE = { name: '', description: '' };

const ProfilesForm = ({ formAnnouncement, setFormAnnouncement, profiles, setProfiles }) => {
  const [formProfiles, setFormProfiles] = useState(INITIAL_FORM_PROFILE);

  const handleChangeProfiles = (e) => {
    setFormProfiles({
      ...formProfiles,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitProfiles = (e) => {
    e.preventDefault();

    if (formProfiles.name) {
      const profilesTemp = [...profiles, formProfiles];
      setProfiles(profilesTemp);

      setFormAnnouncement({
        ...formAnnouncement,
        profiles: profilesTemp,
      });

      setFormProfiles(INITIAL_FORM_PROFILE);
    }
  };

  function deleteProfile(profile) {
    setProfiles(profiles.filter((el) => el.name !== profile.name));
  }

  return (
    <Form id="formProfiles" className="studies">
      <Form.Label className="labels-2">Perfiles</Form.Label>
      <Form.Row>
        <Form.Group as={Col} lg>
          <Form.Label className="labels">Nombre</Form.Label>
          <Form.Control
            name="name"
            onChange={handleChangeProfiles}
            value={formProfiles.name}
            type="text"
            required
            placeholder="Nombre del perfil"
          />
          <br />
          <Form.Label className="labels">Descripción</Form.Label>
          <Form.Control
            name="description"
            onChange={handleChangeProfiles}
            value={formProfiles.description}
            as="textarea"
            rows="3"
            required
            placeholder="Descripción del perfil"
          />
        </Form.Group>
      </Form.Row>
      <Button variant="danger" onClick={handleSubmitProfiles}>
        Agregar perfil
      </Button>
      {Array.isArray(profiles) && profiles.length > 0 && (
        <ProfilesTable profiles={profiles} deleteProfile={deleteProfile} />
      )}
    </Form>
  );
};

export default ProfilesForm;
