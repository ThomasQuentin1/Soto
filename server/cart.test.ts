import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { ErrMsg } from "../interfaces/TranslationEnum";
import { endConnection, openConnection } from "./query";
import { makeid, Mutate, Query } from "./utils/tests";

let token: string = "";
const email = `user${makeid(64)}@test.com`;

afterAll(() => {
  openConnection();
});

afterAll(async () => {
  await endConnection();
});

describe("Cart", () => {
  beforeAll(async (done) => {
    await Mutate("register", { email, passwordSHA256: "blbl" });
    token = await Mutate("login", { email, passwordSHA256: "blbl" });
    done();
  });

  it("should deny cart access without login", async () => {
    expect(Query("cart", {})).rejects.toStrictEqual(
      new AuthenticationError(ErrMsg("error.notloggedin"))
    );
  });

  it("should not search the cart", async () => {
    expect(Query("cart", {}, token)).rejects.toStrictEqual(
      new UserInputError(ErrMsg("error.badparams"))
    );
  });

  it("should search the cart", async () => {
    await Mutate("setShop", { shopId: 3 }, token);
    await Query("cart", {}, token);
  });

  // it("should search the old cart", async () => {
  //   await Mutate("setShop", { shopId: 3 }, token);
  //   await Mutate("addToCart", { productId: "262" }, token);
  //   await Mutate("addToCart", { productId: "363" }, token);
  //   await Mutate("addToCart", { productId: "298" }, token);

  //   const initCart = await Query("cart", {}, token);

  //   await Mutate("confirmCart", {}, token);
  //   const oldCarts = await Query("oldCarts", {}, token);

  //   const currentCart = await Query("cart", {}, token);
  //   expect(currentCart.products.length).toBe(0);

  //   expect(oldCarts.length).toBe(1);
  //   expect(oldCarts[0]).toEqual(initCart);
  // });

  // it("should clear a cart", async () => {
  //   await Mutate("setShop", { shopId: 3 }, token);
  //   const initCart = await Query("cart", {}, token);
  //   expect(initCart.products.length).toBe(0);
  //   expect(initCart.price).toBe(0);
  //   await Mutate("addToCart", { productId: "262" }, token);
  //   const oneProductCart = await Query("cart", {}, token);
  //   expect(oneProductCart.products.length).toBe(1);
  //   expect(oneProductCart.price).not.toBe(0);
  //   await Mutate("removeFromCart", { productId: "262" }, token);
  //   const removedProductCard = await Query("cart", {}, token);
  //   expect(removedProductCard.products.length).toBe(0);
  //   expect(removedProductCard.price).toBe(0);

  //   await Mutate("addToCart", { productId: "262" }, token);
  //   await Mutate("addToCart", { productId: "363" }, token);
  //   await Mutate("addToCart", { productId: "363" }, token);
  //   const threeProductCart = await Query("cart", {}, token);
  //   expect(threeProductCart.products.length).toBe(3);
  //   expect(threeProductCart.price).not.toBe(0);

  //   await Mutate("clearCart", {}, token);
  //   const clearedProductCard = await Query("cart", {}, token);
  //   expect(clearedProductCard.products.length).toBe(0);
  //   expect(clearedProductCard.price).toBe(0);
  // });

  afterAll(() => Mutate("removeAccount", { passwordSHA256: "blbl" }));
});
