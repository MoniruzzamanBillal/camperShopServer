import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { orderValidations } from "./order.validation";
import { orderController } from "./order.controller";

const router = Router();

// ! create order
router.post(
  "/add-order",
  validateRequest(orderValidations.createOrderValidationSchema),
  orderController.createOrder
);

//   ! get all orders
router.get("/orders", orderController.getOrders);

//

export const orderRouter = router;
