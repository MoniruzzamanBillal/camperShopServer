import mongoose, { Schema } from "mongoose";
import { TCart } from "./cart.interface";

const cartSchema = new Schema<TCart>({
  pid: {
    type: String,
    required: [true, "product id is required!!"],
  },
  oquantity: {
    type: Number,
    required: [true, "order quantity is required!!"],
    default: 1,
  },
  pprice: {
    type: Number,
    required: [true, "product price is required!!"],
  },
});

export const cartModel = mongoose.model<TCart>("Cart", cartSchema);
