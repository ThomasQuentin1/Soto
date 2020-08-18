import { usersQuery } from '../query';
import resolvers from "../resolvers";

const QorM = async (op: "Query" | "Mutation", resolver: string, args: any, token?: string) => {
    let user = null;
    if (token) {
        const userQ = await usersQuery("SELECT * FROM users WHERE token = ?", [token]);
        if (userQ.length == 1)
            user = userQ[0];
    }
    // @ts-ignore
    const elem: any = resolvers![op]![resolver];
    return await elem({}, args, { user }, {});
}

export const Mutate = async (resolver: string, args: any, token?: string) => QorM("Mutation", resolver, args, token);
export const Query = async (resolver: string, args: any, token?: string) => QorM("Query", resolver, args, token);