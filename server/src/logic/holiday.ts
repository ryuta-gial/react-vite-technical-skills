import { createPool } from './db';
import { HolidayPayload } from '../models/types/holiday.type';
import { Holiday } from '../models/db/holiday.model';
import { ulid } from 'ulid';


export async function getHoliday() {
    const pool = createPool();
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT id, title, TO_CHAR(holiday, 'YYYY-MM-dd') AS "start" FROM public."Holiday" ORDER BY holiday ASC;`,
            []
        );
        if (result === null) {
            console.log('Could not perform fetch operation form database');
            return null;
        }
        return result.rows as Holiday[];
    } catch (err) {
        console.error('Could not get Holiday data');
        throw err;
    } finally {
        if (pool !== null && client !== null) {
            client.release();
            pool.end();
        }
    }
}

export async function createHoliday(data: HolidayPayload) {
    const id = ulid();
    const pool = createPool();
    const client = await pool.connect();
    try {
        const result = await client.query(
            `INSERT INTO "Holiday"
                    (id,title, holiday, updated_at, created_at)
                VALUES ($1,$2,$3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id, title, TO_CHAR(holiday, 'YYYY-MM-dd') AS "start"`,
            [id,data.title, data.holiday]
        );
        if (result.rowCount === 0) {
            console.log('No Holiday record created');
            return null;
        }
        if (result.rowCount > 1) {
            console.log('Conflict when creating holiday record');
            return null;
        }
        return result.rows[0] as Holiday;
    } catch (err) {
        console.error('Could not save holiday record');
        throw err;
    } finally {
        if (pool !== null && client !== null) {
            client.release();
            pool.end();
        }
    }
}
export async function deleteHoliday(holiday: string) {
    const pool = createPool();
    const client = await pool.connect();
    try {
        const result = await client.query(
            `DELETE  FROM "Holiday"
                WHERE id = $1
                RETURNING id`,
            [holiday]
        );
        if (result.rowCount > 0) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.error('Could not run Holiday id check process', err);
        throw err;
    } finally {
        if (pool !== null && client !== null) {
            client.release();
            pool.end();
        }
    }
}
