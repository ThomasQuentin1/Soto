import AScoring from "./AScoring";
import {DbProduct} from "../../dbSchema";

export default class PromotionScoring extends AScoring {
  public getScore(product: import("../../dbSchema").DbProduct): number {
    if (!product.promotion)
      return 0;

    const reduction = +product.priceUnit - +product.promotion;
    console.log("Reduction : " + reduction);
    if (!reduction || reduction < 0)
      return 50;

    const reductionRate = (+product.priceUnit / reduction) * 100
    console.log("Rate : " + reductionRate);

    return 60 + reductionRate;
  }

  public getDescription(_product: DbProduct): string {
    return "";
  }
  public getRisk(_product: DbProduct): string {
    return "";
  }
}
