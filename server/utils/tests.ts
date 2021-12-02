import { usersQuery } from "../query";
import resolvers from "../resolvers";
import * as jwt from "jsonwebtoken"

const QorM = async (
  op: "Query" | "Mutation",
  resolver: string,
  args: any,
  token?: string
) => {
  let user;
  try {
    if (token) {
      const {id} = jwt.verify(token, 's0t0') as {id: string};
      const userQ = await usersQuery(
        "SELECT * FROM users WHERE id = ? LIMIT 1",
        [id]
      );
      if (userQ.length == 1) user = userQ[0];
    }
  } catch {}
  
  // @ts-ignore
  const elem: any = resolvers![op]![resolver];
  if (!elem) throw "bad resolver name, or missmatch on query/mutation";
  return await elem({}, args, { user }, {});
};

export const Mutate = async (resolver: string, args: any, token?: string) =>
  QorM("Mutation", resolver, args, token);
export const Query = async (resolver: string, args: any, token?: string) =>
  QorM("Query", resolver, args, token);

export function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
