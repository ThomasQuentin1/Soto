import { AuthenticationError, UserInputError } from "apollo-server-micro";
import { Resolvers, Obligation } from "../../typing";
import { Obligations } from "../algo/obligations";
import { usersQuery } from "../query";
import { ErrMsg } from "../../interfaces/TranslationEnum";

export const obligationResolvers: Resolvers = {
  Query: {
    obligations: async (_obj, _args, context, _info) => {
      if (!context.user) {
        return Obligations.map<Obligation>((obligationData) => {
          return {
            activated: false,
            id: obligationData.id,
            name: obligationData.name,
          };
        });
      }
      const obligationsQuery = await usersQuery(
        "SELECT * FROM obligations WHERE userId = ?",
        [context.user.id]
      );
      return Obligations.map<Obligation>((obligationData) => {
        const obligationDb = obligationsQuery.find(
          (c: any) => c.id === obligationData.id
        ) as any;
        return {
          activated: !!obligationDb,
          id: obligationData.id,
          name: obligationData.name,
        };
      });
    },
  },
  Mutation: {
    setObligations: async (_obj, args, context, _info) => {
      if (!context.user)
        throw new AuthenticationError(ErrMsg("error.notloggedin"));
      if (
        args.obligations.some((c1) => !Obligations.find((c2) => c1.id == c2.id))
      )
        throw new UserInputError(ErrMsg("error.badparams"));

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
  },
};
