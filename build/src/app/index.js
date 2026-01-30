import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import { User } from "./user/index.js";
import JWTService from "../services/jwt.js";
export async function initServer() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    const graphqlServer = new ApolloServer({
        typeDefs: `
        ${User.types}

        type Query {
            ${User.queries}
        }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries
            }
        },
    });
    await graphqlServer.start();
    app.use('/graphql', expressMiddleware(graphqlServer, { context: async ({ req, res }) => {
            const token = req.headers.authorization?.split("Bearer ")[1];
            const user = token ? await JWTService.decodeToken(token) : null;
            return {
                user
            };
        } }));
    return app;
}
//# sourceMappingURL=index.js.map