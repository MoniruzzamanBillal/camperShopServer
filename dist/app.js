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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const MainRouter_1 = require("./app/router/MainRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://happy-campers.vercel.app"],
    credentials: true,
}));
app.use((0, morgan_1.default)("dev"));
// ! rouutes
app.use("/api/v1", MainRouter_1.MainRouter);
app.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send({ message: "server is running  !! " });
    }
    catch (error) {
        next(error);
    }
}));
app.all("*", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(400).json({ success: false, message: "Route not found " });
}));
//! global error handler
app.use(globalErrorHandler_1.default);
exports.default = app;
