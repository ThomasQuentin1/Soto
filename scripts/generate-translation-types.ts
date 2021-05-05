
import translations from "../public/assets/i18n/translations";
import fs from "fs";

const generateTranslationTypes = async () => {
    fs.writeFileSync("./interfaces/TranslationEnum.ts", `export type TranslationEnum = "${Object.keys(translations.en.translation).join(`"|"`)}"; export const ErrMsg = (inp : TranslationEnum) => inp as string`);
};

generateTranslationTypes()
  .then(() => {
    console.log("Ok");
    process.exit(0);
  })
  .catch((ex) => {
    console.warn(ex);
    process.exit(1);
  });
