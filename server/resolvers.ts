import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Criterion, Obligation, Product, Resolvers } from "../typing";
import { Criterions } from "./algo/critetions";
import { Obligations } from "./algo/obligations";
import { algoQuery, usersQuery } from "./query";

const resolvers: Resolvers = {
  Query: {
    searchProducts: async (_obj, _args, _context, _info) => {
      return algoQuery<Product>(
        "SELECT * FROM products WHERE name LIKE ? OR keywords LIKE ? LIMIT 10",
        [`%${_args.query}%`, `%${_args.query}%`]
      ); // TODO: TEST
    },
    shopList: async (_obj, _args, _context, _info) => {
      return [
        {
          name: "E.Leclerc Drive Erstein",
          city: "Erstein",
          lat: 48.425563,
          long: 7.638703,
          id: 1,
        },
        {
          name: "E.Leclerc Drive Strasbourg - Neuhof",
          city: "Strasbourg",
          lat: 48.545883,
          long: 7.767355,
          id: 2,
        },
        {
          name: "E.Leclerc Drive Strasbourg - Neuhof",
          city: "Strasbourg",
          lat: 48.576761,
          long: 7.768423,
          id: 3,
        },
        {
          name: "E.Leclerc Drive Strasbourg Marché Gare",
          city: "Strasbourg",
          lat: 48.597222,
          long: 7.735704,
          id: 4,
        },
      ];
    },
    account: async (_obj, _args, context, _info) => {
      if (!context.user) throw new AuthenticationError("please login");
      const [critetionsQuery, obligationsQuery] = await Promise.all([
        usersQuery("SELECT * FROM criterions WHERE userId = ?", [
          context.user.id,
        ]),
        usersQuery("SELECT * FROM obligations WHERE userId = ?", [
          context.user.id,
        ]),
      ]);

      return {
        email: context.user.email,
        criterions: Criterions.map<Criterion>((criterionData) => {
          const criterionDb = critetionsQuery.find(
            (c: any) => c.id === criterionData.id
          ) as any;
          return {
            activated: !!criterionDb,
            id: criterionData.id,
            name: criterionData.name,
            position: criterionDb?.position,
          };
        }),
        obligations: Obligations.map<Obligation>((obligationData) => {
          const obligationDb = obligationsQuery.find(
            (c: any) => c.id === obligationData.id
          ) as any;
          return {
            activated: !!obligationDb,
            id: obligationData.id,
            name: obligationData.name,
          };
        }),
      };
    },
  },
  Mutation: {
    login: async (_obj, args, _context, _info) => {
      const loginQuery = await usersQuery<any>(
        "SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1",
        [args.email, args.passwordSHA256]
      );
      if (loginQuery.length != 1)
        throw new AuthenticationError("Invalid email or password");
      const newToken = [...Array(64)]
        .map(() => Math.random().toString(36)[2])
        .join("");

      await usersQuery("UPDATE users SET token = ? WHERE id = ?", [
        newToken,
        loginQuery[0].id,
      ]);
      return newToken;
    },
    register: async (_obj, args, _context, _info) => {
      const loginQuery = await usersQuery(
        "SELECT * FROM users WHERE email = ? LIMIT 1",
        [args.email]
      );
      if (loginQuery.length != 0)
        throw new AuthenticationError("Email already in use");

      const newToken = [...Array(64)]
        .map(() => Math.random().toString(36)[2])
        .join("");
      await usersQuery(
        "INSERT INTO users (email, password, token) VALUES (?, ?, ?)",
        [args.email, args.passwordSHA256, newToken]
      );
      return newToken;
    },
    setObligations: async (_obj, args, context, _info) => {
      if (!context.user) throw new AuthenticationError("please login");
      if (
        args.obligations.some((c1) => !Obligations.find((c2) => c1.id == c2.id))
      )
        throw new UserInputError("Invalid obligation id");

      await usersQuery("DELETE FROM obligations WHERE userId = ?", [
        context.user.id,
      ]);
      await Promise.all(
        args.obligations.map((o) =>
          usersQuery("INSERT INTO obligations (id, userId) VALUES (?, ?)", [
            o.id,
            context.user.id,
          ])
        )
      );
      return true;
    },
    setCriterions: async (_obj, args, context, _info) => {
      if (!context.user) throw new AuthenticationError("please login");
      if (
        args.criterions.some((c1) => !Criterions.find((c2) => c1.id == c2.id))
      )
        throw new UserInputError("Invalid criterion id");

      if (args.criterions.some((c) => c.position === 0))
        throw new UserInputError("Criterions position must start with 1");

      Array.from({ length: args.criterions.length }).forEach((_e, i) => {
        if (args.criterions.find((e) => e.position === i + 1) == undefined)
          throw new UserInputError(
            "Criterions position are incorrect (not 1, 2, 3...)"
          );
      });

      await usersQuery("DELETE FROM criterions WHERE userId = ?", [
        context.user.id,
      ]);
      await Promise.all(
        args.criterions.map((o) =>
          usersQuery(
            "INSERT INTO criterions (id, userId, position) VALUES (?, ?, ?)",
            [o.id, context.user.id, o.position]
          )
        )
      );
      return true;
    },
    removeAccount: async (_obj, args, context, _info) => {
      if (!context.user) throw new AuthenticationError("please login");
      const login = await usersQuery(
        "SELECT * FROM users WHERE id = ? AND password = ? LIMIT 1",
        [context.user.id, args.passwordSHA256]
      );
      if (login.length != 1) throw new AuthenticationError("Invalid password");
      await usersQuery("DELETE FROM users WHERE id = ?", [context.user.id]);
      return true;
    },
    subscribeNotifications: async (_obj, args, context, _info) => {
      if (!context.user) throw new AuthenticationError("please login");

      await usersQuery("UPDATE users SET pushToken = ? WHERE id = ?", [
        args.token,
        context.user.id,
      ]);
      return true;
    },
    changeEmail: async (_obj, args, context, _info) => {
      if (!context.user) throw new AuthenticationError("please login");
      await usersQuery("UPDATE users SET email = ? WHERE id = ?", [
        args.newEmail,
        context.user.id,
      ]);
      return true;
    },
    changePassword: async (_obj, args, context, _info) => {
      if (!context.user) throw new AuthenticationError("please login");
      await usersQuery("UPDATE users SET password = ? WHERE id = ?", [
        args.newPasswordSHA256,
        context.user.id,
      ]);
      return true;
    },
  },
};

export default resolvers;
