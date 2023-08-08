require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookies = require('cookie-parser');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const { errors } = require('celebrate');
// eslint-disable-next-line no-unused-vars
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');

const app = express();

const router = require('./routes');

app.use(cors({ origin: 'https://dmitrii-mesto.nomoreparties.co', credentials: true }));

app.use(cookies());
app.use(express.json());

app.use(router);

app.use(errors());
app.use(errorHandler);

app.listen(4000);
