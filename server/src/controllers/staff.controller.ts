import { Response, Request } from 'express';
import { ErrPayload } from '../models/types/error.type';
import { StaffPayload } from '../models/types/staff.type';
import {
    getStaff,
    createStaff,
    deleteStaff,
    updateStaff,
    getEmploymentStatus,
    getShiftType,
} from '../logic/staff';

export async function fetchStaff(res: Response) {
    const results = await getStaff();
    if (results === null) {
        console.error('Failed search for staff');
        const e: ErrPayload = { msg: 'Failed search for staff' };
        res.status(404).send(e);
        return;
    }

    res.status(200).send(results);
}

export async function fetchEmploymentStatus(res: Response) {
    const results = await getEmploymentStatus();
    if (results === null) {
        console.error('Failed search for EmploymentStatus');
        const e: ErrPayload = { msg: 'Failed search for EmploymentStatus' };
        res.status(404).send(e);
        return;
    }

    res.status(200).send(results);
}

export async function fetchShiftType(res: Response) {
    const results = await getShiftType();
    if (results === null) {
        console.error('Failed search for PossibleShift');
        const e: ErrPayload = { msg: 'Failed search for PossibleShift' };
        res.status(404).send(e);
        return;
    }

    res.status(200).send(results);
}

export async function saveUser(res: Response, data: StaffPayload) {
    try {
        const result = await createStaff(data);
        if (!result) {
            console.error('Failed to save user record');
            res.status(500).send();
            return;
        }
        res.status(201).send({
            id: result.id,
            name: result.name,
            employmentStatus: result.employment_status,
            shiftType: result.shift_type,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

export async function removeStaff(
    res: Response,
    staffId: number
) {
    const result = await deleteStaff(staffId);
    if (result) {
        res.status(200).send(result);
        // const io = req.app.get('socketio');
        // io.emit('DELETE_CASE', { caseId: caseId });
    } else {
        const e: ErrPayload = {
            msg:
                'Could not delete Case Image because it may have already been deleted',
        };
        res.status(409).send(e);
    }
}
export async function editStaff(
    res: Response,
    usrId: number,
    data: StaffPayload
) {
    try {
        const result = await updateStaff(data, usrId);
        if (!result) {
            console.error('Failed to update user record');
            res.status(500).send();
            return;
        } //204がputとしてある
        res.status(200).send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}
