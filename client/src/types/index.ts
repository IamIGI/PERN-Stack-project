export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  lastName: string;
  location: string;
  role: UserRoleType;
}

export interface Job {
  _id: string;
  company: string;
  position: string;
  jobStatus: JobStatusType;
  jobType: JobTypeType;
  jobLocation: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // by user who?
}

export interface JobResponse {
  msg: string;
  job: Job;
}

export interface AppStatsResponse {
  users: number;
  jobs: number;
}

export const JobStatus = {
  PENDING: 'pending',
  INTERVIEW: 'interview',
  DECLINED: 'declined',
} as const;

export type JobStatusType =
  (typeof JobStatus)[keyof typeof JobStatus];

export const JobType = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  INTERNSHIP: 'internship',
} as const;

export type JobTypeType =
  (typeof JobType)[keyof typeof JobType];

export const JobSortBy = {
  NEWEST_FIRST: 'newest',
  OLDEST_FIRST: 'oldest',
  ASCENDING: 'a-z',
  DESCENDING: 'z-a',
} as const;

export const UserRole = {
  USER: 'user',
  ADMIN: 'admin',
} as const;

export type UserRoleType =
  (typeof UserRole)[keyof typeof UserRole];
