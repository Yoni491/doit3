import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const startServer = async () => {
  const app = express();

  await mongoose.connect("mongodb://localhost:27017/test3", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const apolloserver = new ApolloServer({
    resolvers,
    typeDefs,
  });
  await apolloserver.start();
  apolloserver.applyMiddleware({
    app,
  });

  app.use(
    cors({
      origin: "http://localhost:3000",
    })
  );
  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${apolloserver.graphqlPath}`
    )
  );
};

startServer();
