// #### Access the env files
import * as dotenv from 'dotenv';
dotenv.config();

// #### IMPORTS - packages
import 'express-async-errors'; //middleware that helps handle errors that occur within asynchronous functions. It catches unhandled errors inside async/await functions and forwards them to Express.js's error handling middleware, preventing the Node.js process from crashing. //You do not need try catch for basic crud async operation
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';

// ## IMPORTS - routes
import jobRouter from './routes/job.router';
import authRouter from './routes/auth.router';
import userRouter from './routes/user.router';

//## IMPORTS - middleware
import errorHandlerMiddleware from './middleware/errorHandler.middleware';
import notFoundHandlerMiddleware from './middleware/notFoundHandler.middleware';
import authMiddleware from './middleware/auth.middleware';

// #### MIDDLEWARES
const app = express();

app.use(express.json()); //Accept JSON files
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // HTTP request logger middleware for node.js
}
app.use(cookieParser());
//Public folder
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(
  express.static(path.resolve(__dirname, './public')),
);
//Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ## ROUTES
app.use(
  '/api/v1/jobs',
  authMiddleware.authenticateUser,
  jobRouter,
);
app.use('/api/v1/auth', authRouter);
app.use(
  '/api/v1/users',
  authMiddleware.authenticateUser,
  userRouter,
);

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
