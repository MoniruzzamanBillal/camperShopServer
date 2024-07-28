import mongoose, { Schema } from "mongoose";
import { TProduct, TProductModel } from "./product.interface";

const productSchema = new Schema<TProduct, TProductModel>({
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

productSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// ! statics to check product available
productSchema.statics.isProductExistById = async function (id: string) {
  const res = await ProductModel.findById(id);
  return res;
};

const ProductModel = mongoose.model<TProduct, TProductModel>(
  "Product",
  productSchema
);

export default ProductModel;
