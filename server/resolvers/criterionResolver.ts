import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Resolvers, Criterion } from "../../typing";
import { Criterions } from "../algo/critetions";
import { usersQuery } from "../query";
import { ErrMsg } from "../../interfaces/TranslationEnum";

export const criterionResolvers: Resolvers = {
  Query: {
    criterions: async (_obj, _args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      const critetionsQuery = await usersQuery(
        "SELECT * FROM criterions WHERE userId = ?",
        [context.user.id]
      );
      return Criterions.map<Criterion>((criterionData) => {
        const criterionDb = critetionsQuery.find(
          (c: any) => c.id === criterionData.id
        ) as any;
        return {
          activated: !!criterionDb,
          id: criterionData.id,
          name: criterionData.name,
          position: criterionDb?.position,
        };
      });
    },
  },
  Mutation: {
    setCriterions: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      if (
        args.criterions.some((c1) => !Criterions.find((c2) => c1.id == c2.id))
      )
        throw new UserInputError(ErrMsg("error.badparams"));

      if (args.criterions.some((c) => c.position === 0))
        throw new UserInputError(ErrMsg("error.badparams"));

      Array.from({ length: args.criterions.length }).forEach((_e, i) => {
        if (args.criterions.find((e) => e.position === i + 1) == undefined)
          throw new UserInputError(ErrMsg("error.badparams"));
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
  },
};
