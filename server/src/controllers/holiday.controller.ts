import { Response } from 'express';
import { ErrPayload } from '../models/types/error.type';
import { HolidayPayload } from '../models/types/holiday.type';
import { getHoliday, createHoliday, deleteHoliday } from '../logic/holiday';

export async function fetchHoliday(res: Response) {
    const results = await getHoliday();
    if (results === null) {
        console.error('Failed search for holiday');
        const e: ErrPayload = { msg: 'Failed search for holiday' };
        res.status(404).send(e);
        return;
    }

    res.status(200).send(results);
}

export async function saveHoliday(res: Response, data: HolidayPayload) {
    try {
        const result = await createHoliday(data);
        if (!result) {
            console.error('Failed to save user record');
            res.status(500).send();
            return;
        }
        res.status(201).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export async function removeHoliday(res: Response, data: string) {
    const result = await deleteHoliday(data);
    if (result) {
        res.status(204).send();
    } else {
        const e: ErrPayload = {
            msg:
                'Could not delete holiday because it may have already been deleted',
        };
        res.status(409).send(e);
    }
}
