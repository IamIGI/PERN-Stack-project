import { RequestHandler } from 'express';
import jobModel from '../models/job.model';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  NotFoundError,
} from '../errors/customErrors';

const getAllJobs: RequestHandler = async (req, res) => {
  const jobs = await jobModel.find({});

  res.status(StatusCodes.OK).json({ jobs });
};

const getJob: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const job = await jobModel.findById(id);
  if (!job) throw new NotFoundError(`no job with id ${id}`);

  res.status(StatusCodes.OK).json({ job });
};

const createJob: RequestHandler = async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position)
    throw new BadRequestError(
      'place provide company and position',
    );

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

  if (!company || !position)
    throw new BadRequestError(
      'place provide company and position',
    );

  const { id } = req.params;

  const updatedJob = await jobModel.findByIdAndUpdate(
    id,
    { company, position },
    {
      new: true,
    },
  );

  if (!updateJob)
    throw new NotFoundError(`no job with id ${id}`);

  res.status(StatusCodes.OK).json({ job: updatedJob });
};

const deleteJob: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const removedJob = await jobModel.findByIdAndDelete(id);

  if (!removedJob)
    throw new NotFoundError(`no job with id ${id}`);

  res.status(StatusCodes.OK).json({ msg: 'job deleted' });
};

export default {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
