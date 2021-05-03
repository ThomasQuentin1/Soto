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

describe("Account", () => {
  beforeAll(async (done) => {
    await Mutate("register", { email, passwordSHA256: "blbl" });
    token = await Mutate("login", { email, passwordSHA256: "blbl" });
    done();
  });

  it("should search the product", async () => {
    await Query(
      "searchProducts",
      { query: "Tartines", shopIdOverride: 1 },
      token
    );
  });

  it("should set the shop", async () => {
    await Mutate("setShop", { shopId: 3 }, token);
  });

  it("should not set the shop", async () => {
    // J'ai fix le sheitan de DELETE * FROM
    expect(Mutate("setShop", { shopId: 0 }, token)).rejects.toStrictEqual(
      new UserInputError(ErrMsg("error.badparams"))
    );
  });

  it("should not set the shop", async () => {
    expect(Mutate("setShop", { shopId: 3 }, undefined)).rejects.toStrictEqual(
      new AuthenticationError(ErrMsg("error.notloggedin"))
    );

    afterAll(() => Mutate("removeAccount", { passwordSHA256: "blbl" }));
  });
});
