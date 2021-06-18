import { Pool } from 'pg';

const pool = new Pool({
    database: 'url_shortener',
    host: 'localhost',
    user: 'postgres',
    password: 'admin'
});

export default pool;


