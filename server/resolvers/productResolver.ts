import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Product, Resolvers } from "../../typing";
import { algoQuery, usersQuery } from "../query";
import { ShopList } from "../constData/shopList";

export const productResolvers: Resolvers = {
  Query: {
    searchProducts: async (_obj, _args, _context, _info) => {
      return algoQuery<Product>(
        "SELECT * FROM products WHERE name LIKE ? OR keywords LIKE ? LIMIT 10",
        [`%${_args.query}%`, `%${_args.query}%`]
      ); // TODO: TEST
    },
    shopList: async (_obj, _args, _context, _info) => {
      return ShopList;
    },
  },
  Mutation: {
    setShop: async (_obj, args, context, _info) => {
      if (!context.user) throw new AuthenticationError("please login");
      if (args.shopId == 0 || args.shopId > 4)
        throw new UserInputError("Bad shop id");
      await usersQuery("UPDATE users SET shopId = ? WHERE id = ?", [
        args.shopId,
        context.user.id,
      ]);
      return true;
    },
  },
};
