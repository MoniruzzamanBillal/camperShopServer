"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidations = void 0;
const zod_1 = require("zod");
//! schema for creating a product
const createProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        pname: zod_1.z.string().min(1, { message: "product name is required !!" }),
        pcategory: zod_1.z
            .string()
            .min(1, { message: "product category is required !!" }),
        pquantity: zod_1.z.number().nonnegative({
            message: "product quantity should be positive number!!!",
        }),
        pprice: zod_1.z
            .number()
            .nonnegative({ message: "product price should be positive number!!!" }),
        pimage: zod_1.z.string().min(1),
        pdescriptioin: zod_1.z
            .string()
            .min(1, { message: "product description is required !!" }),
    }),
    isDeleted: zod_1.z.boolean().default(false),
});
//! schema for updating a product
const updateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        pname: zod_1.z
            .string()
            .min(1, { message: "product name is required !!" })
            .optional(),
        pcategory: zod_1.z
            .string()
            .min(1, { message: "product category is required !!" })
            .optional(),
        pquantity: zod_1.z
            .number()
            .nonnegative({
            message: "product quantity should be positive number!!!",
        })
            .optional(),
        pprice: zod_1.z
            .number()
            .nonnegative({ message: "product price should be positive number!!!" })
            .optional(),
        pimage: zod_1.z.string().min(1).optional(),
        pdescriptioin: zod_1.z
            .string()
            .min(1, { message: "product description is required !!" })
            .optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
//
exports.productValidations = {
    createProductValidationSchema,
    updateProductValidationSchema,
};
