import { createPool } from './db';
import { RequiredNumberOfPeople } from '../models/db/requiredNumberOfPeople.model';

export async function getRequiredNumberOfPeople() {
    const pool = createPool();
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT id ,to_char(work_date,'yyyy-MM-dd') AS "workDate" ,number_of_people AS "numberOfPeople" FROM public."RequiredNumberOfPeople" ORDER BY work_date ASC;`,
            []
        );
        if (result === null) {
            console.log('Could not perform fetch operation form database');
            return null;
        }
        return result.rows as RequiredNumberOfPeople[];
    } catch (err) {
        console.error('Could not get requiredNumberOfPeople data');
        throw err;
    } finally {
        if (pool !== null && client !== null) {
            client.release();
            pool.end();
        }
    }
}
