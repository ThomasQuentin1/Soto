import { acountResolvers } from "./resolvers/accountResolver";
import { productResolvers } from "./resolvers/productResolver";
import {cartResolvers} from "./resolvers/cartResolver"
import { Resolvers } from "typing";

const resolvers: Resolvers = {
  Query: { ...acountResolvers.Query, ...productResolvers.Query , ...cartResolvers.Query},
  Mutation: { ...acountResolvers.Mutation, ...productResolvers.Mutation, ...cartResolvers.Mutation },
};
export default resolvers;
