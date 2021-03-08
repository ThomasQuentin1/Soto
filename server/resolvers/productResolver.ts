import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Product, Resolvers } from "../../typing";
import { ShopList } from "../constData/shopList";
import { usersQuery } from "../query";
import { ErrMsg } from "../../interfaces/TranslationEnum";

export const productResolvers: Resolvers = {
  Query: {
    searchProducts: async (_obj, _args, context, _info) => {
      const shop = ShopList.find((s) => s.id == (context.user?.shopId ?? 3));

      const data = (
        await usersQuery<any>(
          `SELECT * FROM products${
            context.user?.shopId ?? 3
          } WHERE name LIKE ? OR keywords LIKE ? LIMIT 10`,
          [`%${_args.query}%`, `%${_args.query}%`]
        )
      ).map<Product>((r) => ({
        ...r,
        allergens: r.allergens?.split("|") ?? [],
        ingredients: r.ingredients?.split("|") ?? [],
        nutriments: r.nutriments?.split("|") ?? [],
        packaging: r.packaging?.split("|") ?? [],
        scoreEnvironment: r.environmentScore,
        scoreHealth: r.healthscore,
        photo: `https://${shop!.server}-photos.leclercdrive.fr/image.ashx?id=${
          r.leclercId
        }&use=d&cat=p&typeid=i&width=300`,
        url: `https://${shop!.server}-courses.leclercdrive.fr/magasin-${
          shop!.code
        }-${shop?.name.toLocaleLowerCase().replace(/ /g, "-")}/fiche-produits-${
          r.leclercId
        }-${r.name.replace(/ /g, "-")}.aspx`,
      }));
      return data;
    },
    shopList: async (_obj, _args, _context, _info) => {
      return ShopList;
    },
  },
  Mutation: {
    setShop: async (_obj, args, context, _info) => {
      if (!context.user) throw new AuthenticationError(ErrMsg("error.notloggedin"));
      if (args.shopId == 0 || args.shopId > 4)
        throw new UserInputError(ErrMsg("error.badparams"));

      const maxCartId = (
        await usersQuery("SELECT cartId FROM users")
      ).reduce<number>((max, current: any) => {
        if (current.cartId > max) return current.cartId;
        else return max;
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
