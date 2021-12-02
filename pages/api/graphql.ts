import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { NextApiRequest, NextApiResponse } from "next";
import { usersQuery } from "../../server/query";
import resolvers from "../../server/resolvers";
import typeDefs from "../../server/schema";
import * as jwt from "jsonwebtoken";

export const context = async ({ req }: { req: MicroRequest }) => {
  const cookies = req?.headers?.cookie
    ?.split("; ")
    .reduce((prev: any, current) => {
      const [name, value] = current.split("=");
      prev[name] = value;
      return prev;
    }, {});

  const token = req?.headers?.authorization || cookies?.token;

  let user;
  try {
    const {id} = jwt.verify(token, 's0t0') as {id: string};
    const userQ = await usersQuery(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [id]
    );
    if (userQ.length == 1) user = userQ[0];
  } catch {}
  return { user, cookies };
};

export const formatError = (err: Error) => {
  if (err.message.startsWith("Database Error: ")) {
    return new Error("Internal server error");
  }
  // We can log error to sentry here
  return err;
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context,
  formatError,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const apolloHandler = apolloServer.createHandler({ path: "/api/graphql" });

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, PUT, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, Content-Length, Accept-Encoding, Authorization,X-CSRF-Token"
  );
  res.setHeader("Access-Control-Expose-Headers", "Authorization");

  if (req.method === "OPTIONS") {
    res.end();
    return;
  }
  return apolloHandler(req, res);
};
