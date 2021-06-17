import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';
import questionsRoute from './routes/questions.routes';
import authRoute from './routes/auth.routes';
import ranksRoute from './routes/ranks.routes';
import reportRoute from './routes/report.routes';
import imageRoute from './routes/image.routes';
import cors from 'cors';
import { isAuth } from './middlewares/auth';
import swaggerDocuments from './swagger';

dotenv.config();
const app = express();
const port = process.env.PORT || 8888;

const version = 'v1';
mongoose.connect(process.env.DB_MONGOO);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(`/api/${version}/auth`, authRoute);

app.use(
    `/api/${version}/docs`,
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocuments),
);

app.use(`/api/${version}/image`, imageRoute);

app.use(isAuth);
app.use(`/api/${version}/questions`, questionsRoute);
app.use(`/api/${version}/ranks`, ranksRoute);
app.use(`/api/${version}/report`, reportRoute);

const server = app.listen(port, () => {
    console.log(`Example app listening atss http://localhost:${port}`);
});
server.timeout = 3000;
