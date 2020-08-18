import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { usersQuery } from "../../server/query";
import resolvers from "../../server/resolvers";
import typeDefs from "../../server/schema";

export const context = async ({ req }: { req: MicroRequest }) => {
  const cookies = req?.headers?.cookie?.split('; ').reduce((prev: any, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev
  }, {});

  const token = req?.headers?.authorization || cookies?.token;

  let user;
  try {
    const userQ = await usersQuery("SELECT * FROM users WHERE token = ? LIMIT 1", [token]);
    if (userQ.length == 1)
      user = userQ[0];
  } catch { }
  return { user, cookies };
}

export const formatError = (err: Error) => {
  if (err.message.startsWith("Database Error: ")) {
    return new Error("Internal server error");
  }
  // We can log error to sentry here
  return err;
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context,
  formatError
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
