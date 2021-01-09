import AScoring from "./AScoring";
import {EnvironmentTags} from "../../constData/scoring"
export default class EnvScoring extends AScoring {
  public getScore(product: import("../../dbSchema").DbProduct): number {
    const scores = [50];
    let scoresCount = 1;

    this.getTags(product.packaging.split("|"), EnvironmentTags).forEach((p) => {
      scores.push(p.score);
      scoresCount++;
    });

    return (
      scores.reduce((acc, curr) => {
        return acc + curr;
      }, 0) / scoresCount
    );
  }

  public getDescription(product: import("../../dbSchema").DbProduct): string {
    const tags = this.getTags(product.packaging.split("|"), EnvironmentTags);
    return `Produits dangereux : ${tags.map((e) => e.comment).join(" ")}`;
  }
  public getRisk(product: import("../../dbSchema").DbProduct): string {
    const tags = this.getTags(product.packaging.split("|"),EnvironmentTags );
    return `risque : ${tags.map((e) => e.risk).join(" ")}`;
  }
}
