import { DbProduct } from "../../dbSchema";
import AScoring from "./AScoring";

// Intresting filed in OFF DB :
// ecoscore_data
// ecoscore_score
// ecoscore_grade
// labels_tags -> 'fr:eco-emballages'

export default class PriceScoring extends AScoring {
  public getDescription(_product: DbProduct): string {
    return "";
  }
  public getRisk(_product: DbProduct): string {
    return "";
  }
  public getScore(product: import("../../dbSchema").DbProduct): number {
    const priceMass = parseInt(product.priceMass);
    const priceUnit = parseInt(product.priceUnit);

    let price;

    if (priceMass && priceUnit) price = (priceMass + priceUnit) / 2;
    else if (priceMass && !priceUnit) price = priceMass;
    else if (!priceMass && priceUnit) price = priceUnit;
    else price = 0;

    if (price == 0) return 100;
    return Math.round((1 / Math.sqrt(price)) * 100);
  }
}
