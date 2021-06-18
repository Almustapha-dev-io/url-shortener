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
exports.forceSeed = exports.seed = void 0;
const db_1 = __importDefault(require("./db"));
const queries_1 = require("./queries");
function seed() {
    console.log('To Execute: ' + queries_1.createTables);
    return db_1.default.query(queries_1.createTables);
}
exports.seed = seed;
function forceSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('To Execute: ' + queries_1.forceCreateTables);
        return db_1.default.query(queries_1.forceCreateTables);
    });
}
exports.forceSeed = forceSeed;
