import { DbProduct } from "../../dbSchema";
import AScoring from "./AScoring";

// Intresting filed in OFF DB :
// ecoscore_data
// ecoscore_score
// ecoscore_grade
// labels_tags -> 'fr:eco-emballages'

const border = [
  "Germany",
  "Spain",
  "Switzerland",
  "Luxembourg",
  "Italy",
  "Belgium",
];

const europe = [
  "Andorra",
  "Albania",
  "Austria",
  "Åland Islands",
  "Bosnia and Herzegovina",
  "Belgium",
  "Bulgaria",
  "Belarus",
  "Switzerland",
  "Cyprus",
  "Czech Republic",
  "Germany",
  "Denmark",
  "Estonia",
  "Spain",
  "Finland",
  "Faroe Islands",
  "France",
  "United Kingdon",
  "Guernsey",
  "Greece",
  "Croatia",
  "Hungary",
  "Ireland",
  "Isle of Man",
  "Iceland",
  "Italy",
  "Jersey",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Latvia",
  "Monaco",
  "Moldova, Republic of",
  "Macedonia, The Former Yugoslav Republic of",
  "Malta",
  "Netherlands",
  "Norway",
  "Poland",
  "Portugal",
  "Romania",
  "Russian Federation",
  "Sweden",
  "Slovenia",
  "Svalbard and Jan Mayen",
  "Slovakia",
  "San Marino",
  "Ukraine",
  "Holy See (Vatican City State)",
];

export default class ProximityScoring extends AScoring {
  public getDescription(_product: DbProduct): string {
    return "";
  }
  public getRisk(_product: DbProduct): string {
    return "";
  }
  public getScore(product: import("../../dbSchema").DbProduct): number {
    const ecoscore = Math.round(product.ecoscore / 5 - 10);

    if (!product.origin) return 10 + ecoscore > 0 ? ecoscore + 10 : 0;

    const lowerOrigin = product.origin.toLowerCase();
    if (lowerOrigin.includes("france")) return 94 + ecoscore;

    if (border.find((e) => lowerOrigin.includes(e.toLowerCase())))
      return 70 + ecoscore;

    if (europe.find((e) => lowerOrigin.includes(e.toLowerCase())))
      return 50 + ecoscore;

    return 30 + ecoscore;
  }
}
