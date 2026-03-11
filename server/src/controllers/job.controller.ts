import { RequestHandler } from 'express';
import jobModel, { IJob } from '../models/job.model';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';
import { JobStatus, JobType } from '../utils/constants';

interface JobQuery {
  search?: string;
  jobStatus?: JobStatus | 'all';
  jobType?: JobType | 'all';
  sort?: 'newest' | 'oldest' | 'a-z' | 'z-a';
  page?: string;
  limit?: string;
}

const getAllJobs: RequestHandler = async (req, res) => {
  const { search, jobStatus, jobType, sort, page, limit } =
    req.query as unknown as JobQuery;

  const queryObject: mongoose.QueryFilter<IJob> = {
    createdBy: req.user?.userId,
  };

  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: 'i' } },
      { company: { $regex: search, $options: 'i' } },
    ];
  }
  if (jobStatus && jobStatus !== 'all') {
    queryObject.jobStatus = jobStatus as string;
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType as string;
  }

  const sortOptions = {
    newest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  const sortKey =
    sortOptions[sort as keyof typeof sortOptions] ||
    sortOptions.newest;

  //pagination
  const pageNumber = Number(req.query.page) || 1;
  const limitNumber = Number(req.query.limit) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const jobs = await jobModel
    .find(queryObject)
    .sort(sortKey)
    .skip(skip)
    .limit(limitNumber);

  const totalJobs =
    await jobModel.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limitNumber);

  res.status(StatusCodes.OK).json({
    totalJobs,
    numOfPages,
    currentPage: page,
    jobs,
  });
};

const getJob: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const job = await jobModel.findById(id);

  res.status(StatusCodes.OK).json({ job });
};

const createJob: RequestHandler = async (req, res) => {
  req.body.createdBy = req.user?.userId;
  const jobDocument = await jobModel.create(req.body);

  res
    .status(StatusCodes.CREATED)
    .json({ job: jobDocument });
};

const updateJob: RequestHandler = async (req, res) => {
  const { company, position } = req.body;

  const { id } = req.params;

  const updatedJob = await jobModel.findByIdAndUpdate(
    id,
    { company, position },
    {
      new: true,
    },
  );

  res
    .status(StatusCodes.OK)
    .json({ msg: 'job modified', job: updatedJob });
};

const deleteJob: RequestHandler = async (req, res) => {
  const { id } = req.params;

  await jobModel.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: 'job deleted' });
};

export const showStats: RequestHandler = async (
  req,
  res,
) => {
  const stats = (await jobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(
          req.user?.userId,
        ),
      },
    },
    { $group: { _id: '$jobStatus', count: { $sum: 1 } } }, //$sum :! add 1 to sum, $sum:2 add 2 to sum
  ])) as { _id: string; count: number }[];

  console.log('Debug: stats: ', stats);

  const statsArray = stats.reduce<Record<string, number>>(
    (acc, curr) => {
      const { _id: title, count } = curr;
      acc[title] = count;
      return acc;
    },
    {},
  );

  const defaultStats = {
    pending: statsArray.pending || 0,
    interview: statsArray.interview || 0,
    declined: statsArray.declined || 0,
  };

  //calculates the number of job applications a specific user
  // created per month and returns the 6 most recent months.
  let monthlyApplications = (await jobModel.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(
          req.user?.userId,
        ),
      },
    },
    {
      $group: {
        _id: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 6 },
  ])) as {
    _id: {
      year: number;
      month: number;
    };
    count: number;
  }[];

  console.log(
    'Debug: monthlyApplications',
    monthlyApplications,
  );

  const monthlyApplicationsArray = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format('MMM YY');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({
    defaultStats,
    monthlyApplications: monthlyApplicationsArray,
  });
};

export default {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
};
