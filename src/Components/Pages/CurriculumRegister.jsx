import React, { useState, useEffect } from "react";

import "../Styles/Forms.css";

import CurriculumForm from "../Atoms/CurriculumForm";

import { getCountryDisplayName } from "../../utils/countries";
import { useUser } from "../../state/user";

const INITIAL_FORM_STATE = {
  lastnames: "",
  names: "",
  idType: "",
  idNum: "",
  nationality: "Colombia",
  gender: "",
  birthday: "",
  birthplace: "Colombia",
  maritalStatus: "Soltero/a",
  personalAddress: "",
  phone: "",
  cellphone: "",
  email: "",
  studiesDone: [],
  experiences: []
};

const CurriculumRegisterContainer = ({ history }) => {
  const [formCurriculum, setFormCurriculum] = useState(INITIAL_FORM_STATE);

  const user = useUser();

  useEffect(() => {
    setFormCurriculum(c => ({
      ...c,
      names: user.name,
      lastnames: user.lastname,
      email: user.email
    }));
  }, [user]);

  const handleChangeCurriculum = e => {
    setFormCurriculum({
      ...formCurriculum,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitCurriculum = e => {
    e.preventDefault();
    setFormCurriculum({
      ...formCurriculum
    });
    console.log(formCurriculum);
    setFormCurriculum(INITIAL_FORM_STATE);
    history.push("/home");
  };

  const handleSelectFlagNationality = countryCode => {
    setFormCurriculum({
      ...formCurriculum,
      nationality: getCountryDisplayName(countryCode)
    });
  };

  const handleSelectFlagBirthplace = countryCode => {
    setFormCurriculum({
      ...formCurriculum,
      birthplace: getCountryDisplayName(countryCode)
    });
  };
  return (
    <CurriculumForm
      formCurriculum={formCurriculum}
      setFormCurriculum={setFormCurriculum}
      onChangeCurriculum={handleChangeCurriculum}
      onSubmitCurriculum={handleSubmitCurriculum}
      onSelectNationality={handleSelectFlagNationality}
      onSelectBirthplace={handleSelectFlagBirthplace}
    />
  );
};

export default CurriculumRegisterContainer;
