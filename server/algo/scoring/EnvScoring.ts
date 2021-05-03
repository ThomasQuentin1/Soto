import { EnvironmentTags } from "../../constData/scoring";
import AScoring from "./AScoring";

// Intresting filed in OFF DB :
// ecoscore_data
// ecoscore_score
// ecoscore_grade
// labels_tags -> 'fr:eco-emballages'

export default class EnvScoring extends AScoring {
  public getScore(product: import("../../dbSchema").DbProduct): number {
    const scores = [50];
    let scoresCount = 1;
    console.log("GET SCORE");

    if (!product.packaging) return 50;

    this.getTags(product.packaging.split("|"), EnvironmentTags).forEach((p) => {
      scores.push(p.score);
      scoresCount++;
    });

    let ret =
      scores.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / scoresCount;

    if (product.ecoscore) ret = (+product.ecoscore + ret) / 2;

    const labels = product.labels.split("|");

    if (labels.find((e) => e === "fr:eco-emballages")) {
      ret *= 1.1;
    }

    if (ret > 100) ret = 100;
    return ret;
  }

  public getDescription(product: import("../../dbSchema").DbProduct): string {
    const tags = this.getTags(product.packaging.split("|"), EnvironmentTags);
    return `Produits dangereux : ${tags.map((e) => e.comment).join(" ")}`;
  }
  public getRisk(product: import("../../dbSchema").DbProduct): string {
    const tags = this.getTags(product.packaging.split("|"), EnvironmentTags);
    return `risque : ${tags.map((e) => e.risk).join(" ")}`;
  }
}
