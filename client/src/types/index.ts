export interface User {
  _id: string;
  name: string;
  email: string;
  password?: string;
  lastName: string;
  location: string;
  role: typeof UserRole;
}

export interface Job {
  _id: string;
  company: string;
  position: string;
  jobStatus: typeof JobStatus;
  jobType: typeof JobType;
  jobLocation: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string; // by user who?
}

export interface JobResponse {
  msg: string;
  job: Job;
}

export const JobStatus = {
  PENDING: 'pending',
  INTERVIEW: 'interview',
  DECLINED: 'declined',
} as const;

export const JobType = {
  FULL_TIME: 'full-time',
  PART_TIME: 'part-time',
  INTERNSHIP: 'internship',
} as const;

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
