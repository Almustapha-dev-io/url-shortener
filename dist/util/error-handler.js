"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = __importDefault(require("../types/custom-error"));
const errorHandler = (next, err) => {
    if (err instanceof custom_error_1.default) {
        next(err);
    }
    else {
        next(new custom_error_1.default(err.message));
    }
};
exports.default = errorHandler;
