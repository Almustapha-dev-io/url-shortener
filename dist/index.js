"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./util/db"));
const sync_db_1 = require("./util/sync-db");
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const url_shortener_routes_1 = __importDefault(require("./routes/url-shortener.routes"));
const app = express_1.default();
app.use(express_1.default.json());
app.use('/short', url_shortener_routes_1.default);
app.use(error_middleware_1.default);
const port = process.env.PORT || 8080;
app.listen(port, () => {
    sync_db_1.seed()
        .then(() => {
        console.log('DB seeded!');
        console.log(`Listening on ${port}...`);
    })
        .catch(err => {
        console.error(err);
        db_1.default.end();
        process.exit(1);
    });
});
