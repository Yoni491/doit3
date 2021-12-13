import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers/resolvers";
import { typeDefs } from "./typeDefs";
import corsMiddleware from "cors";

const startServer = async () => {
  const apolloserver = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req, res }: any) => ({ req, res }),
  });

  await mongoose.connect("mongodb://localhost:27017/DoiT", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("debug", true);
  const app = express();

  app.use(corsMiddleware({ origin: "*" }));

  await apolloserver.start();

  apolloserver.applyMiddleware({
    app,
  });

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloserver.graphqlPath}`
    )
  );
};

startServer();
