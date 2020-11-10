import React from "react";
import ToggleLanguage from "../components/settings/ToggleLanguage";
import { useTranslation } from "react-i18next";

const ContainToggleLanguage = () => {
  const { t, i18n } = useTranslation();
  i18n;
  return <ToggleLanguage t={t}></ToggleLanguage>;
};

export default ContainToggleLanguage;
