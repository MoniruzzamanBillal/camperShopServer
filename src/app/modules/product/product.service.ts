/* eslint-disable @typescript-eslint/no-explicit-any */

import Querybuilder from "../../builder/Queryuilder";
import { ProductSearchableFields } from "./product.constant";
import { TProduct } from "./product.interface";
import ProductModel from "./product.model";

// ! adding product in databasee
const addProductInDatabase = async (payload: TProduct) => {
  const response = await ProductModel.create(payload);

  return response;
};

// !  get all products from database
const getAllProductFromDb = async (query: Record<string, unknown>) => {
  const findPromise = ProductModel.find();

  if (query?.pprice) {
    const { pprice } = query;

    const priceQuery = findPromise.find({ pprice: { $lte: pprice } });
    const productQuery = new Querybuilder(priceQuery, query)
      .search(ProductSearchableFields)
      .filter()
      .sort();

    const result = await productQuery.queryModel;

    return result;
  }

  const productQuery = new Querybuilder(findPromise, query)
    .search(ProductSearchableFields)
    .filter()
    .sort();

  const result = await productQuery.queryModel;

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

// ! delete  product from db
const deleteProductInDb = async (id: string) => {
  const result = await ProductModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    {
      new: true,
      runValidators: true,
    }
  );

  return result;
};

//
export const productServices = {
  addProductInDatabase,
  getAllProductFromDb,
  getSingleProductFromDb,
  updateProductInDb,
  deleteProductInDb,
};
