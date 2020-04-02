import { ApolloServer } from "apollo-server-micro";
import { MicroRequest } from "apollo-server-micro/dist/types";
import resolvers from "../../server/resolvers";
import typeDefs from "../../server/schema";

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: resolvers as any,
  context: async ({ req }: { req: MicroRequest }) => {
    req;
    // const cookies = parse(req.headers.cookie || "");
    // Use cookies to identify user
    return {};
  },
  formatError: (err: Error) => {
    if (err.message.startsWith("Database Error: ")) {
      return new Error("Internal server error");
    }
    // We can log error to sentry here
    return err;
  }
});

export const config = {
  api: {
    bodyParser: false
  }
};

export default apolloServer.createHandler({ path: "/api/graphql" });
