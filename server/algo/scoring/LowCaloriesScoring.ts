import { DbProduct } from "../../dbSchema";
import AScoring from "./AScoring";

export default class LowCaloriesScoring extends AScoring {
  public getDescription(_product: DbProduct): string {
    return "";
  }
  public getRisk(_product: DbProduct): string {
    return "";
  }
  public getScore(product: import("../../dbSchema").DbProduct): number {
    const tab = product.nutriments.split("|");
    const calorie = Number(tab.find((e) => e.includes("energy-kcal"))?.split(":")?.[1]);
    if (!calorie) 
      return 50;
    if (calorie < 20)
    return 100;

      const res = Math.sqrt( 1 / (0.00001 * ((calorie - 10))))

    return Math.round(res);
  }
}
