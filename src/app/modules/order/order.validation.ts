import { z } from "zod";

//! schema for creating a product
const createOrderValidationSchema = z.object({
  body: z.object({
    userName: z.string().min(1, { message: "user name is required !!" }),
    userEmail: z.string().min(1, { message: "user email is required !!" }),
    pid: z.string().min(1, { message: "product id is required !!" }),
    oname: z.string().min(1, { message: "order name is required !!" }),

    oquantity: z.number().nonnegative({
      message: "order quantity should be positive number!!!",
    }),
    oprice: z
      .number()
      .nonnegative({ message: "order price should be positive number!!!" }),
  }),
});

//
export const orderValidations = {
  createOrderValidationSchema,
};
