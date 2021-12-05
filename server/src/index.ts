import { ApolloServer } from "apollo-server-express";
//import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";
import corsMiddleware from "cors";
//import session from "express-session";

const startServer = async () => {
  const apolloserver = new ApolloServer({
    resolvers,
    typeDefs,
    context: ({ req, res }: any) => ({ req, res }),
  });

  await mongoose.connect("mongodb://localhost:27017/test3", {
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
