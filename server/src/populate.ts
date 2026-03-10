// #### Access the env files
import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import userModel from './models/user.model';
import { readFile } from 'fs/promises';
import jobModel, { IJob } from './models/job.model';

try {
  const MONGODB_URL = process.env.MONGODB_URL!;
  await mongoose.connect(MONGODB_URL);

  const user = await userModel.findOne({
    email: 'test@test.com   ',
  });

  const jsonJobs: IJob[] = JSON.parse(
    await readFile(
      new URL('./utils/mockData.json', import.meta.url),
      'utf-8',
    ),
  );

  const jobs = jsonJobs.map((job) => {
    return { ...job, createBy: user?._id };
  });

  await jobModel.deleteMany({ createdBy: user?._id });
  await jobModel.create(jobs);
  console.log('Success');
  process.exit(0);
} catch (error) {
  console.log(error);
  process.exit(1);
}
