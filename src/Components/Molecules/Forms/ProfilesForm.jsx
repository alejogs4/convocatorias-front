import React, { useState } from "react";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import RequirementsForm from "./RequirementsForm";
import ProfilesTable from "../Tables/ProfilesTable";

const INITIAL_FORM_PROFILE = {
  name: "",
  description: "",
  area: "",
  requirements: []
};

const ProfilesForm = ({ formAnnouncement, setFormAnnouncement }) => {
  const [formProfiles, setFormProfiles] = useState(INITIAL_FORM_PROFILE);
  const [profiles, setProfiles] = useState([]);

  const handleChangeProfiles = e => {
    setFormProfiles({
      ...formProfiles,
      [e.target.name]: e.target.value
    });
    //console.log(formProfiles);
  };

  const handleSubmitProfiles = e => {
    e.preventDefault();

    if (formProfiles.name) {
      const profilesTemp = [...profiles, formProfiles];
      setProfiles(profilesTemp);

      setFormAnnouncement({
        ...formAnnouncement,
        profiles: profilesTemp
      });

      setFormProfiles(INITIAL_FORM_PROFILE);
      //console.log(profiles);
    }
  };

  function deleteProfile(profile) {
    setProfiles(profiles.filter(el => el.name !== profile.name));
  }

  return (
    <Form id="formProfiles" className="studies" autoComplete="off">
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
          <Form.Label className="labels">Área</Form.Label>
          <Form.Control
            name="area"
            onChange={handleChangeProfiles}
            value={formProfiles.area}
            type="text"
            required
            placeholder="Área del perfil"
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
      <RequirementsForm form={formProfiles} setForm={setFormProfiles} />
      <br />
      <Button block variant="outline-danger" onClick={handleSubmitProfiles}>
        Agregar perfil
      </Button>
      <br />
      {Array.isArray(profiles) && profiles.length > 0 && (
        <ProfilesTable profiles={profiles} deleteProfile={deleteProfile} />
      )}
    </Form>
  );
};

export default ProfilesForm;
