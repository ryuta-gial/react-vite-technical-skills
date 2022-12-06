import { Router, Response } from 'express';
import { fetchRequiredNumberOfPeople } from '../controllers/requiredNumberOfPeople.controller';
import { RequiredNumberOfPeoplePayload } from '../models/types/requiredNumberOfPeople.type';
const requiredNumberOfPeopleRouter = Router();

requiredNumberOfPeopleRouter.get('/', async (req, res) => {
    try {
        await fetchRequiredNumberOfPeople(res);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
        return;
    }
});

export default requiredNumberOfPeopleRouter;
