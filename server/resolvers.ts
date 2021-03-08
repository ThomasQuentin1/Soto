import { acountResolvers } from "./resolvers/accountResolver";
import { productResolvers } from "./resolvers/productResolver";
import {cartResolvers} from "./resolvers/cartResolver"
import {criterionResolvers} from "./resolvers/CriterionResolver"
import {obligationResolvers} from "./resolvers/obligationResolver"
import { Resolvers } from "typing";

const resolvers: Resolvers = {
  Query: { ...acountResolvers.Query, ...productResolvers.Query , ...cartResolvers.Query, ...criterionResolvers.Query, ...obligationResolvers.Query},
  Mutation: { ...acountResolvers.Mutation, ...productResolvers.Mutation, ...cartResolvers.Mutation , ...criterionResolvers.Mutation, ...obligationResolvers.Mutation},
};

export default resolvers;
