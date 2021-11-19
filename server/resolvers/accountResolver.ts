import { AuthenticationError } from "apollo-server-micro";
import { Resolvers } from "../../typing";

import { ShopList } from "../constData/shopList";
import { usersQuery } from "../query";
import { ErrMsg } from "../../interfaces/TranslationEnum";
import * as jwt from "jsonwebtoken";

export const acountResolvers: Resolvers = {
  Query: {
    account: async (_obj, _args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      return {
        email: context.user.email,
        mailingList: context.user.mailingList,
        currentShop: ShopList.find((s) => s.id == context.user.shopId),
      };
    },
  },
  Mutation: {
    subscribeMail: async (_obj, _args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      await usersQuery("UPDATE users SET mailingList = TRUE WHERE id = ? LIMIT 1", [context.user.id]);
      return true;
    },
    unsubscribeMail: async (_obj, _args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      await usersQuery("UPDATE users SET mailingList = FALSE WHERE id = ? LIMIT 1", [context.user.id]);
      return true;
    },
    login: async (_obj, args, _context, _info) => {
      const loginQuery = await usersQuery<any>(
        "SELECT * FROM users WHERE email = ? AND password = ? LIMIT 1",
        [args.email, args.passwordSHA256]
      );
      if (loginQuery.length != 1)
        throw new AuthenticationError(ErrMsg("error.invalidcredentails"));

      const token = jwt.sign({id: loginQuery[0].id}, 's0t0', {expiresIn: "30d"});

      return token;
    },
    register: async (_obj, args, _context, _info) => {
      {
        const loginQuery = await usersQuery(
          "SELECT * FROM users WHERE email = ? LIMIT 1",
          [args.email]
        );
        if (loginQuery.length != 0)
          throw new AuthenticationError(ErrMsg("error.emailalreadyinuse"));
      }

      const newToken = [...Array(64)]
        .map(() => Math.random().toString(36)[2])
        .join("");
      await usersQuery(
        "INSERT INTO users (email, password, token) VALUES (?, ?, ?)",
        [args.email, args.passwordSHA256, newToken]
      );
      const loginQuery = await usersQuery<{ id: string }>(
        "SELECT * FROM users WHERE email = ? LIMIT 1",
        [args.email]
      );
      const token = jwt.sign({id: loginQuery[0].id}, 's0t0', {expiresIn: "30d"});
      return token;
    },
    removeAccount: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      const login = await usersQuery(
        "SELECT * FROM users WHERE id = ? AND password = ? LIMIT 1",
        [context.user.id, args.passwordSHA256]
      );
      if (login.length != 1)
        throw new AuthenticationError(ErrMsg("error.invalidcredentails"));
        await usersQuery("DELETE FROM carts WHERE userId = ?", [context.user.id]);
        await usersQuery("DELETE FROM criterions WHERE userId = ?", [context.user.id]);
        await usersQuery("DELETE FROM obligations WHERE userId = ?", [context.user.id]);
        await usersQuery("DELETE FROM users WHERE id = ?", [context.user.id]);
        return true;
    },
    subscribeNotifications: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));

      await usersQuery("UPDATE users SET pushToken = ? WHERE id = ?", [
        args.token,
        context.user.id,
      ]);
      return true;
    },
    changeEmail: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      await usersQuery("UPDATE users SET email = ? WHERE id = ?", [
        args.newEmail,
        context.user.id,
      ]);
      return true;
    },
    changePassword: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      await usersQuery("UPDATE users SET password = ? WHERE id = ?", [
        args.newPasswordSHA256,
        context.user.id,
      ]);
      return true;
    },
  },
};
