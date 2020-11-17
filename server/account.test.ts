import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { endConnections } from "./query";
import { Mutate, Query } from "./utils/tests";

let token: string = "";
const email = `user${Math.floor(Math.random() * 1000)}@test.com`;

afterAll(() => {
  endConnections();
});

describe("Shop list gathering", () => {
  it("should retrive 4 leclerc in the area", async () => {
    const res = await Query("shopList", {});
    expect(res.length).toBe(4);
    expect(res).toMatchSnapshot();
  });
});

describe("Basic errors cases with account", () => {
  it("should deny access to account without being logged in", async () => {
    await expect(Query("account", {})).rejects.toStrictEqual(
      new AuthenticationError("please login")
    );
  });

  it("should deny access with invalid username or password", async () => {
    await expect(
      Mutate("login", {
        email: "invalid-email@test.com",
        passwordSHA256: "invalidPassword123",
      })
    ).rejects.toStrictEqual(
      new AuthenticationError("Invalid email or password")
    );
  });

  it("should deny actions to a unlogged user", async () => {
    await expect(
      Mutate("setObligations", { obligations: [] })
    ).rejects.toStrictEqual(new AuthenticationError("please login"));
    await expect(
      Mutate("setCriterions", { criterions: [] })
    ).rejects.toStrictEqual(new AuthenticationError("please login"));
    await expect(
      Mutate("changeEmail", { newEmail: "newemail" })
    ).rejects.toStrictEqual(new AuthenticationError("please login"));
    await expect(
      Mutate("changePassword", { newPasswordSHA256: "newpass" })
    ).rejects.toStrictEqual(new AuthenticationError("please login"));
    await expect(
      Mutate("subscribeNotifications", { token: "tok" })
    ).rejects.toStrictEqual(new AuthenticationError("please login"));
    await expect(Mutate("setShop", { token: "tok" })).rejects.toStrictEqual(
      new AuthenticationError("please login")
    );
  });

  it("should deny the creation of a double account", async () => {
    const duplicateEmail = `user-dup-${Math.floor(
      Math.random() * 1000
    )}@test.com`;
    const token = await Mutate("register", {
      email: duplicateEmail,
      passwordSHA256: "rand",
    });
    await expect(
      Mutate("register", { email: duplicateEmail, passwordSHA256: "rand" })
    ).rejects.toStrictEqual(new AuthenticationError("Email already in use"));
    await expect(
      Mutate("removeAccount", { passwordSHA256: "invalid" }, token)
    ).rejects.toStrictEqual(new AuthenticationError("Invalid password"));
    await expect(
      Mutate("removeAccount", { passwordSHA256: "rand" }, token)
    ).resolves.toBeTruthy();
  });
});

describe("Account", () => {
  beforeAll(async (done) => {
    await Mutate("register", { email, passwordSHA256: "blbl" });
    token = await Mutate("login", { email, passwordSHA256: "blbl" });
    done();
  });

  afterAll(() => Mutate("removeAccount", { passwordSHA256: "blbl" }));

  it("should retrive the user email", async () => {
    const acc = await Query("account", {}, token);
    expect(acc.email).toBe(email);
  });

  it("should save notification token", async () => {
    await Mutate("subscribeNotifications", { token: "thisismytoken" }, token); // should not throw
  });

  it("should change email properly", async () => {
    const oldProfile = await Query("account", {}, token);
    await Mutate(
      "changeEmail",
      { newEmail: "thisIsMyNewEmail@gmail.com" },
      token
    );
    const newProfile = await Query("account", {}, token);
    expect(oldProfile.email).not.toBe(newProfile.email);
    expect(newProfile.email).toBe("thisIsMyNewEmail@gmail.com");
  });

  it("should change password properly", async () => {
    const tmpemail = `user${Math.floor(Math.random() * 1000)}@test.com`;
    const tmptoken = await Mutate("register", {
      email: tmpemail,
      passwordSHA256: "blbl",
    });
    await Mutate("changePassword", { newPasswordSHA256: "newblbl" }, tmptoken); // This would throw in case of error
    const secondtoken = await Mutate("login", {
      email: tmpemail,
      passwordSHA256: "newblbl",
    });
    expect(secondtoken.length).toBeGreaterThan(1);
    await Mutate("removeAccount", { passwordSHA256: "newblbl" }, secondtoken);
  });

  it("handle obligations properly", async () => {
    const oldProfile = await Query("account", {}, token);
    await Mutate("setObligations", { obligations: [{ id: 1 }] }, token);
    const newProfile = await Query("account", {}, token);
    expect(oldProfile).not.toBe(newProfile);
    expect(newProfile.obligations.find((o: any) => o.activated).id).toBe(1);
    expect(newProfile.obligations.filter((o: any) => o.activated).length).toBe(
      1
    );
  });

  it("handle critetions properly", async () => {
    const oldProfile = await Query("account", {}, token);
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
    const newProfile = await Query("account", {}, token);
    expect(oldProfile).not.toBe(newProfile);
    expect(newProfile.criterions.find((o: any) => o.position == 1).id).toBe(2);
    expect(newProfile.criterions.find((o: any) => o.position == 2).id).toBe(1);
    expect(newProfile.criterions.filter((o: any) => o.activated).length).toBe(
      2
    );
  });

  it("sould deny invalid ids into criterions and obligations", async () => {
    await expect(
      Mutate(
        "setCriterions",
        { criterions: [{ id: 9999, position: 1 }] },
        token
      )
    ).rejects.toStrictEqual(new UserInputError("Invalid criterion id"));
    await expect(
      Mutate("setObligations", { obligations: [{ id: 9999 }] }, token)
    ).rejects.toStrictEqual(new UserInputError("Invalid obligation id"));
  });

  it("sould deny invalid positions in criterions", async () => {
    await expect(
      Mutate("setCriterions", { criterions: [{ id: 1, position: 0 }] }, token)
    ).rejects.toStrictEqual(
      new UserInputError("Criterions position must start with 1")
    );
    await expect(
      Mutate(
        "setCriterions",
        {
          criterions: [
            { id: 1, position: 1 },
            { id: 2, position: 3 },
          ],
        },
        token
      )
    ).rejects.toStrictEqual(
      new UserInputError("Criterions position are incorrect (not 1, 2, 3...)")
    );
  });

  it("sould deny deny invalid shop selection", async () => {
    await expect(Mutate("setShop", { shopId: 0 }, token)).rejects.toStrictEqual(
      new UserInputError("Bad shop id")
    );
    await expect(
      Mutate("setShop", { shopId: 10 }, token)
    ).rejects.toStrictEqual(new UserInputError("Bad shop id"));
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
