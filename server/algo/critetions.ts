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
  {
    id: 5,
    fieldDB: "promotionScore",
    name: "criteria.promotion",
  },
  {
    id: 6,
    fieldDB: "lowCaloriesScore",
    name: "criteria.lowCalories",
  },
  {
    id: 7,
    fieldDB: "highProteinScore",
    name: "criteria.highProtein",
  }
];
