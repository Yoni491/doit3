import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    items: [Item!]!
  }

  type Item {
    id: ID!
    name: String!
    createdAt: String!
  }

  type Mutation {
    createItem(name: String!): Item!
    deleteItem(id: String!): Boolean
  }
`;
