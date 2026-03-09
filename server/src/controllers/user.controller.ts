import { StatusCodes } from 'http-status-codes';
import { RequestHandler } from 'express';
import userModel, { IUser } from '../models/user.model';
import jobModel from '../models/job.model';
import { v2 as cloudinary } from 'cloudinary';
import { promises as fs } from 'fs';

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
  const newUser = { ...req.body } as IUser;
  if (req.file) {
    const response = await cloudinary.uploader.upload(
      req.file.path,
    );
    await fs.unlink(req.file.path);

    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }

  const oldUserData = await userModel.findOneAndUpdate(
    { _id: req.user?.userId },
    newUser,
  );

  if (req.file && oldUserData?.avatarPublicId) {
    await cloudinary.uploader.destroy(
      oldUserData.avatarPublicId,
    );
  }
  res.status(StatusCodes.OK).json({ oldUserData });
};

export default {
  getCurrentUser,
  getApplicationStats,
  updateUser,
};
