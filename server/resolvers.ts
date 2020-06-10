import { Product, Resolvers } from "../typing";
import { productsResolvers } from "./products";
import { algoQuery } from "./query";

let testValue = "unset";

const resolvers: Resolvers = {
  ...productsResolvers,
  Query: {
    searchProducts: async (_obj, _args, _context, _info) => {
      return algoQuery<Product>("SELECT * FROM products WHERE name LIKE ? OR keywords LIKE ? LIMIT 10", [`%${_args.query}%`, `%${_args.query}%`]);
    },
    getTest: async (_obj, _args, _context, _info) => {
      return { message: testValue };
    }
  },
  Mutation: {
    setTest: async (_obj, args, _context, _info) => {
      testValue = args.message;
      return { message: testValue };
    }
  }
};

export default resolvers;
