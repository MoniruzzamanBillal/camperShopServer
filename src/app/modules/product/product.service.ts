/* eslint-disable @typescript-eslint/no-explicit-any */

import { TProduct } from "./product.interface";
import ProductModel from "./product.model";

// ! adding product in databasee
const addProductInDatabase = async (payload: TProduct) => {
  const response = await ProductModel.create(payload);
  return response;
};

// !  get all products from database
const getAllProductFromDb = async () => {
  const result = await ProductModel.find();

  return result;
};

// ! get particular data
const getSingleProductFromDb = async (id: string) => {
  const result = await ProductModel.findById(id);

  return result;
};

// ! update  product
const updateProductInDb = async (id: string, payload: Partial<TProduct>) => {
  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

//
export const productServices = {
  addProductInDatabase,
  getAllProductFromDb,
  getSingleProductFromDb,
  updateProductInDb,
};
