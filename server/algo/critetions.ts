import { TranslationEnum } from "interfaces/TranslationEnum";

interface CriterionInternal {
  id: number;
  name: TranslationEnum;
  fieldDB: string;
}

export const Criterions: CriterionInternal[] = [
  {
    id: 1,
    fieldDB: "healthscore",
    name: "criteria.health",
  },
  {
    id: 2,
    fieldDB: "environmentScore",
    name: "criteria.environmental_impact",
  },
  {
    id: 3,
    fieldDB: "priceScore",
    name: "criteria.price",
  },
  {
    id: 4,
    fieldDB: "proximityScore",
    name: "criteria.product_proximity",
  },
];
