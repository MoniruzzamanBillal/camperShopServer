import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { cartModel } from "./cart.model";

// ! for adding product to cart
const addProductToCart = catchAsync(async (req, res) => {
  const data = req.body;

  console.log(data);

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

//
export const cartController = {
  addProductToCart,
};
