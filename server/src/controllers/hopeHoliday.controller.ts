import { Response } from 'express';
import { ErrPayload } from '../models/types/error.type';
import { HopeHolidayPayload } from '../models/types/hopeHoliday.type';
import {
  getHopeHoliday,
  createHopeHoliday,
  deleteHopeHoliday,
} from '../logic/hopeHoliday';

export async function fetchHopeHoliday(res: Response) {
  const results = await getHopeHoliday();
  if (results === null) {
    console.error('Failed search for hopeHoliday');
    const e: ErrPayload = { msg: 'Failed search for hopeHoliday' };
    res.status(404).send(e);
    return;
  }

  res.status(200).send(results);
}

export async function saveHopeHoliday(res: Response, data: HopeHolidayPayload) {
  try {
    const result = await createHopeHoliday(data);
    if (!result) {
      console.error('Failed to save hopeHoliday record');
      res.status(500).send();
      return;
    }
    res.status(201).send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
}

export async function removeHopeHoliday(
  res: Response,
  data: HopeHolidayPayload
) {
  const result = await deleteHopeHoliday(data);
  console.log(result);
  if (result) {
    res.status(200).send(result);
  } else {
    const e: ErrPayload = {
      msg:
        'Could not delete HopeHoliday because it may have already been deleted',
    };
    res.status(409).send(e);
  }
}
