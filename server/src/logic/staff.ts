import { createPool } from './db';
import { StaffPayload } from '../models/types/staff.type';
import { Staff } from '../models/db/staff.model';

export async function getStaff() {
    const pool = createPool();
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT id, name, employment_status AS "employmentStatus",  shift_type AS "shiftType" FROM public."Staff" WHERE is_deleted = FALSE ORDER BY id ASC;`,
            []
        );
        if (result === null) {
            console.log('Could not perform fetch operation form database');
            return null;
        }
        return result.rows as Staff[];
    } catch (err) {
        console.error('Could not get Staff data');
        throw err;
    } finally {
        if (pool !== null && client !== null) {
            client.release();
            pool.end();
        }
    }
}

export async function getEmploymentStatus() {
    const pool = createPool();
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT id, name  FROM public."EmploymentStatus" ORDER BY id ASC;`,
            []
        );
        if (result === null) {
            console.log(
                'Could not perform fetch EmploymentStatus operation form database'
            );
            return null;
        }
        return result.rows;
    } catch (err) {
        console.error('Could not get EmploymentStatus data');
        throw err;
    } finally {
        if (pool !== null && client !== null) {
            client.release();
            pool.end();
        }
    }
}

export async function getShiftType() {
    const pool = createPool();
    const client = await pool.connect();
    try {
        const result = await client.query(
            `SELECT id, name  FROM public."ShiftType" ORDER BY id ASC;`,
            []
        );
        if (result === null) {
            console.log(
                'Could not perform fetch ShiftType operation form database'
            );
            return null;
        }
        return result.rows;
    } catch (err) {
        console.error('Could not get ShiftType data');
        throw err;
    } finally {
        if (pool !== null && client !== null) {
            client.release();
            pool.end();
        }
    }
}

export async function createStaff(data: StaffPayload) {
    const pool = createPool();
    const client = await pool.connect();
    try {
        const result = await client.query(
            `INSERT INTO "Staff"
                    (name, employment_status, shift_type, updated_at, created_at)
                VALUES ($1, $2, $3,CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *`,
            [data.name, data.employmentStatus, data.shiftType]
        );
        if (result.rowCount === 0) {
            console.log('No User record created');
            return null;
        }
        if (result.rowCount > 1) {
            console.log('Conflict when creating staff record');
            return null;
        }
        return result.rows[0] as Staff;
    } catch (err) {
        console.error('Could not save staff record');
        throw err;
    } finally {
        if (pool !== null && client !== null) {
            client.release();
            pool.end();
        }
    }
}
export async function deleteStaff(staffId: number) {
    const pool = createPool();
    const client = await pool.connect();
    try {
        const result = await client.query(
            `UPDATE "Staff"
                SET is_deleted = TRUE, updated_at = CURRENT_TIMESTAMP
                WHERE is_deleted = FALSE AND id = $1
                RETURNING id`,
            [staffId]
        );
        if (result.rowCount > 0) {
            // return true;
            return result.rows[0];
        } else {
            return false;
        }
    } catch (err) {
        console.error('Could not run Staff id check process', err);
        throw err;
    } finally {
        if (pool !== null && client !== null) {
            client.release();
            pool.end();
        }
    }
}

export async function updateStaff(data: StaffPayload, staffId: number) {
    const pool = createPool();
    const client = await pool.connect();
    try {
        const result = await client.query(
            `UPDATE "Staff"
                SET name=$1, employment_status=$2, shift_type=$3, updated_at=CURRENT_TIMESTAMP
                WHERE id=$4 RETURNING id, name, employment_status as "employmentStatus",  shift_type as "shiftType"`,
            [data.name, data.employmentStatus, data.shiftType, staffId]
        );
        if (result.rowCount === 0) {
            console.log('No Staff record created');
            return null;
        }
        return result.rows[0] as Staff;
    } catch (err) {
        console.error('Could not update Staff record');
        throw err;
    } finally {
        if (pool !== null && client !== null) {
            client.release();
            pool.end();
        }
    }
}
