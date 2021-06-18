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
exports.shortenUrl = exports.getUrl = void 0;
const nanoid_1 = require("nanoid");
const validator_1 = __importDefault(require("validator"));
const queries_1 = require("./../util/queries");
const custom_error_1 = __importDefault(require("../types/custom-error"));
const db_1 = __importDefault(require("../util/db"));
const error_handler_1 = __importDefault(require("../util/error-handler"));
const getUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Trying to get shortened at ${req.params.url}`);
    try {
        let url = req.params.url.trim();
        let error;
        if (!url || validator_1.default.isEmpty(url)) {
            error = new custom_error_1.default('An invalid url was provided!', 400);
            throw error;
        }
        console.log('To Execute: ' + queries_1.findByShortUrl);
        const { rows: [data] } = yield db_1.default.query(queries_1.findByShortUrl, [url]);
        if (!data) {
            error = new custom_error_1.default('Resource could not be found!', 404);
            throw error;
        }
        return res.redirect(data.long_url);
    }
    catch (err) {
        error_handler_1.default(next, err);
    }
});
exports.getUrl = getUrl;
const shortenUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Trying to shorten ${req.body.url}`);
    try {
        const host = req.headers.host;
        const { url } = req.body;
        let error;
        if (!url || !validator_1.default.isURL(url)) {
            error = new custom_error_1.default('Invalid url. Please provide a valid url!', 422);
            throw error;
        }
        console.log('To Execute: ' + queries_1.findByLongUrl);
        const { rows: [existingUrl] } = yield db_1.default.query(queries_1.findByLongUrl, [url.toLowerCase()]);
        if (existingUrl) {
            return res.status(200).json({
                message: `${url} was shortened!`,
                data: host + '/short/' + existingUrl.short_url
            });
        }
        const newShorten = {
            short_url: nanoid_1.nanoid(),
            long_url: url.toLowerCase()
        };
        console.log('To Execute: ' + queries_1.insertData);
        yield db_1.default.query(queries_1.insertData, [newShorten.long_url, newShorten.short_url]);
        return res.status(200).json({
            message: `${url} was shortened!`,
            data: host + '/short/' + newShorten.short_url
        });
    }
    catch (err) {
        error_handler_1.default(next, err);
    }
});
exports.shortenUrl = shortenUrl;
