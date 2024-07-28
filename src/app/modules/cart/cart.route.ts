import { Router } from "express";
import { cartController } from "./cart.controller";

const router = Router();

router.post("/add-cart", cartController.addProductToCart);

//
export const cartRouter = router;
