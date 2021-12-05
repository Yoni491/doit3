import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import corsMiddleware from "cors";

import {
  ApolloServerPluginLandingPageDisabled,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from "apollo-server-core";

const startServer = async () => {
  const apolloserver = new ApolloServer({
    resolvers,
    typeDefs,
  });

  await mongoose.connect("mongodb://localhost:27017/test3", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("debug", true);

  const app = express();

  //app.use(corsMiddleware({ origin: "*", credentials: true }));
  app.use(
    corsMiddleware({ origin: "http://localhost:3000", credentials: true })
  );

  await apolloserver.start();

  apolloserver.applyMiddleware({
    app,
    cors: false,
  });

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloserver.graphqlPath}`
    )
  );
};

startServer();
