import { RequestHandler } from 'express';
import jobModel from '../models/job.model';
import { StatusCodes } from 'http-status-codes';

const getAllJobs: RequestHandler = async (req, res) => {
  const jobs = await jobModel.find({
    createdBy: req.user?.userId,
  });

  res.status(StatusCodes.OK).json({ jobs });
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

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

const deleteJob: RequestHandler = async (req, res) => {
  const { id } = req.params;

  await jobModel.findByIdAndDelete(id);

  res.status(StatusCodes.OK).json({ msg: 'job deleted' });
};

export default {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
