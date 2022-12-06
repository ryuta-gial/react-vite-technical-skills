import { Response } from 'express';
import { ErrPayload } from '../models/types/error.type';
import { getRequiredNumberOfPeople } from '../logic/requiredNumberOfPeople';

export async function fetchRequiredNumberOfPeople(res: Response) {
    const results = await getRequiredNumberOfPeople();
    if (results === null) {
        console.error('Failed search for requiredNumberOfPeople ');
        const e: ErrPayload = {
            msg: 'Failed search for requiredNumberOfPeople',
        };
        res.status(404).send(e);
        return;
    }

    res.status(200).send(results);
}
