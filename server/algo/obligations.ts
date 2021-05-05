import { TranslationEnum } from "interfaces/TranslationEnum";

export interface ObligationInternal {
  id: number;
  name: TranslationEnum;
  fieldDB: string;
}

export const Obligations: ObligationInternal[] = [
  {
    id: 1,
    fieldDB: "vegan",
    name: "obligation.vegan",
  },
  {
    id: 2,
    fieldDB: "noGluten",
    name: "obligation.gluten_free",
  },
];
