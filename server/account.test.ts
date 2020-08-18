import { endConnections } from "./query";
import { Mutate, Query } from "./utils/tests";


let token: string = "";
const email = `user${Math.floor(Math.random() * 1000)}@test.com`;

afterAll(() => {
  endConnections();
})

describe('Account', () => {

  beforeAll(async (done) => {
    token = await Mutate("register", { email, passwordSHA256: "blbl" });
    done();
  })

  afterAll(() =>
    Mutate("removeAccount", { passwordSHA256: "blbl" }))

  it('should retrive the user email', async () => {
    const acc = await Query("account", {}, token);
    expect(acc.email).toBe(email);
  })

  it('handle obligations poperly', async () => {
    const oldProfile = await Query("account", {}, token);
    await Mutate("setObligations", { obligations: [{ id: 1 }] }, token);
    const newProfile = await Query("account", {}, token);
    expect(oldProfile).not.toBe(newProfile);
    expect(newProfile.obligations.find((o: any) => o.activated).id).toBe(1);
    expect(newProfile.obligations.filter((o: any) => o.activated).length).toBe(1);
  })

  it('handle critetions poperly', async () => {
    const oldProfile = await Query("account", {}, token);
    await Mutate("setCriterions", { criterions: [{ id: 2, position: 1 }, { id: 1, position: 2 }] }, token);
    const newProfile = await Query("account", {}, token);
    expect(oldProfile).not.toBe(newProfile);
    expect(newProfile.criterions.find((o: any) => o.position == 1).id).toBe(2);
    expect(newProfile.criterions.find((o: any) => o.position == 2).id).toBe(1);
    expect(newProfile.criterions.filter((o: any) => o.activated).length).toBe(2);
  })
})