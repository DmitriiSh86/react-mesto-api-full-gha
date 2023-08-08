const express = require('express');
const mongoose = require('mongoose');
const cookies = require('cookie-parser');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const { errors } = require('celebrate');
const errorHandler = require('./middlewares/error-handler');

const app = express();
const router = require('./routes');

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(cookies());
app.use(express.json());

app.use(router);

app.use(errors());
app.use(errorHandler);

app.listen(4000);