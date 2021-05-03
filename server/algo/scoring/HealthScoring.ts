import { HealthTags } from "../../constData/scoring";
import AScoring from "./AScoring";

export default class HealthScoring extends AScoring {
  public getScore(product: import("../../dbSchema").DbProduct): number {
    const scores = [80];
    let scoresCount = 2;

    if (!product.ingredients) return 50;
    this.getTags(product.ingredients.split("|"), HealthTags).forEach((p) => {
      scores.push(p.score);
      scoresCount++;
    });

    switch (product.nutriscore?.toLowerCase()) {
      case "a":
        scores.push(100);
        break;
      case "b":
        scores.push(75);
        break;
      case "c":
        scores.push(50);
        break;
      case "d":
        scores.push(25);
        break;
      case "e":
        scores.push(0);
        break;
      default:
        scoresCount -= 1;
    }
    let finalScore =
      scores.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / scoresCount;

    const nutriment = product.nutriments.split("|");
    let fat = 0;
    let sugar = 0;
    try {
      fat = +nutriment.find((n) => n.startsWith("fat_100g"))?.split(":")[1]!;
    } catch {}
    try {
      sugar = +nutriment
        .find((n) => n.startsWith("sugars_100g"))
        ?.split(":")[1]!;
    } catch {}

    finalScore -= (isNaN(fat) ? 0 : fat) / 5;
    finalScore -= (isNaN(sugar) ? 0 : sugar) / 5;

    if (finalScore < 0) finalScore = 0;
    return Math.round(finalScore);
  }

  public getDescription(product: import("../../dbSchema").DbProduct): string {
    const tags = this.getTags(product.ingredients.split("|"), HealthTags);
    return `Produits dangereux : ${tags.map((e) => e.comment).join(" ")}`;
  }
  public getRisk(product: import("../../dbSchema").DbProduct): string {
    const tags = this.getTags(product.ingredients.split("|"), HealthTags);
    return `risque : ${tags.map((e) => e.risk).join(" ")}`;
  }
}
