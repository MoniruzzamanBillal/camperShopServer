import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import sendResponse from "../../util/sendResponse";
import { orderServices } from "./order.service";

// ! for adding order
const createOrder = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await orderServices.createOrderInDb(data);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "order added successfully!",
    data: result,
  });
});

// ! get all order data
const getOrders = catchAsync(async (req, res) => {
  const result = await orderServices.getAllOrderFromDb();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Orders retrived successfully!",
    data: result,
  });
});

// ! get particular order data
const getSingleOrder = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await orderServices.getSingleOrderFromDb(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "order retrived successfully!",
    data: result,
  });
});

//
export const orderController = {
  createOrder,
  getOrders,
  getSingleOrder,
};
