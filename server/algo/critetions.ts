import { TranslationEnum } from "interfaces/TranslationEnum";

interface CriterionInternal {
    id: number;
    name: TranslationEnum;
    fieldDB: string;
}

export const Criterions: CriterionInternal[] = [
    {
        id: 1,
        fieldDB: "health",
        name: "criteria.health"
    },
    {
        id: 2,
        fieldDB: "environment",
        name: "criteria.environmental_impact"
    }
];