import { Router } from "express";
import { cartController } from "./cart.controller";

const router = Router();

router.get("/get-cart", cartController.getCartData);
router.patch("/increase-quantity", cartController.addCartQuantity);
router.patch("/decrease-quantity", cartController.decreaseCartQuantity);

router.post("/add-cart", cartController.addProductToCart);

//
export const cartRouter = router;
