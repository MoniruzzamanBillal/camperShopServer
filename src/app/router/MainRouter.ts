import { Router } from "express";
import { testRouter } from "../modules/boilerModule/test.route";
import { productRouter } from "../modules/product/product.route";
import { orderRouter } from "../modules/order/order.route";

const router = Router();

const routeArray = [
  {
    path: "/test",
    route: testRouter,
  },
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/order",
    route: orderRouter,
  },
];

routeArray.forEach((item) => {
  router.use(item.path, item.route);
});

export const MainRouter = router;
