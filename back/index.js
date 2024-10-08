require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const { connect } = require('./config/db');

const router = require('./routes');
const errorHandler = require('./utils/errorHandler');

app.use(helmet());
app.use(helmet.ieNoOpen());
const sixtyDaysInSeconds = 5184000;
app.use(
  helmet.hsts({
    maxAge: sixtyDaysInSeconds,
  })
);
app.use(
  helmet({
    referrerPolicy: {
      policy: ['origin', 'unsafe-url'],
    },
  })
);
app.use(helmet.noSniff());
app.use(helmet.xPoweredBy());
app.use(helmet.xFrameOptions({ action: 'deny' }));
app.use(
  express.urlencoded({
    extended: false,
    limit: '10kb',
    parameterLimit: 10,
  })
);
app.use(xss());
app.use(
  cors({
    origin: process.env.FRONTEND_PORT,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use(express.json());
app.use('/', router);
// app.use(errorHandler);

app.listen(process.env.NODE_DOCKER_PORT, () =>
  console.log(`listening on ${process.env.NODE_DOCKER_PORT}`)
);
try {
  connect();
} catch (error) {
  express.response.status(500).json({
    status: error.status,
    error: error,
  });
  return;
}
