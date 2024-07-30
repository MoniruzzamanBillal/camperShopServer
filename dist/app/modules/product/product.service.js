"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
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
exports.productServices = void 0;
const Queryuilder_1 = __importDefault(require("../../builder/Queryuilder"));
const product_constant_1 = require("./product.constant");
const product_model_1 = __importDefault(require("./product.model"));
// ! adding product in databasee
const addProductInDatabase = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield product_model_1.default.create(payload);
    return response;
});
// !  get all products from database
const getAllProductFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const findPromise = product_model_1.default.find();
    if (query === null || query === void 0 ? void 0 : query.pprice) {
        const { pprice } = query;
        const priceQuery = findPromise.find({ pprice: { $lte: pprice } });
        const productQuery = new Queryuilder_1.default(priceQuery, query)
            .search(product_constant_1.ProductSearchableFields)
            .filter()
            .sort()
            .pagination();
        const result = yield productQuery.queryModel;
        return result;
    }
    const productQuery = new Queryuilder_1.default(findPromise, query)
        .search(product_constant_1.ProductSearchableFields)
        .filter()
        .sort()
        .pagination();
    const result = yield productQuery.queryModel;
    return result;
});
// ! get particular data
const getSingleProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findById(id);
    return result;
});
// ! update  product
const updateProductInDb = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// ! delete  product from db
const deleteProductInDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, {
        new: true,
        runValidators: true,
    });
    return result;
});
//
exports.productServices = {
    addProductInDatabase,
    getAllProductFromDb,
    getSingleProductFromDb,
    updateProductInDb,
    deleteProductInDb,
};
