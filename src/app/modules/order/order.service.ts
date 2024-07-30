/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from "mongoose";
import { TOrder } from "./order.interface";

import AppError from "../../Error/AppError";
import httpStatus from "http-status";
import ProductModel from "../product/product.model";
import { OrderModel } from "./order.model";
import { cartModel } from "../cart/cart.model";

// ! create order in database
const createOrderInDb = async (payload: TOrder) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const newOrder = await OrderModel.create([payload], { session });

    if (!newOrder.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "order is unsuccessfull  !! ");
    }

    // * updating product

    for (const item of payload.products) {
      const { pid, oquantity } = item;

      //! check if product abailable
      const checkProduct = await ProductModel.isProductExistById(pid);
      if (!checkProduct) {
        throw new AppError(httpStatus.NOT_FOUND, "Product dont exist !! ");
      }

      // ! check to check order quantity is more than product quantity
      const isOverQuantityOrder = checkProduct?.pquantity >= oquantity;

      if (!isOverQuantityOrder) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "Order quantity exceeds !! "
        );
      }

      // ! update product  quantity
      const updatedRes = await ProductModel.findByIdAndUpdate(
        pid,
        { $inc: { pquantity: -oquantity } },
        { new: true, runValidators: true, session }
      );

      if (!updatedRes) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          "order is unsuccessfull  !! "
        );
      }
    }

    // ! removing cart data
    const deleteCart = await cartModel.deleteMany({}, { session });

    if (!deleteCart) {
      throw new AppError(httpStatus.BAD_REQUEST, "order is unsuccessfull  !! ");
    }

    await session.commitTransaction();
    await session.endSession();

    return newOrder;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(httpStatus.NOT_ACCEPTABLE, error);
  }
  // return null;
};

// !  get all order from database
const getAllOrderFromDb = async () => {
  const result = await OrderModel.find();

  return result;
};

// ! get particular order data
const getSingleOrderFromDb = async (id: string) => {
  const result = await OrderModel.findById(id);

  return result;
};

//
export const orderServices = {
  createOrderInDb,
  getAllOrderFromDb,
  getSingleOrderFromDb,
};
