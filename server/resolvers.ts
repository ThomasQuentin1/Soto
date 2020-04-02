import { Resolvers } from "../typing";

let testValue = "unset";

const resolvers: Resolvers = {
  Query: {
    getTest: async (_obj, _args, _context, _info) => {
      return { message: testValue };
    }
  },
  Mutation: {
    setTest: async (_obj, args, _context, _info) => {
      testValue = args.message;
      return { message: testValue };
    }
  }
};

export default resolvers;
