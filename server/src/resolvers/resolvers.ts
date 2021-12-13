import { Item } from "../models/Item";

export const resolvers = {
  Query: {
    items: () => Item.find().sort("-createdAt").exec(),
  },
  Mutation: {
    createItem: async (_: any, { name }: any) => {
      const item = new Item({ name });
      await item.save();
      return item;
    },
    deleteItem: async (_: any, { id }: any) => {
      const { deletedCount } = await Item.deleteOne({ _id: id });
      if (deletedCount == "0") return false;
      return true;
    },
  },
};
