import { Pool } from 'pg';
import { config } from 'dotenv';

// TODO: transfer to config file
export const SESSION_LIFETIME = 3600000 * 24 * 14; // 2 weeks

export function createPool() {
    const port = process.env.POSTGRES_PORT;
    return new Pool({
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        host: process.env.POSTGRES_HOST,
        port: port ? parseInt(port) : 5432,
        database: process.env.POSTGRES_DB,
    });
}
