import { z } from "zod";

//! schema for creating a product
const createProductValidationSchema = z.object({
  body: z.object({
    pname: z.string().min(1, { message: "product name is required !!" }),
    pcategory: z
      .string()
      .min(1, { message: "product category is required !!" }),
    pquantity: z.number().nonnegative({
      message: "product quantity should be positive number!!!",
    }),
    pprice: z
      .number()
      .nonnegative({ message: "product price should be positive number!!!" }),
    pimage: z.string().min(1),
    pdescriptioin: z
      .string()
      .min(1, { message: "product description is required !!" }),
  }),
  isDeleted: z.boolean().default(false),
});

//! schema for updating a product
const updateProductValidationSchema = z.object({
  body: z.object({
    pname: z
      .string()
      .min(1, { message: "product name is required !!" })
      .optional(),
    pcategory: z
      .string()
      .min(1, { message: "product category is required !!" })
      .optional(),
    pquantity: z
      .number()
      .nonnegative({
        message: "product quantity should be positive number!!!",
      })
      .optional(),
    pprice: z
      .number()
      .nonnegative({ message: "product price should be positive number!!!" })
      .optional(),
    pimage: z.string().min(1).optional(),
    pdescriptioin: z
      .string()
      .min(1, { message: "product description is required !!" })
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});

//
export const productValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
