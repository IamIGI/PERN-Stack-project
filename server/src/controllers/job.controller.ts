import { RequestHandler } from 'express';
import jobModel from '../models/job.model';
import { StatusCodes } from 'http-status-codes';

const getAllJobs: RequestHandler = async (req, res) => {
  const jobs = await jobModel.find({});

  res.status(StatusCodes.OK).json({ jobs });
};

const getJob: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const job = await jobModel.findById(id);
  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no job with id ${id}` });
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob: RequestHandler = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      msg: 'place provide company and position',
    });
  }

  const jobDocument = await jobModel.create({
    company,
    position,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ job: jobDocument });
};

const updateJob: RequestHandler = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: 'please provide company and position' });
  }
  const { id } = req.params;

  const updatedJob = await jobModel.findByIdAndUpdate(
    id,
    { company, position },
    {
      new: true,
    },
  );

  if (!updatedJob) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no job with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

const deleteJob: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const removedJob = await jobModel.findByIdAndDelete(id);

  if (!removedJob) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `no job with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ msg: 'job deleted' });
};

export default {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
