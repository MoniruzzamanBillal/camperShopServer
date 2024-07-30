"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../util/catchAsync"));
const sendResponse_1 = __importDefault(require("../../util/sendResponse"));
const cart_model_1 = require("./cart.model");
const product_model_1 = __importDefault(require("../product/product.model"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
// ! for adding product to cart
const addProductToCart = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const { pid } = data;
    console.log(data);
    // ! find product and check for quantity
    const productQuantity = yield product_model_1.default.findById(pid).select(" pquantity ");
    if (!productQuantity) {
        throw new Error("Product not found !!  ");
    }
    if ((productQuantity === null || productQuantity === void 0 ? void 0 : productQuantity.pquantity) <= 1) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "product is stock out !! ");
    }
    const isCartExist = yield cart_model_1.cartModel.findOne({ pid });
    //   ! if cart exist then add quantity
    if (isCartExist) {
        const updatedRes = yield cart_model_1.cartModel.findOneAndUpdate({ pid }, { $inc: { oquantity: 1 } }, { new: true });
        (0, sendResponse_1.default)(res, {
            status: http_status_1.default.OK,
            success: true,
            message: "cart updated successfully!",
            data: updatedRes,
        });
        return;
    }
    const result = yield cart_model_1.cartModel.create(data);
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: "product added to cart successfully!",
        data: result,
    });
}));
// ! get cart data
const getCartData = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cart_model_1.cartModel.find();
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: " cart data retrived successfully!",
        data: result,
    });
}));
// ! for increasing cart item
const addCartQuantity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pid, oquantity } = req.body;
    const productQuantity = yield product_model_1.default.findById(pid).select(" pquantity ");
    if (!productQuantity) {
        throw new Error("Product not found !!  ");
    }
    if (oquantity >= (productQuantity === null || productQuantity === void 0 ? void 0 : productQuantity.pquantity)) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Order exceeds stock limit !! ");
    }
    const result = yield cart_model_1.cartModel.findOneAndUpdate({ pid }, { $inc: { oquantity: oquantity } }, { new: true });
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: " cart updated successfully!",
        data: result,
    });
}));
// ! for decreasing cart item
const decreaseCartQuantity = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pid } = req.body;
    const cartQuantity = yield cart_model_1.cartModel.findOne({ pid }).select("oquantity");
    if (!cartQuantity) {
        throw new Error("Product not found !!  ");
    }
    if ((cartQuantity === null || cartQuantity === void 0 ? void 0 : cartQuantity.oquantity) <= 1) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Cannot remove product !! ");
    }
    const result = yield cart_model_1.cartModel.findOneAndUpdate({ pid }, { $inc: { oquantity: -1 } }, { new: true });
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: " cart updated successfully!",
        data: result,
    });
}));
// ! for deleting a cart item
const deleteCartItem = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pid } = req.body;
    const cartItem = yield cart_model_1.cartModel.findOne({ pid });
    if (!cartItem) {
        throw new Error("cart item not found !!  ");
    }
    const result = yield cart_model_1.cartModel.findOneAndDelete({ pid });
    (0, sendResponse_1.default)(res, {
        status: http_status_1.default.OK,
        success: true,
        message: " cart item deleted successfully!",
        data: result,
    });
}));
//
exports.cartController = {
    addProductToCart,
    getCartData,
    addCartQuantity,
    decreaseCartQuantity,
    deleteCartItem,
};
