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
router.get("/all", productController.getAllProducts);
router.get("/all-count", productController.getAllProductsCount);

// ! get single product
router.get("/:id", productController.getSingleProduct);

// ! update single product
router.patch(
  "/:id",
  validateRequest(productValidations.updateProductValidationSchema),
  productController.updateProduct
);
// ! delete single product
router.patch("/delete/:id", productController.deleteProduct);

export const productRouter = router;
