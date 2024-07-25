import { Router } from "express";
import { productController } from "./product.controller";
import validateRequest from "../../middleware/validateRequest";
import { productValidations } from "./product.validation";

const router = Router();

// ! adding product
router.post(
  "/add-product",
  validateRequest(productValidations.createProductValidationSchema),
  productController.addProduct
);

// ! get all product
router.get("/products", productController.getAllProducts);

// ! get single product
router.get("/product/:id", productController.getSingleProduct);

// ! update single product
router.patch(
  "/product/:id",
  validateRequest(productValidations.updateProductValidationSchema),
  productController.updateProduct
);

export const productRouter = router;
