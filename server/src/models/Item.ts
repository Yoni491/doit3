import mongoose, { Schema } from "mongoose";

const ItemSchema = new Schema({ name: String });
export const Item = mongoose.model("Item", ItemSchema);
