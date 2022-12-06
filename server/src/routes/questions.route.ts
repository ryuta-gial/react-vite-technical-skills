import { Router } from 'express';
import { fetchQuestions } from '../controllers/questions.controller';
const questionsRouter = Router();

questionsRouter.get('/', async (req, res) => {
    try {
        await fetchQuestions(res);
    } catch (err) {
        console.error('Internal Server Error', err);
        res.status(500).send();
        return;
    }
});

export default questionsRouter;
