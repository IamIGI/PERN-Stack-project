import mongoose, { Document } from 'mongoose';
import { JobStatus, JobType } from '../utils/constants';

export interface IJob extends Document {
  company: string;
  position: string;
  jobStatus: JobStatus;
  jobType: JobType;
  jobLocation: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: mongoose.Types.ObjectId;
}

const JobSchema = new mongoose.Schema<IJob>(
  {
    company: {
      type: String,
      required: [true, 'Company is required'],
      trim: true,
    },
    position: {
      type: String,
      required: [true, 'Position is required'],
      trim: true,
    },
    jobStatus: {
      type: String,
      enum: Object.values(JobStatus),
      default: JobStatus.PENDING,
    },
    jobType: {
      type: String,
      enum: Object.values(JobType),
      default: JobType.FULL_TIME,
    },
    jobLocation: {
      type: String,
      default: 'my city',
      trim: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IJob>('jobs', JobSchema);
