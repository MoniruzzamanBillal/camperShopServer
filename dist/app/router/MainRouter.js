"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainRouter = void 0;
const express_1 = require("express");
const product_route_1 = require("../modules/product/product.route");
const order_route_1 = require("../modules/order/order.route");
const cart_route_1 = require("../modules/cart/cart.route");
const router = (0, express_1.Router)();
const routeArray = [
    {
        path: "/product",
        route: product_route_1.productRouter,
    },
    {
        path: "/order",
        route: order_route_1.orderRouter,
    },
    {
        path: "/cart",
        route: cart_route_1.cartRouter,
    },
];
routeArray.forEach((item) => {
    router.use(item.path, item.route);
});
exports.MainRouter = router;
