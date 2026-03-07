// #### Access the env files
import * as dotenv from 'dotenv';
dotenv.config();

// #### IMPORTS - packages
import 'express-async-errors'; //middleware that helps handle errors that occur within asynchronous functions. It catches unhandled errors inside async/await functions and forwards them to Express.js's error handling middleware, preventing the Node.js process from crashing.
//You do not need try catch for basic crud async operation
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';

// ## IMPORTS - routes
import jobRouter from './routes/job.router';
import errorHandlerMiddleware from './middleware/errorHandler.middleware';
import notFoundHandlerMiddleware from './middleware/notFoundHandler.middleware';

// #### MIDDLEWARES
const app = express();
//Accept JSON files
app.use(express.json());
// HTTP request logger middleware for node.js
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ## ROUTES
app.use('/api/v1/jobs', jobRouter);

/// #### CRITICAL MIDDLEWARES
app.use('*', notFoundHandlerMiddleware);
app.use(errorHandlerMiddleware);

try {
  const PORT = process.env.PORT || 5101;
  const MONGODB_URL = process.env.MONGODB_URL!;
  await mongoose.connect(MONGODB_URL);
  app.listen(PORT, () => {
    console.log(`server running on PORT ${PORT}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
