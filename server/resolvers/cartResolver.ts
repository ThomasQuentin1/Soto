import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { ErrMsg } from "../../interfaces/TranslationEnum";
import { Cart, Product, Resolvers, Shop } from "../../typing";
import { ShopList } from "../constData/shopList";
import { usersQuery } from "../query";
import { getFinalScore } from "./productResolver";
import { Criterions } from "../../server/algo/critetions";

const NanToNullAndRound = (nbr: number) => isNaN(nbr) ? null : Math.round(nbr);

const createCartFromRawData = async (shop: Shop, rawCart: any[], criterions?: any[]) => {
  let totalPrice = 0;

  await Promise.all(
    rawCart.map(async () => {
      const products = await usersQuery<any>(
        `SELECT priceUnit FROM products${rawCart[0].driveId} WHERE leclercId = ? LIMIT 1`,
        [rawCart[0].productId]
      );
      totalPrice += +products[0].priceUnit;
    })
  );

  const cart: Cart = {
    dateCreated:
      rawCart.reduce((oldestDate: any, d: any) => {
        if (!oldestDate || oldestDate?.date > d) oldestDate = d;
        return oldestDate;
      }, null)?.date ?? new Date(),
    dateLastEdit:
      rawCart.reduce((newestDate: any, d: any) => {
        if (!newestDate || newestDate?.date < d) newestDate = d;
        return newestDate;
      }, null)?.date ?? new Date(),
    price: isNaN(totalPrice) ? 0 : totalPrice,
    products: rawCart.map<Product>((r) => ({
      ...r,
      id: r.leclercId.toString(),
      allergens: r.allergens?.split("|") ?? [],
      ingredients: r.ingredients?.split("|") ?? [],
      nutriments: r.nutriments?.split("|") ?? [],
      packaging: r.packaging?.split("|") ?? [],
      scoreEnvironment: NanToNullAndRound(r.environmentScore),
      scoreHealth: NanToNullAndRound(r.healthscore),
      scorePromotion: r.promotionScore,
      //@ts-ignore
      scoreHighProtein: r.highProteinScore,
      //@ts-ignore
      scoreLowCalories: r.lowCaloriesScore,
      cartId: undefined,
      photo: `https://${shop!.server}-photos.leclercdrive.fr/image.ashx?id=${
        r.leclercId
      }&use=d&cat=p&typeid=i&width=300`,
      url: `https://${shop!.server}-courses.leclercdrive.fr/magasin-${
        shop!.code
      }-${shop?.name.toLocaleLowerCase().replace(/ /g, "-")}/fiche-produits-${
        r.leclercId
      }-${r.name.replace(/ /g, "-")}.aspx`,
      itemQuantity: 1,
      finalScore: criterions ? NanToNullAndRound(getFinalScore(criterions, r)) : null
    })),
    shop: ShopList[0],
  };

  // now remove duplicates

  cart.products = cart.products.reduce<Product[]>((acc, curr) => {
    const alreadyExists = acc.find((e) => e.id === curr.id);
    if (alreadyExists) {
      alreadyExists!.itemQuantity = (alreadyExists!.itemQuantity ?? 0) + 1;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  cart.score = cart.products.length ? Math.round(cart.products.reduce((total, product) => {
    return total + (product.finalScore ?? 0);
  }, 0) / cart.products.length) : null;

  console.log(cart.score);

  return cart;
};

export const cartResolvers: Resolvers = {
  Query: {
    cart: async (_obj, _args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));

      const shop = ShopList.find((s) => s.id == context.user.shopId);

      if (!shop) throw new UserInputError(ErrMsg("error.badparams"));

      const criterions: any[] = (
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


      const rawCart = await usersQuery<any>(
        `SELECT * FROM carts JOIN products${context.user.shopId} ON carts.productId = products${context.user.shopId}.leclercId WHERE carts.id = ?`,
        [context.user.cartId]
      );

      if (!rawCart) throw new UserInputError(ErrMsg("error.badparams"));

      return await createCartFromRawData(shop!, rawCart, criterions);
    },
    oldCarts: async (_obj, _args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));

        const criterions: any[] = (
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

      const rawAllCarts = await usersQuery<any>(
        `SELECT carts.id as cartId, carts.*, products${context.user.shopId}.* FROM carts JOIN products${context.user.shopId} ON carts.productId = products${context.user.shopId}.leclercId WHERE carts.userId = ?`,
        [context.user.id]
      );
      const usersCartsId: number[] = rawAllCarts
        .reduce<number[]>((acc, curr: any) => {
          if (acc.includes(curr.cartId)) return acc;
          else return [...acc, curr.cartId];
        }, [] as number[])
        .filter((e) => e !== context.user.cartId);

      const userCarts = usersCartsId.map((id) =>
        rawAllCarts.filter((f) => f.cartId == id)
      );

      return await Promise.all(
        userCarts.map((c) => {
          return createCartFromRawData(
            ShopList.find((s) => s.id == c[0].driveId)!,
            c,
            criterions
          );
        })
      );
    },
  },
  Mutation: {
    addMultipleToCart: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      const { cartId, id, shopId } = context.user;
      if (!cartId || !id || !shopId)
        throw new UserInputError(ErrMsg("error.badparams"));
      if (!args.products) throw new UserInputError(ErrMsg("error.badparams"));
      args.products.map(async (product) => {
      const leclercProductQuery = await usersQuery(
        `SELECT id FROM products${context.user.shopId} WHERE leclercId = ?`,
        [String(product.productId)]
      );
      if (leclercProductQuery.length !== 1)
        throw new UserInputError(ErrMsg("error.badparams"));
        Array.from({length: product.quantity}).forEach(async () =>{
          await usersQuery(
            "INSERT INTO carts ( id, userId, productId, driveId) VALUES (?, ?, ?, ?)",
            [cartId, id, product.productId, shopId]
          );
        })
    })
      return true;
    },
    addToCart: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      const { cartId, id, shopId } = context.user;
      if (!cartId || !id || !shopId)
        throw new UserInputError(ErrMsg("error.badparams"));
      if (!args.productId) throw new UserInputError(ErrMsg("error.badparams"));

      const leclercProductQuery = await usersQuery(
        `SELECT id FROM products${context.user.shopId} WHERE leclercId = ?`,
        [String(args.productId)]
      );
      if (leclercProductQuery.length !== 1)
        throw new UserInputError(ErrMsg("error.badparams"));

      await usersQuery(
        "INSERT INTO carts ( id, userId, productId, driveId) VALUES (?, ?, ?, ?)",
        [cartId, id, args.productId, shopId]
      );
      return true;
    },

    removeMultipleToCart: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      const { cartId, id: userId, shopId } = context.user;
      if (!cartId || !userId || !shopId)
        throw new UserInputError(ErrMsg("error.badparams"));
      if (!args.products) throw new UserInputError(ErrMsg("error.badparams"));
      args.products.forEach(async (e) => {
        Array.from({length: e.quantity}).forEach(async () =>{
          await usersQuery(
            "DELETE FROM carts WHERE id = ? AND userId = ? AND productId = ? AND driveId = ? LIMIT 1",
            [cartId, userId, e.productId, shopId]
          );
        })
      })
      return true;
    },

    removeFromCart: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      const { cartId, id: userId, shopId } = context.user;
      if (!cartId || !userId || !shopId)
        throw new UserInputError(ErrMsg("error.badparams"));
      if (!args.productId) throw new UserInputError(ErrMsg("error.badparams"));

      await usersQuery(
        "DELETE FROM carts WHERE id = ? AND userId = ? AND productId = ? AND driveId = ?",
        [cartId, userId, args.productId, shopId]
      );
      return true;
    },
    clearCart: async (_obj, _args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      const { cartId, id, shopId } = context.user;
      if (!cartId || !id || !shopId)
        throw new UserInputError(ErrMsg("error.badparams"));

      await usersQuery(
        "DELETE FROM carts WHERE id = ? AND userId = ? AND driveId = ?",
        [cartId, id, shopId]
      );
      return true;
    },
    confirmCart: async (_obj, _args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));

      const maxCartId = (
        await usersQuery("SELECT cartId FROM users")
      ).reduce<number>((max, current: any) => {
        if (current.cartId > max) return current.cartId;
        else return max;
      }, 0);
      await usersQuery("UPDATE users SET cartId = ? WHERE id = ?", [
        maxCartId + 1,
        context.user.id,
      ]);
      return true;
    },
  },
};
