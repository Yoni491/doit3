import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import { buildSchema } from "type-graphql";
import { Cat } from "./models/Cat";

const startServer = async () => {
  const app = express();

  const apolloserver = new ApolloServer({
    schema: await buildSchema({
      resolvers: [],
      validate: false,
    }),
    plugins: [],
    context: ({ req, res }): MyContext => ({ req, res, redis }),
  });

  await apolloserver.start();
  apolloserver.applyMiddleware({
    app,
    cors: false,
  });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server.applyMiddleware({ app });

  await mongoose.connect("mongodb://localhost:27017/test3", {
    useNewUrlParser: true,
  });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
