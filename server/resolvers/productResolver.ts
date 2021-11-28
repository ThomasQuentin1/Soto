import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { ErrMsg } from "../../interfaces/TranslationEnum";
import { Product, Resolvers, Shop, Criterion } from "../../typing";
import { Criterions } from "../algo/critetions";
import { ObligationInternal, Obligations } from "../algo/obligations";
import { ShopList } from "../constData/shopList";
import { DbProduct } from "../dbSchema";
import { usersQuery } from "../query";

const selectShopAndCriterion = async (args, context ): Promise<{shop: Shop, obligations: ObligationInternal[], criterions: Criterion[]}> => {

  const shop = ShopList.find(
    (s) => s.id == (context.user?.shopId ?? args.shopIdOverride)
  );

  if (!shop) throw new UserInputError(ErrMsg("error.badparams"));

  const obligations: ObligationInternal[] = (
    args.obligationsOverride ||
    (await usersQuery<{ id: number }>(
      "SELECT * FROM obligations WHERE userId = ?",
      [context.user?.id ?? -1]
    ))
  ).map((e) => Obligations.find((i) => i.id === e.id)!);

  const criterions: Criterion[] = (
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
  return {shop, obligations, criterions}
}
const sqlFieldIsTrue = (field: string) => `${field} IS TRUE`;
const sqlWhereObligations = (obligations: ObligationInternal[]) => {
  if (obligations.length === 0) return "";
  return `AND (${obligations
    .map((o) => sqlFieldIsTrue(o.fieldDB))
    .join(" AND ")})`;
};

export const getFinalScore = (criterions:any[], r: any) => {
  if (criterions.length === 0)
    return 0

  const maxtotalscore = criterions.reduce<number>(
    (acc, curr) => acc + 100 * curr.position,
    0
  );
  return ((criterions.reduce<number>((acc, curr) => {
    acc += curr.coeff * r[curr.fieldDB];
    return acc;
  }, 0) / maxtotalscore) * 100);
}

export const productResolvers: Resolvers = {
  Query: {
    searchProducts: async (_obj, args, context, _info) => {
      const {shop, obligations, criterions} = await selectShopAndCriterion(args, context)

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
          let finalScore = getFinalScore(criterions, r);

          if (finalScore >= 100)
            finalScore = 100

          return {
            ...r,
            finalScore: isNaN(finalScore) ? null : Math.round(finalScore),
          };
        })
        .map<Product>((r) => {
          return ({
            ...r,
            id: r.leclercId,
            allergens: r.allergens?.split("|") ?? [],
            ingredients: r.ingredients?.split("|") ?? [],
            nutriments: r.nutriments?.split("|") ?? [],
            packaging: r.packaging?.split("|") ?? [],
            scoreEnvironment: r.environmentScore,
            scoreHealth: r.healthscore,
            scorePrice: r.priceScore,
            scoreProximity: r.proximityScore,
            scorePromotion: r.promotionScore,
            photo: r.photo,
            pricePromotion: r.promotion,
            url: `https://${shop!.server}-courses.leclercdrive.fr/magasin-${
              shop!.code
            }-${shop?.name
              .toLocaleLowerCase()
              .replace(/ /g, "-")}/fiche-produits-${r.leclercId}-${r.name.replace(
              / /g,
              "-"
            )}.aspx`,
          })
        })
        .sort((a, b) => (b.finalScore ?? 0) - (a.finalScore ?? 0));
      return args.limit ? data.slice(0, args.limit) : data;
    },
    shopList: async (_obj, _args, _context, _info) => {
      return ShopList;
    },
    promotions: async (_obj, args, context, _info) => {
      const {shop, obligations, criterions} = await selectShopAndCriterion(args, context)


      const data = (
        !args?.query?.length ? await usersQuery<DbProduct>(
          `SELECT * FROM products${
            shop.id
          } WHERE (promotion IS NOT NULL) ${sqlWhereObligations(
            obligations
          )}`,
          []
        ) :
          await usersQuery<DbProduct>(
            `SELECT * FROM products${
              shop.id
            } WHERE (promotion IS NOT NULL) AND (name LIKE ? OR keywords LIKE ?) ${sqlWhereObligations(
              obligations
            )}`,
            [`%${args.query}%`, `%${args.query}%`]
          )
      )
        .map((r) => {
          let finalScore = getFinalScore(criterions, r);

          if (finalScore >= 100)
            finalScore = 100

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
          scorePrice: r.priceScore,
          pricePromotion: r.promotion,
          scoreProximity: r.proximityScore,
          scorePromotion: r.promotionScore,
          photo: r.photo,
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
      console.log(data);
      return args.limit ? data.slice(0, args.limit) : data;
    }
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
