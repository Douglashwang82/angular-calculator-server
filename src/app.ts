import express from 'express';
import mongoose from 'mongoose';
import config from '../utils/config';
import Loggers from '../utils/logger';
import calculatorController from '../controllers/calculatorController';
import middlewares from '../utils/middlewares';
import cors from 'cors';

// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000', 'http://localhost:4200'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
const app = express();
const dbURL = config.NODE_DEV === "test" ? config.TEST_MONGODB_URL : config.MONGODB_URL;

mongoose
  .connect(dbURL)
  .then(() => Loggers.info('Connected to DB'))
  .catch((error) => Loggers.error(`Error: ${error}`));

app.use(cors(options));
app.use(express.json());
app.use('/api/calculator', calculatorController);
app.use(middlewares.unknownEndPoint);
app.use(middlewares.errorHandler);

export default app;
