import { Resolvers, Cart, Product } from "../../typing";
import { ShopList } from "server/constData/shopList";
import { usersQuery } from "server/query";
import { AuthenticationError, UserInputError } from "apollo-server-micro";

export const cartResolvers: Resolvers = {
  Query: {
    cart: async (_obj, _args, context, _info) => {
      if (!context.user || !context.user.shopId)
        throw new AuthenticationError("please login");

      const rawCart = await usersQuery<any>(
        `SELECT * FROM carts JOIN products${context.user.shopId} WHERE carts.id = ?`,
        [context.user.cartId]
      );

      if (!rawCart) throw new UserInputError("Bad parameters");

      let totalPrice = 0;

      await Promise.all(
        rawCart.map(async () => {
          const products = await usersQuery<any>(
            `SELECT priceUnit FROM products${rawCart[0].driveId} WHERE id = ? LIMIT 1`,
            [rawCart[0].productId]
          );
          totalPrice += products[0].priceUnit;
        })
      );

      const cart: Cart = {
        dateCreated: rawCart.reduce((oldestDate: any, d: any) => {
          if (!oldestDate || oldestDate?.date > d) oldestDate = d;
          return oldestDate;
        }, null)?.date ?? new Date(),
        dateLastEdit: rawCart.reduce((newestDate: any, d: any) => {
          if (!newestDate || newestDate?.date < d) newestDate = d;
          return newestDate;
        }, null)?.date ?? new Date(),
        price: totalPrice,
        products: rawCart.map<Product>((r) => ({
          ...r,
          allergens: r.allergens?.split("|") ?? [],
          ingredients: r.ingredients?.split("|") ?? [],
          nutriments: r.nutriments?.split("|") ?? [],
          packaging: r.packaging?.split("|") ?? [],
          scoreEnvironment: r.environmentScore,
          scoreHealth: r.healthscore,
        })),
        shop: ShopList[0],
        dateClosed: new Date(),
      };
      return cart;
    },
    oldCarts: async (_obj, _args, context, _info) => {
      if (!context.user) throw new AuthenticationError("please login");
      const cart: Cart = {
        dateCreated: new Date(),
        dateLastEdit: new Date(),
        price: 0,
        products: [],
        shop: ShopList[0],
        dateClosed: new Date(),
      };
      return [cart];
    },
  },
  Mutation: {
    addToCart: async (_obj, args, context, _info) => {
      if (!context.user) throw new AuthenticationError("please login");
      const { cartId, id, shopId } = context.user;
      if (!cartId || !id || !shopId) throw new UserInputError("Bad parameters");
      if (!args.productId) throw new UserInputError("Bad parameters");

      usersQuery(
        "INSERT INTO carts ( id, userId, productId, driveId) VALUES (?, ?, ?, ?)",
        [cartId, id, args.productId, shopId]
      );

      return true;
    },
    removeFromCart: async (_obj, args, context, _info) => {
      if (!context.user) throw new AuthenticationError("please login");
      const { cartId, id, shopId } = context.user;
      if (!cartId || !id || !shopId) throw new UserInputError("Bad parameters");
      if (!args.productId) throw new UserInputError("Bad parameters");

      await usersQuery(
        "DELETE FROM carts WHERE id = ? AND userId = ? AND productId = ? AND driveId = ?",
        [cartId, id, args.productId, shopId]
      );
      return true;
    },
    clearCart: async (_obj, _args, context, _info) => { 
        if (!context.user) throw new AuthenticationError("please login");
        const { cartId, id, shopId } = context.user;
        if (!cartId || !id || !shopId) throw new UserInputError("Bad parameters");


        await usersQuery(
            "DELETE * FROM carts WHERE id = ? AND userId = ? AND driveId = ?",
            [cartId, id,  shopId]
          );
          return true;
    },
    confirmCart:  async (_obj, args, context, _info) => { 

            // Add confirmed order date

        const maxCartId = (await usersQuery("SELECT cartId FROM users")).reduce<number>((max, current:any) => {
            if (current.cartId > max)
              return current.cartId;
              else 
            return max;
          }, 0);
    
          await usersQuery("UPDATE users SET cartId = ? WHERE id = ?", [
            maxCartId + 1,
            context.user.id,
          ]);
          return true;
        }    
  },
};