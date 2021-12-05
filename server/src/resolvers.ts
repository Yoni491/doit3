import { Item } from "./models/Item";

export const resolvers = {
  Query: {
    hello: () => "hi",
    items: () => Item.find(),
  },
  Mutation: {
    createItem: async (_: any, { name }: any) => {
      const item = new Item({ name });
      await item.save();
      return item;
    },
  },
};

