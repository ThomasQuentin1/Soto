import { TextField } from "@material-ui/core";
import React from "react";
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";

const APage = () => {
  return (
    <div>
      <DarkModeParent>    
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
      </DarkModeParent>        
    </div>
  );
};

export default APage;