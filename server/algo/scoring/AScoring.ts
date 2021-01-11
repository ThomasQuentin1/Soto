import { ScoringTag } from "server/constData/scoring";
import IScoring from "./IScoring";

export default abstract class AScoring extends IScoring {
  protected getTags(data: string[], db: ScoringTag[]): ScoringTag[] {
    return data
      .map((ing) => {
        const matchingTag = db.find((t) => {
          const isAnyTagMatchingWith = t!.tags.find(
            (tag) =>
              ing?.toLowerCase()?.trim()?.indexOf(tag?.toLowerCase()?.trim()) !=
              -1
          );
          return isAnyTagMatchingWith;
        });
        return matchingTag!;
      })
      .filter((i) => i);
  }
}
