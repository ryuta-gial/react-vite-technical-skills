import { Router, Response } from 'express';
import {
    fetchHoliday,
    saveHoliday,
    removeHoliday,
} from '../controllers/holiday.controller';
import { HolidayPayload } from '../models/types/holiday.type';
import { ErrPayload } from '../models/types/error.type';
const holidayRouter = Router();

function isReqBodyValid(res: Response, data: HolidayPayload) {
    if (!data || !data.holiday) {
        // TODO: insufficient required items error
        console.error('Missing required data');
        res.status(400).send();
        return false;
    }
    return true;
}

holidayRouter.get('/', async (req, res) => {
    try {
        await fetchHoliday(res);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
        return;
    }
});

holidayRouter.post('/', async (req, res) => {
    try {
        const data: HolidayPayload = req.body;
        if (!isReqBodyValid(res, data)) {
            // Error handled by called function
            return;
        }
        saveHoliday(res, data);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
    }
});

holidayRouter.delete('/:holiday', async (req, res) => {
    try {
        const params = req.params;
        const holiday = params['holiday'];
        if (!holiday) {
            const e: ErrPayload = { msg: 'Holiday not recognized' };
            res.status(400).send(e);
            return;
        }
        removeHoliday(res, holiday);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
    }
});

export default holidayRouter;
