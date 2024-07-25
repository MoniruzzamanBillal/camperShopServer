/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TOrder } from "./order.interface";
import orderModel from "./order.model";
import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import ProductModel from "../product/product.model";

// ! create order in database
const createOrderInDb = async (payload: TOrder) => {
  console.log(payload);

  const { oid, oquantity } = payload;

  const session = await mongoose.startSession();

  try {
    const newOrder = await orderModel.create(payload, { session });
    if (!newOrder.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "order is unsuccessfull  !! ");
    }

    // ! update product  quantity
    await ProductModel.findByIdAndUpdate(
      oid,
      { $inc: { pquantity: -oquantity } },
      { new: true, runValidators: true, session }
    );

    await session.commitTransaction();
    await session.endSession();

    return newOrder;
    //
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.NOT_ACCEPTABLE, error);
  }
};

// !  get all order from database
const getAllOrderFromDb = async () => {
  const result = await orderModel.find();

  return result;
};

// ! get particular order data
const getSingleOrderFromDb = async (id: string) => {
  const result = await orderModel.findById(id);

  return result;
};

//
export const orderServices = {
  createOrderInDb,
  getAllOrderFromDb,
  getSingleOrderFromDb,
};
