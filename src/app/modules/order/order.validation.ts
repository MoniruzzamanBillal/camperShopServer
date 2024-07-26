import { z } from "zod";

// Schema for validating individual product
const productSchema = z.object({
  pid: z.string().min(1, { message: "product id is required !!" }),
  oquantity: z.number().nonnegative({
    message: "order quantity should be a positive number!!!",
  }),
});

//! schema for creating a product
const createOrderValidationSchema = z.object({
  body: z.object({
    userName: z.string().min(1, { message: "user name is required !!" }),
    userEmail: z.string().min(1, { message: "user email is required !!" }),
    products: z
      .array(productSchema)
      .min(1, { message: "at least one product is required !!" }),

    oprice: z
      .number()
      .nonnegative({ message: "order price should be positive number!!!" }),
  }),
});

//
export const orderValidations = {
  createOrderValidationSchema,
};
