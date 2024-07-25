import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import { productServices } from "./product.service";
import sendResponse from "../../util/sendResponse";

// ! creating product
const addProduct = catchAsync(async (req, res) => {
  const data = req.body;

  const result = await productServices.addProductInDatabase(data);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "product added successfully!",
    data: result,
  });
});

// !  get all products
const getAllProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProductFromDb();
  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All product retrived successfully!",
    data: result,
  });
});

// ! get particular data
const getSingleProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productServices.getSingleProductFromDb(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Product retrived successfully!",
    data: result,
  });
});

// ! update particular data
const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productServices.updateProductInDb(id, req.body);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Product updated successfully!",
    data: result,
  });
});

//
export const productController = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
};
