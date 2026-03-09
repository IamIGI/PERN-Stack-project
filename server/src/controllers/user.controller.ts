import { StatusCodes } from 'http-status-codes';
import { RequestHandler } from 'express';
import userModel from '../models/user.model';
import jobModel from '../models/job.model';

const getCurrentUser: RequestHandler = async (req, res) => {
  console.log({ userToken: req.user });
  const user = await userModel.findOne({
    _id: req.user?.userId,
  });

  res.status(StatusCodes.OK).json({ user });
};

const getApplicationStats: RequestHandler = async (
  req,
  res,
) => {
  const users = await userModel.countDocuments();
  const jobs = await jobModel.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

const updateUser: RequestHandler = async (req, res) => {
  console.log('Debug: ', req.file);
  const updatedUser = await userModel.findOneAndUpdate(
    { _id: req.user?.userId },
    req.body,
    { new: true },
  );
  res.status(StatusCodes.OK).json({ updatedUser });
};

export default {
  getCurrentUser,
  getApplicationStats,
  updateUser,
};
