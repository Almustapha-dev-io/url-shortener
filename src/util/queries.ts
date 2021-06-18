
export const createTables: string = `
    CREATE TABLE IF NOT EXISTS url_table (
        id SERIAL PRIMARY KEY,
        long_url TEXT NOT NULL UNIQUE,
        short_url VARCHAR(255) NOT NULL UNIQUE,
        dateCreated TIMESTAMP DEFAULT NOW()
    );
`;

export const forceCreateTables: string = `
    DROP TABLE IF EXISTS url_table;
    ${createTables}
`;

export const findByLongUrl: string = `
    SELECT * FROM url_table
    WHERE long_url = $1;
`;

export const findByShortUrl: string = `
    SELECT * FROM url_table
    WHERE short_url = $1;
`;

export const insertData: string = `
    INSERT INTO url_table
    VALUES (DEFAULT, $1, $2);
`;