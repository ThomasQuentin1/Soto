import {CheckBoxData} from "../components/shop/ObligationCheckboxList";
import {CriteriaData} from "../components/shop/DragList";

export const obligationsBaseData : CheckBoxData[] = [
    {label: 'obligation.vegetarian', checked: false, id: 1},
    // {value: 'vegan', label: 'obligation.vegan', checked: false, id: 0},
    // {value: 'peanut_free', label: 'obligation.peanut_free', checked: false, id: 0},
    // {value: 'lactose_free', label: 'obligation.lactose_free', checked: false},
    // {value: 'halal', label: 'obligation.halal', checked: false},
    // {value: 'kosher', label: 'obligation.kosher', checked: false}
    {label: 'obligation.gluten_free', checked: false, id: 2}
];

export const criteriaBaseData: CriteriaData[] = [
    {name: 'criteria.health', activated: false, id: 1, position: 1},
    {name: 'criteria.environmental_impact', activated: false, id: 2, position: 2},
    // {name: 'criteria.price', activated: false, id: 3, position: 3},
    // {name: 'criteria.nutritional_value', activated: false, id: 4, position: 4},
    // {name: 'criteria.product_proximity', activated: false, id: 5, position: 5},
]

export interface lngShortLong {
    shortName: string;
    key: string;
    location: string;
}

export const lngFullName: lngShortLong[] = [
    {shortName: "fr", key: "language.french", location: "language.location.fr"},
    {shortName: "en", key: "language.english", location: "language.location.us"},
    {shortName: "en", key: "language.english", location: "language.location.uk"},
    // {shortName: "test", key: "language.test", location: "language.location.test"}, // To test translations
]

