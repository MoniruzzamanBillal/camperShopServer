import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { cartModel } from "./cart.model";
import ProductModel from "../product/product.model";
import AppError from "../../Error/AppError";

// ! for adding product to cart
const addProductToCart = catchAsync(async (req, res) => {
  const data = req.body;
  const { pid } = data;

  const isCartExist = await cartModel.findOne({ pid });

  //   ! if cart exist then add quantity
  if (isCartExist) {
    const updatedRes = await cartModel.findOneAndUpdate(
      { pid },
      { $inc: { oquantity: 1 } },
      { new: true }
    );

    sendResponse(res, {
      status: httpStatus.OK,
      success: true,
      message: "cart updated successfully!",
      data: updatedRes,
    });

    return;
  }

  const result = await cartModel.create(data);
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "product added to cart successfully!",
    data: result,
  });
});

// ! get cart data
const getCartData = catchAsync(async (req, res) => {
  const result = await cartModel.find();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: " cart data retrived successfully!",
    data: result,
  });
});

// ! for increasing cart item
const addCartQuantity = catchAsync(async (req, res) => {
  const { pid, oquantity } = req.body;

  const productQuantity =
    await ProductModel.findById(pid).select(" pquantity ");

  if (!productQuantity?.pquantity || !productQuantity) {
    throw new Error("Product not found !!  ");
  }

  if (oquantity >= productQuantity?.pquantity) {
    throw new AppError(httpStatus.BAD_REQUEST, "Order exceeds stock limit !! ");
  }

  const result = await cartModel.findOneAndUpdate(
    { pid },
    { $inc: { oquantity: oquantity } },
    { new: true }
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: " cart updated successfully!",
    data: result,
  });
});

// ! for decreasing cart item
const decreaseCartQuantity = catchAsync(async (req, res) => {
  const { pid } = req.body;

  const cartQuantity = await cartModel.findOne({ pid }).select("oquantity");

  if (!cartQuantity) {
    throw new Error("Product not found !!  ");
  }

  if (cartQuantity?.oquantity <= 1) {
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot remove product !! ");
  }

  const result = await cartModel.findOneAndUpdate(
    { pid },
    { $inc: { oquantity: -1 } },
    { new: true }
  );

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: " cart updated successfully!",
    data: result,
  });
});

// ! for deleting a cart item
const deleteCartItem = catchAsync(async (req, res) => {
  const { pid } = req.body;
  const cartItem = await cartModel.findOne({ pid });
  if (!cartItem) {
    throw new Error("cart item not found !!  ");
  }

  const result = await cartModel.findOneAndDelete({ pid });

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: " cart item deleted successfully!",
    data: result,
  });
});

//
export const cartController = {
  addProductToCart,
  getCartData,
  addCartQuantity,
  decreaseCartQuantity,
  deleteCartItem,
};
