require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8888;
const questionsRoute = require('./routes/questions.routes');
const authRoute = require('./routes/auth.routes');
const ranksRoute = require('./routes/ranks.routes');
const reportRoute = require('./routes/report.routes');

const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middlewares/auth');

mongoose.connect(process.env.DB_MONGOO);

//CORS middleware
// const allowCrossDomain = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use('/auth', authRoute);

app.use(authMiddleware.isAuth);
app.use('/questions', questionsRoute);
app.use('/ranks', ranksRoute);
app.use('/report', reportRoute);

const server = app.listen(port, () => {
    console.log(`Example app listening atss http://localhost:${port}`);
});
server.timeout = 3000;
