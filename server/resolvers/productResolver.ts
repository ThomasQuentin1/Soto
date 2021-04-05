import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Criterions } from "server/algo/critetions";
import { DbProduct } from "server/dbSchema";
import { ErrMsg } from "../../interfaces/TranslationEnum";
import { Product, Resolvers } from "../../typing";
import { ShopList } from "../constData/shopList";
import { usersQuery } from "../query";

export const productResolvers: Resolvers = {
  Query: {
    searchProducts: async (_obj, args, context, _info) => {
      const shop = ShopList.find((s) => s.id == (context.user?.shopId ?? 3));

      // const obligations = (
      //   await usersQuery<{ id: number }>(
      //     "SELECT * FROM obligations WHERE userId = ?",
      //     [context.user.id ?? - 1]
      //   )
      // ).map((e) => Obligations.find((i) => i.id === e.id));

      const criterions: any[] = (
        args.criterionsOverride ||
        (await usersQuery<{ id: number; position: number }>(
          "SELECT * FROM criterions WHERE userId = ?",
          [context.user.id]
        ))
      )
        .map((e) => ({
          position: e!.position,
          ...Criterions.find((i) => i.id === e!.id),
        }))
        .map((e, _i, arr) => ({
          ...e,
          coeff: arr.length + 1 - e.position,
        }));

      const maxtotalscore = criterions.reduce<number>(
        (acc, curr) => acc + 100 * curr.position,
        0
      );

      const data = (
        await usersQuery<DbProduct>(
          `SELECT * FROM products${
            context.user?.shopId ?? 3
          } WHERE name LIKE ? OR keywords LIKE ?`,
          [`%${args.query}%`, `%${args.query}%`]
        )
      )
        .map((r) => {
          const finalScore =
            (criterions.reduce<number>((acc, curr) => {
              acc += curr.coeff * r[curr.fieldDB];
              return acc;
            }, 0) /
              maxtotalscore) *
            100;
          console.log(finalScore);
          return r;
        })
        .map<Product>((r) => ({
          ...r,
          id: r.leclercId,
          allergens: r.allergens?.split("|") ?? [],
          ingredients: r.ingredients?.split("|") ?? [],
          nutriments: r.nutriments?.split("|") ?? [],
          packaging: r.packaging?.split("|") ?? [],
          scoreEnvironment: r.environmentScore,
          scoreHealth: r.healthscore,
          photo: `https://${
            shop!.server
          }-photos.leclercdrive.fr/image.ashx?id=${
            r.photo
          }&use=d&cat=p&typeid=i&width=300`,
          url: `https://${shop!.server}-courses.leclercdrive.fr/magasin-${
            shop!.code
          }-${shop?.name
            .toLocaleLowerCase()
            .replace(/ /g, "-")}/fiche-produits-${r.leclercId}-${r.name.replace(
            / /g,
            "-"
          )}.aspx`,
        }));
      return data;
    },
    shopList: async (_obj, _args, _context, _info) => {
      return ShopList;
    },
  },
  Mutation: {
    setShop: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
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
