import { Router, Response } from 'express';
import {
    fetchStaff,
    saveUser,
    removeStaff,
    editStaff,
    fetchEmploymentStatus,
    fetchShiftType,
} from '../controllers/staff.controller';
import { StaffPayload } from '../models/types/staff.type';
import { ErrPayload } from '../models/types/error.type';
const staffRouter = Router();

function isReqBodyValid(res: Response, data: StaffPayload) {
    if (!data || !data.name || !data.employmentStatus || !data.shiftType) {
        // TODO: insufficient required items error
        console.error('Missing required staff data');
        res.status(400).send();
        return false;
    }
    return true;
}

staffRouter.get('/', async (req, res) => {
    try {
        await fetchStaff(res);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
        return;
    }
});

staffRouter.get('/employmentstatus', async (req, res) => {
    try {
        await fetchEmploymentStatus(res);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
        return;
    }
});

staffRouter.get('/shifttype', async (req, res) => {
    try {
        await fetchShiftType(res);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
        return;
    }
});

staffRouter.post('/', async (req, res) => {
    try {
        const data: StaffPayload = req.body;
        if (!isReqBodyValid(res, data)) {
            // Error handled by called function
            return;
        }
        saveUser(res, data);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
    }
});

staffRouter.delete('/:staff_id', async (req, res) => {
    try {
        const params = req.params;
        const staffId = params['staff_id'];
        if (!staffId) {
            const e: ErrPayload = { msg: 'Staff ID not recognized' };
            res.status(400).send(e);
            return;
        }
        const staffIdNum = Number.parseInt(staffId);
        removeStaff(res, staffIdNum);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
    }
});

staffRouter.put('/:staff_id', async (req, res) => {
    try {
        const params = req.params;
        const staffId = params['staff_id'];
        if (!staffId) {
            const e: ErrPayload = { msg: 'Staff ID not recognized' };
            res.status(400).send(e);
            return;
        }
        const data: StaffPayload = req.body;
        const usrId = Number.parseInt(staffId);
        if (!isReqBodyValid(res, data)) {
            // Error handled by called function
            return;
        }
        editStaff(res, usrId, data);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
    }
});

export default staffRouter;
