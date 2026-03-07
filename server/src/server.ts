// #### Access the env files
import * as dotenv from 'dotenv';
dotenv.config();

// #### IMPORTS - packages
import express from 'express';
import morgan from 'morgan';
import { ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';

// ## IMPORTS - routes
import jobRouter from './routes/job.router';

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

// #### Not Found Middleware
app.use('*', (req, res) => {
  res.status(404).json({ msg: '404-not found' });
});
// #### Error Middleware
const errorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  console.log(err);
  res
    .status(500)
    .json({ msg: 'something went wrong', err });
};
app.use(errorHandler);

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
