import { acountResolvers } from "./resolvers/accountResolver";
import { productResolvers } from "./resolvers/productResolver";
import { Resolvers } from "typing";

const resolvers: Resolvers = {
  Query: { ...acountResolvers.Query, ...productResolvers.Query },
  Mutation: { ...acountResolvers.Mutation, ...productResolvers.Mutation },
};
export default resolvers;
