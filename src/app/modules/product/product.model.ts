import mongoose, { Schema } from "mongoose";
import { TProduct } from "./product.interface";

const productSchema = new Schema<TProduct>({
  pname: {
    type: String,
    required: [true, "product name is required!!"],
  },
  pcategory: {
    type: String,
    required: [true, "product category is required!!"],
  },
  pquantity: {
    type: Number,
    required: [true, "product quantity is required!!"],
  },
  pprice: {
    type: Number,
    required: [true, "product price is required!!"],
  },
  pimage: {
    type: String,
    required: [true, "product image is required!!"],
  },
  pdescriptioin: {
    type: String,
    required: [true, "product description is required!!"],
  },
});

const ProductModel = mongoose.model<TProduct>("Product", productSchema);

export default ProductModel;
