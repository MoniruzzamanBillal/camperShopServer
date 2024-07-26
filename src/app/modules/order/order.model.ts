import mongoose, { Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
  userName: {
    type: String,
    required: [true, "user name is required!!"],
  },
  userEmail: {
    type: String,
    required: [true, "user email is required!!"],
  },
  products: [
    {
      pid: {
        type: String,
        required: [true, "product id is required!!"],
      },
      oquantity: {
        type: Number,
        required: [true, "order quantity is required!!"],
      },
    },
  ],
  oprice: {
    type: Number,
    required: [true, "order price is required!!"],
  },
});

export const OrderModel = mongoose.model<TOrder>("order", orderSchema);
