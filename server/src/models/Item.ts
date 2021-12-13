import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema(
  {
    name: String!,
  },
  {
    timestamps: true,
  }
);
export const Item = mongoose.model("Item", ItemSchema);
