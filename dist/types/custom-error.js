"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomError extends Error {
    constructor(message, code) {
        super(message);
        this.message = message;
        this.code = code || 500;
    }
}
exports.default = CustomError;
