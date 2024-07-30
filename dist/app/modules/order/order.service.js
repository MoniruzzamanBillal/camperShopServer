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
exports.orderServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../Error/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const product_model_1 = __importDefault(require("../product/product.model"));
const order_model_1 = require("./order.model");
const cart_model_1 = require("../cart/cart.model");
// ! create order in database
const createOrderInDb = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newOrder = yield order_model_1.OrderModel.create([payload], { session });
        if (!newOrder.length) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "order is unsuccessfull  !! ");
        }
        // * updating product
        for (const item of payload.products) {
            const { pid, oquantity } = item;
            //! check if product abailable
            const checkProduct = yield product_model_1.default.isProductExistById(pid);
            if (!checkProduct) {
                throw new AppError_1.default(http_status_1.default.NOT_FOUND, "Product dont exist !! ");
            }
            // ! check to check order quantity is more than product quantity
            const isOverQuantityOrder = (checkProduct === null || checkProduct === void 0 ? void 0 : checkProduct.pquantity) >= oquantity;
            if (!isOverQuantityOrder) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "Order quantity exceeds !! ");
            }
            // ! update product  quantity
            const updatedRes = yield product_model_1.default.findByIdAndUpdate(pid, { $inc: { pquantity: -oquantity } }, { new: true, runValidators: true, session });
            if (!updatedRes) {
                throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "order is unsuccessfull  !! ");
            }
        }
        // ! removing cart data
        const deleteCart = yield cart_model_1.cartModel.deleteMany({}, { session });
        if (!deleteCart) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, "order is unsuccessfull  !! ");
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newOrder;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new AppError_1.default(http_status_1.default.NOT_ACCEPTABLE, error);
    }
    // return null;
});
// !  get all order from database
const getAllOrderFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.find();
    return result;
});
// ! get particular order data
const getSingleOrderFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.OrderModel.findById(id);
    return result;
});
//
exports.orderServices = {
    createOrderInDb,
    getAllOrderFromDb,
    getSingleOrderFromDb,
};
