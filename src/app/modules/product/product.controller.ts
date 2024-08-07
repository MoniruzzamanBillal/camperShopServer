import httpStatus from "http-status";
import catchAsync from "../../util/catchAsync";
import { productServices } from "./product.service";
import sendResponse from "../../util/sendResponse";
import ProductModel from "./product.model";

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

// ! get all products count
const getAllProductsCount = catchAsync(async (req, res) => {
  const result = await ProductModel.find();

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "All product count retrived successfully!",
    data: result?.length,
  });
});

// !  get all products
const getAllProducts = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await productServices.getAllProductFromDb(query);
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

// ! delete particular data
const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await productServices.deleteProductInDb(id);

  sendResponse(res, {
    status: httpStatus.OK,
    success: true,
    message: "Product Deleted successfully!",
    data: result,
  });
});

//
export const productController = {
  addProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getAllProductsCount,
};
