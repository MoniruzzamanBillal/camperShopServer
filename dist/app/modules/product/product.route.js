"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const product_validation_1 = require("./product.validation");
const router = (0, express_1.Router)();
// ! adding product
router.post("/add-product", (0, validateRequest_1.default)(product_validation_1.productValidations.createProductValidationSchema), product_controller_1.productController.addProduct);
// ! get all product
router.get("/all", product_controller_1.productController.getAllProducts);
// ! get single product
router.get("/:id", product_controller_1.productController.getSingleProduct);
// ! update single product
router.patch("/:id", (0, validateRequest_1.default)(product_validation_1.productValidations.updateProductValidationSchema), product_controller_1.productController.updateProduct);
// ! delete single product
router.patch("/delete/:id", product_controller_1.productController.deleteProduct);
exports.productRouter = router;
