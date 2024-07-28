import { Model } from "mongoose";

export interface TProduct {
  pname: string;
  pcategory: string;
  pquantity: number;
  pimage: string;
  pprice: number;
  pdescriptioin: string;
  isDeleted: boolean;
}

export interface TProductModel extends Model<TProduct> {
  isProductExistById(id: string): Promise<TProduct>;
}
