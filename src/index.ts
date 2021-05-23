import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import questionsRoute from './routes/questions.routes';
import authRoute from './routes/auth.routes';
import ranksRoute from './routes/ranks.routes';
import reportRoute from './routes/report.routes';
import cors from 'cors';
import { isAuth } from './middlewares/auth';

dotenv.config();
const app = express();
const port = process.env.PORT || 8888;

mongoose.connect(process.env.DB_MONGOO);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', authRoute);

app.use(isAuth);
app.use('/questions', questionsRoute);
app.use('/ranks', ranksRoute);
app.use('/report', reportRoute);

const server = app.listen(port, () => {
    console.log(`Example app listening atss http://localhost:${port}`);
});
server.timeout = 3000;
