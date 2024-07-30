"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const cart_controller_1 = require("./cart.controller");
const router = (0, express_1.Router)();
router.get("/get-cart", cart_controller_1.cartController.getCartData);
router.patch("/increase-quantity", cart_controller_1.cartController.addCartQuantity);
router.patch("/decrease-quantity", cart_controller_1.cartController.decreaseCartQuantity);
router.patch("/delete-cart", cart_controller_1.cartController.deleteCartItem);
router.post("/add-cart", cart_controller_1.cartController.addProductToCart);
//
exports.cartRouter = router;
