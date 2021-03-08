import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { endConnection, openConnection } from "./query";
import { Mutate, Query } from "./utils/tests";
import { ErrMsg } from "../interfaces/TranslationEnum";

let token: string = "";
const email = `user${Math.floor(Math.random() * 1000)}@test.com`;


afterAll(() => {
  openConnection();
});

afterAll(async () => {
  await endConnection();
});


describe("Criterions & Obligations", () => {
  beforeAll(async (done) => {
    await Mutate("register", { email, passwordSHA256: "blbl" });
    token = await Mutate("login", { email, passwordSHA256: "blbl" });
    done();
  });

  afterAll(() => Mutate("removeAccount", { passwordSHA256: "blbl" }));


  it("should deny actions to a unlogged user", async () => {
    await expect(
      Mutate("setObligations", { obligations: [] })
    ).rejects.toStrictEqual(new AuthenticationError(ErrMsg("error.notloggedin")));
    await expect(
      Mutate("setCriterions", { criterions: [] })
    ).rejects.toStrictEqual(new AuthenticationError(ErrMsg("error.notloggedin")));
    await expect(
      Query("criterions", { criterions: [] })
    ).rejects.toStrictEqual(new AuthenticationError(ErrMsg("error.notloggedin")));
    await expect(
      Query("obligations", { criterions: [] })
    ).rejects.toStrictEqual(new AuthenticationError(ErrMsg("error.notloggedin")));
  });

  it("handle obligations properly", async () => {
    const oldobligations = await Query("obligations", {}, token);
    await Mutate("setObligations", { obligations: [{ id: 1 }] }, token);
    const newobligations = await Query("obligations", {}, token);
    expect(oldobligations).not.toBe(newobligations);
    expect(newobligations.find((o: any) => o.activated).id).toBe(1);
    expect(newobligations.filter((o: any) => o.activated).length).toBe(
      1
    );
  });

  it("handle critetions properly", async () => {
    const oldCriterions = await Query("criterions", {}, token);
    await Mutate(
      "setCriterions",
      {
        criterions: [
          { id: 2, position: 1 },
          { id: 1, position: 2 },
        ],
      },
      token
    );
    const newCriterion = await Query("criterions", {}, token);
    expect(oldCriterions).not.toBe(newCriterion);
    expect(newCriterion.find((o: any) => o.position == 1).id).toBe(2);
    expect(newCriterion.find((o: any) => o.position == 2).id).toBe(1);
    expect(newCriterion.filter((o: any) => o.activated).length).toBe(
      2
    );
  });

  // it("sould deny invalid ids into criterions and obligations", async () => {
  //   await expect(
  //     Mutate(
  //       "setCriterions",
  //       { criterions: [{ id: 9999, position: 1 }] },
  //       token
  //     )
  //   ).rejects.toStrictEqual(new UserInputError(ErrMsg("error.badparams")));
  //   await expect(
  //     Mutate("setObligations", { obligations: [{ id: 9999 }] }, token)
  //   ).rejects.toStrictEqual(new UserInputError(ErrMsg("error.badparams")));
  // });

  // it("sould deny invalid positions in criterions", async () => {
  //   await expect(
  //     Mutate("setCriterions", { criterions: [{ id: 1, position: 0 }] }, token)
  //   ).rejects.toStrictEqual(
  //     new UserInputError(ErrMsg("error.badparams"))
  //   );
  //   await expect(
  //     Mutate(
  //       "setCriterions",
  //       {
  //         criterions: [
  //           { id: 1, position: 1 },
  //           { id: 2, position: 3 },
  //         ],
  //       },
  //       token
  //     )
  //   ).rejects.toStrictEqual(
  //     new UserInputError(ErrMsg("error.badparams"))
  //   );
  // });

  it("sould deny deny invalid shop selection", async () => {
    await expect(Mutate("setShop", { shopId: 0 }, token)).rejects.toStrictEqual(
      new UserInputError(ErrMsg("error.badparams"))
    );
    await expect(
      Mutate("setShop", { shopId: 10 }, token)
    ).rejects.toStrictEqual(new UserInputError(ErrMsg("error.badparams")));
  });

  it("sould handle shop modification properly", async () => {
    const account = await Query("account", {}, token);
    expect(account.currentShop).toBeFalsy();

    const shops = await Query("shopList", {}, token);
    const selectedShopId = shops[0].id;

    await Mutate("setShop", { shopId: selectedShopId }, token);

    const newAccount = await Query("account", {}, token);
    const selectedShop = newAccount.currentShop;
    expect(selectedShop.id).toBe(selectedShopId);
  });
});
