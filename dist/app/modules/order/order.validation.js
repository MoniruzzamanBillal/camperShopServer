"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidations = void 0;
const zod_1 = require("zod");
// Schema for validating individual product
const productSchema = zod_1.z.object({
    pid: zod_1.z.string().min(1, { message: "product id is required !!" }),
    oquantity: zod_1.z.number().nonnegative({
        message: "order quantity should be a positive number!!!",
    }),
});
//! schema for creating a product
const createOrderValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        userName: zod_1.z.string().min(1, { message: "user name is required !!" }),
        userEmail: zod_1.z.string().min(1, { message: "user email is required !!" }),
        products: zod_1.z
            .array(productSchema)
            .min(1, { message: "at least one product is required !!" }),
        oprice: zod_1.z
            .number()
            .nonnegative({ message: "order price should be positive number!!!" }),
    }),
});
//
exports.orderValidations = {
    createOrderValidationSchema,
};
