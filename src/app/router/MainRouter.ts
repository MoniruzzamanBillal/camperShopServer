import { Router } from "express";

import { productRouter } from "../modules/product/product.route";
import { orderRouter } from "../modules/order/order.route";
import { cartRouter } from "../modules/cart/cart.route";

const router = Router();

const routeArray = [
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/order",
    route: orderRouter,
  },
  {
    path: "/cart",
    route: cartRouter,
  },
];

routeArray.forEach((item) => {
  router.use(item.path, item.route);
});

export const MainRouter = router;
