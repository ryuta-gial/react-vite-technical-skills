import { createPool } from './db';
import { HopeHolidayPayload } from '../models/types/hopeHoliday.type';
import { HopeHoliday } from '../models/db/hopeHoliday.model';

export async function getHopeHoliday() {
  const pool = createPool();
  const client = await pool.connect();
  try {
    const result = await client.query(
      `SELECT id ,staff_id AS "staffId" , to_char(hope_holiday,'yyyy-MM-dd') AS "hopeHoliday" , staff_hope_holiday AS "staffHopeHoliday" FROM public."HopeHoliday" ORDER BY hope_holiday ASC;`,
      []
    );
    if (result === null) {
      console.log('Could not perform fetch operation form database');
      return null;
    }
    return result.rows as HopeHoliday[];
  } catch (err) {
    console.error('Could not get hopeHoliday data');
    throw err;
  } finally {
    if (pool !== null && client !== null) {
      client.release();
      pool.end();
    }
  }
}

export async function createHopeHoliday(data: HopeHolidayPayload) {
  const pool = createPool();
  const client = await pool.connect();
  try {
    const result = await client.query(
      `INSERT INTO "HopeHoliday"
                    (staff_id, hope_holiday,staff_hope_holiday, updated_at, created_at)
                VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING id, staff_id AS "staffId", to_char(hope_holiday,'yyyy-MM-dd') AS "hopeHoliday", staff_hope_holiday AS "staffHopeHoliday"`,
      [data.staffId, data.hopeHoliday,data.staffHopeHoliday]
    );
    if (result.rowCount === 0) {
      console.log('No HopeHoliday record created');
      return null;
    }
    if (result.rowCount > 1) {
      console.log('Conflict when creating HopeHoliday record');
      return null;
    }
    return result.rows[0] as HopeHoliday;
  } catch (err) {
    console.error('Could not save HopeHoliday record');
    throw err;
  } finally {
    if (pool !== null && client !== null) {
      client.release();
      pool.end();
    }
  }
}
export async function deleteHopeHoliday(data: HopeHolidayPayload) {
  const pool = createPool();
  const client = await pool.connect();
  try {
    const result = await client.query(
      `DELETE  FROM "HopeHoliday"
                WHERE staff_hope_holiday = $1
                RETURNING id`,
      [data.staffHopeHoliday]
    );
    if (result.rowCount > 0) {
      return result.rows[0];
    } else {
      return false;
    }
  } catch (err) {
    console.error('Could not run HopeHoliday id check process', err);
    throw err;
  } finally {
    if (pool !== null && client !== null) {
      client.release();
      pool.end();
    }
  }
}
