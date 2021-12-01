import { DbProduct } from "../../dbSchema";
import AScoring from "./AScoring";

export default class HighProteinScoring extends AScoring {
  public getDescription(_product: DbProduct): string {
    return "";
  }
  public getRisk(_product: DbProduct): string {
    return "";
  }
  public getScore(product: import("../../dbSchema").DbProduct): number {
    const tab = product.nutriments.split("|");
    const proteins = Number(
      tab.find((e) => e.includes("proteins"))?.split(":")?.[1]
    );
    if (!proteins) return 50;

    const score = Math.sqrt(proteins * 500) - 15;

    if (score > 100) return 100;
    if (score < 0) return 0;

    return Math.round(score);
  }
}
