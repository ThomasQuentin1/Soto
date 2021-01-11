
import { DbProduct } from "server/dbSchema";

export default abstract class IScoring {
 public abstract getScore(product: DbProduct) : number;
 public abstract getDescription(product: DbProduct) : string;
 public abstract getRisk(product: DbProduct): string;
}