import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@as-integrations/express5';
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
export async function initServer() {
    const app = express();
    app.use(cors());
    app.use(bodyParser.json());
    const graphqlServer = new ApolloServer({
        typeDefs: `type Query {
            hello: String
        }`,
        resolvers: {
            Query: {
                hello: () => "hello world",
            }
        },
    });
    await graphqlServer.start();
    app.use('/graphql', expressMiddleware(graphqlServer));
    return app;
}   
