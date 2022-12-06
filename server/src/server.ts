//expressの関数から持ってくる
import express from 'express';
import cors from 'cors';
import { createServer } from "http";
import staff from './routes/staff.route';
import holiday from './routes/holiday.route';
import hopeHoliday from './routes/hopeHoliday.route';
import requiredNumberOfPeople from './routes/requiredNumberOfPeople.route';
import questions from './routes/questions.route';

const app: express.Express = express();
//クライアントからの受け取り処理
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//CROS対応（というか完全無防備：本番環境ではだめ絶対）
// app.use(
//     (
//         req: express.Request,
//         res: express.Response,
//         next: express.NextFunction
//     ) => {
//         res.header('Access-Control-Allow-Origin', '*');
//         res.header('Access-Control-Allow-Methods', '*');
//         res.header('Access-Control-Allow-Headers', '*');
//         next();
//     }
// );
// Routes to use
app.use('/v1/staff', staff);
app.use('/v1/holiday', holiday);
app.use('/v1/hopeHoliday', hopeHoliday);
app.use('/v1/requiredNumberOfPeople', requiredNumberOfPeople);
app.use('/v1/questions', questions);

export const httpServer = createServer(app);
export default app;
