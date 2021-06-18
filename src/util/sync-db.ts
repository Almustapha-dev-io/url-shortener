import { QueryResult } from 'pg';
import pool from './db';

import { createTables, forceCreateTables } from './queries';

export function seed(): Promise<QueryResult<any>> {
    console.log('To Execute: ' + createTables);
    return pool.query(createTables);
}

export async function forceSeed() {
    console.log('To Execute: ' + forceCreateTables)
    return pool.query(forceCreateTables);
}