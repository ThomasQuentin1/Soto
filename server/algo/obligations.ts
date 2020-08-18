import { MultilangString } from "typing";

interface ObligationInternal {
    id: number,
    name: MultilangString,
    fieldDB: string,
}

export const Obligations: ObligationInternal[] = [
    {
        id: 1,
        fieldDB: "vegan",
        name: {
            fr: "Végétarien",
            en: "Vegan"
        }
    },
    {
        id: 2,
        fieldDB: "noGluten",
        name: {
            fr: "Sans gluten",
            en: "Gluten-free"
        }
    }
];