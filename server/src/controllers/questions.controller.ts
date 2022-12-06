import { Response } from 'express';
import { ErrPayload } from '../models/types/error.type';
import { getQuestions } from '../logic/questions';

export async function fetchQuestions(res: Response) {
    const results = await getQuestions();
    if (results === null) {
        console.error('Failed search for questions');
        const e: ErrPayload = { msg: 'Failed search for questions' };
        res.status(404).send(e);
        return;
    }

    res.status(200).send(results);
}
