import { MultilangString } from "typing";

interface CriterionInternal {
    id: number,
    name: MultilangString,
    fieldDB: string
}

export const Criterions: CriterionInternal[] = [
    {
        id: 1,
        fieldDB: "health",
        name: {
            fr: "Impact sur la santé",
            en: "Health impact"
        }
    },
    {
        id: 2,
        fieldDB: "environment",
        name: {
            fr: "Impact sur l'environnement",
            en: "Environment impact"
        }
    }
];