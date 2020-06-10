import { TextField } from "@material-ui/core";
import React from "react";
import '../i18n';
import { useTranslation } from "react-i18next";

const APage = () => {
  const [t] = useTranslation();
  return (
    <div>
        <div>
          <form noValidate autoComplete="off">
            <div>
              <TextField
                color="secondary"
                id="emailInputLogin"
                label="Adresse e-mail"
              />
              <br />
              <br />
              <p>{t("hello.label")}</p>
              <TextField
                color="secondary"
                id="passwordInputLogin"
                label="Password"
                type="password"
                autoComplete="current-password"
              />
            </div>
          </form>
        </div>
    </div>
  );
};

export default APage;