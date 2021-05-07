import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { ErrMsg } from "../../interfaces/TranslationEnum";
import { Product, Resolvers } from "../../typing";
import { Criterions } from "../algo/critetions";
import { ObligationInternal, Obligations } from "../algo/obligations";
import { ShopList } from "../constData/shopList";
import { DbProduct } from "../dbSchema";
import { usersQuery } from "../query";

const sqlFieldIsTrue = (field: string) => `${field} IS TRUE`;
const sqlWhereObligations = (obligations: ObligationInternal[]) => {
  if (obligations.length === 0) return "";
  return `AND (${obligations
    .map((o) => sqlFieldIsTrue(o.fieldDB))
    .join(" AND ")})`;
};

export const productResolvers: Resolvers = {
  Query: {
    searchProducts: async (_obj, args, context, _info) => {
      const shop = ShopList.find(
        (s) => s.id == (context.user?.shopId ?? args.shopIdOverride)
      );

      if (!shop) throw new UserInputError(ErrMsg("error.badparams"));

      const obligations = (
        args.obligationsOverride ||
        (await usersQuery<{ id: number }>(
          "SELECT * FROM obligations WHERE userId = ?",
          [context.user?.id ?? -1]
        ))
      ).map((e) => Obligations.find((i) => i.id === e.id)!);

      const criterions: any[] = (
        args.criterionsOverride ||
        (await usersQuery<{ id: number; position: number }>(
          "SELECT * FROM criterions WHERE userId = ?",
          [context.user?.id ?? -1]
        ))
      ).map((e, _i, arr) => {
        return {
          position: e!.position,
          coeff: arr.length + 1 - e!.position,
          ...Criterions.find((i) => i.id === e!.id),
        };
      });
      const maxtotalscore = criterions.reduce<number>(
        (acc, curr) => acc + 100 * curr.position,
        0
      );

      const data = (
        await usersQuery<DbProduct>(
          `SELECT * FROM products${
            shop.id
          } WHERE (name LIKE ? OR keywords LIKE ?) ${sqlWhereObligations(
            obligations
          )}`,
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
          return {
            ...r,
            finalScore: isNaN(finalScore) ? null : Math.round(finalScore),
          };
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
        }))
        .sort((a, b) => (b.finalScore ?? 0) - (a.finalScore ?? 0));
      return args.limit ? data.slice(0, args.limit) : data;
    },
    shopList: async (_obj, _args, _context, _info) => {
      return ShopList;
    },
  },
  Mutation: {
    setShop: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      if (args.shopId == 0 || args.shopId == 1 || args.shopId > 4)
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
