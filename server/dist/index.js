"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const resolvers_1 = require("./resolvers");
const typeDefs_1 = require("./typeDefs");
const cors_1 = __importDefault(require("cors"));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const apolloserver = new apollo_server_express_1.ApolloServer({
        resolvers: resolvers_1.resolvers,
        typeDefs: typeDefs_1.typeDefs,
    });
    yield mongoose_1.default.connect("mongodb://localhost:27017/test3", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose_1.default.set("debug", true);
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
    yield apolloserver.start();
    apolloserver.applyMiddleware({
        app,
        cors: false,
    });
    app.listen({ port: 4000 }, () => console.log(`🚀 Server ready at http://localhost:4000${apolloserver.graphqlPath}`));
});
startServer();
//# sourceMappingURL=index.js.map