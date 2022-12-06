import { Router, Response } from 'express';
import {
    fetchHopeHoliday,
    saveHopeHoliday,
    removeHopeHoliday,
} from '../controllers/hopeHoliday.controller';

import { HopeHolidayPayload } from '../models/types/hopeHoliday.type';
import { ErrPayload } from '../models/types/error.type';
const hopeHolidayRouter = Router();

function isReqBodyValid(res: Response, data: HopeHolidayPayload) {
    if (!data || !data.hopeHoliday) {
        console.error('Missing required data');
        res.status(400).send();
        return false;
    }
    return true;
}

hopeHolidayRouter.get('/', async (req, res) => {
    try {
        await fetchHopeHoliday(res);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
        return;
    }
});

hopeHolidayRouter.post('/', async (req, res) => {
    try {
        const data: HopeHolidayPayload = req.body;
        if (!isReqBodyValid(res, data)) {
            // Error handled by called function
            return;
        }
        saveHopeHoliday(res, data);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
    }
});

hopeHolidayRouter.delete('/',async (req, res) => {
        try {

        const data: HopeHolidayPayload = req.body;
            //const hopeHoliday = params['hopeHoliday'];
            if (!isReqBodyValid(res, data)) {
                const e: ErrPayload = { msg: 'HopeHoliday not recognized' };
                res.status(400).send(e);
                return;
            }
            removeHopeHoliday(res,data);
        } catch (err) {
            console.error('Internal Server Error', err);
            res.status(500).send();
        }
    }
);

export default hopeHolidayRouter;
