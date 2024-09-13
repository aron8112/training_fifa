require('dotenv').config();
const express = require('express');
const app = express();
const { connect } = require('./config/db');

const router = require('./routes');

app.use(router);

app.listen(process.env.PORT, () => console.log(`listening on ${process.env.PORT}`));

connect();
