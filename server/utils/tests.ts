import { ApolloServer } from 'apollo-server';
import { createTestClient } from 'apollo-server-testing';
import { context, formatError } from "../../pages/api/graphql";
import { usersQuery } from '../query';
import resolvers from "../resolvers";
import typeDefs from "../schema";

export const loggedTestUser = (token: string) => createTestClient(
    new ApolloServer({
        typeDefs,
        resolvers: resolvers as any,
        context: async () => {
            let user;
            try {
                const userQ = await usersQuery("SELECT * FROM users WHERE token = ? LIMIT 1", [token]);
                if (userQ.length == 1)
                    user = userQ[0];
            } catch { }
            return { user };
        },
        formatError,
    }));

export const anonymousTestUser = () => createTestClient(
    new ApolloServer({
        typeDefs,
        resolvers: resolvers as any,
        context,
        formatError,
    }));