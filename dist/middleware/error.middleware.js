"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const custom_error_1 = __importDefault(require("../types/custom-error"));
function default_1(error, req, res, next) {
    let code = 500;
    if (error instanceof custom_error_1.default) {
        code = error.code;
    }
    return res.status(code).json({ message: error.message, data: null });
}
exports.default = default_1;
