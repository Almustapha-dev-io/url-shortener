"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const url_shortener_controllers_1 = require("../controllers/url-shortener.controllers");
const router = express_1.Router();
router.get('/:url', url_shortener_controllers_1.getUrl);
router.post('/', url_shortener_controllers_1.shortenUrl);
exports.default = router;
