"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertData = exports.findByShortUrl = exports.findByLongUrl = exports.forceCreateTables = exports.createTables = void 0;
exports.createTables = `
    CREATE TABLE IF NOT EXISTS url_table (
        id SERIAL PRIMARY KEY,
        long_url TEXT NOT NULL UNIQUE,
        short_url VARCHAR(255) NOT NULL UNIQUE,
        dateCreated TIMESTAMP DEFAULT NOW()
    );
`;
exports.forceCreateTables = `
    DROP TABLE IF EXISTS url_table;
    ${exports.createTables}
`;
exports.findByLongUrl = `
    SELECT * FROM url_table
    WHERE long_url = $1;
`;
exports.findByShortUrl = `
    SELECT * FROM url_table
    WHERE short_url = $1;
`;
exports.insertData = `
    INSERT INTO url_table
    VALUES (DEFAULT, $1, $2);
`;
