import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Product, Resolvers } from "../../typing";
import { algoQuery, usersQuery } from "../query";
import { ShopList } from "../constData/shopList";

export const productResolvers: Resolvers = {
  Query: {
    searchProducts: async (_obj, _args, context, _info) => {
      return (await (usersQuery<any>(
        `SELECT * FROM products${context.user?.shopId ?? 3} WHERE name LIKE ? OR keywords LIKE ? LIMIT 10`,
        [`%${_args.query}%`, `%${_args.query}%`]
      ))).map((r) => ({
        allergens: r.allergens?.split("|") ?? [],
        ingredients: r.ingredients?.split("|") ?? [],
        nutriments: r.nutriments?.split("|") ?? [],
        packaging: r.packaging?.split("|") ?? [],
        scoreEnvironment: r.environmentScore,
        scoreHealth: r.healthscore,
        ...r,
      })); // TODO: TEST
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

      const maxCartId = (await usersQuery("SELECT cartId FROM users")).reduce<number>((max, current:any) => {
        if (current.cartId > max)
          return current.cartId;
          else 
        return max;
      }, 0);

      await usersQuery("UPDATE users SET shopId = ?, cartId = ? WHERE id = ?", [
        args.shopId,
        maxCartId + 1,
        context.user.id,
      ]);
      return true;
    },
  },
};
