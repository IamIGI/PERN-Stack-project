import mongoose, { Document } from 'mongoose';

export type JobStatus =
  | 'interview'
  | 'declined'
  | 'pending';
export type JobType =
  | 'full-time'
  | 'part-time'
  | 'internship';

export interface IJob extends Document {
  company: string;
  position: string;
  jobStatus: JobStatus;
  jobType: JobType;
  jobLocation: string;
  createdAt: Date;
  updatedAt: Date;
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
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'internship'],
      default: 'full-time',
    },
    jobLocation: {
      type: String,
      default: 'my city',
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IJob>('jobs', JobSchema);
