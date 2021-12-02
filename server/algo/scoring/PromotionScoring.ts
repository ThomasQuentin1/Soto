import AScoring from "./AScoring";
import {DbProduct} from "../../dbSchema";

export default class PromotionScoring extends AScoring {
  public getScore(product: import("../../dbSchema").DbProduct): number {
    if (!product.promotion)
      return 0;

    const reduction = +product.priceUnit - +product.promotion;
    if (!reduction || reduction < 0)
      return 50;

    const reductionRate = (reduction / +product.priceUnit) * 100

    const score = Math.round(60 + reductionRate);
    return score > 100 ? 100 : score;
  }

  public getDescription(product: DbProduct): string {
    if (!product.promotion)
      return "";

    const reduction = +product.priceUnit - +product.promotion;
    if (!reduction || reduction < 0)
      return "En promo";

    const reductionRate = (reduction / +product.priceUnit) * 100

    return "- " + Math.round(reductionRate) + "%";
  }
  public getRisk(_product: DbProduct): string {
    return "";
  }
}
