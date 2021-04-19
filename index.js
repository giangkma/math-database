require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const questionsRoute = require('./routes/questions');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect(process.env.DB_MONGOO);

//CORS middleware
// const allowCrossDomain = function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// };
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/questions', questionsRoute);

const server = app.listen(port, () => {
    console.log(`Example app listening atss http://localhost:${port}`);
});
server.timeout = 3000;
