import { RequestHandler } from 'express';
import userModel, { IUser } from '../models/user.model';
import { StatusCodes } from 'http-status-codes';
import passwordUtils from '../utils/password.utils';
import { UnauthenticatedError } from '../errors/customErrors';

const register: RequestHandler = async (req, res) => {
  const hashedPassword = await passwordUtils.hashPassword(
    req.body.password,
  );
  (req.body as IUser).password = hashedPassword;

  const user = await userModel.create(req.body);

  res.status(StatusCodes.CREATED).json({
    name: user.name,
    email: user.email,
    lastName: user.lastName,
    location: user.location,
    role: user.role,
  });
};
const login: RequestHandler = async (req, res) => {
  // check if user exists
  // check if password is correct

  const user = await userModel.findOne({
    email: req.body.email,
  });

  const isValidUser =
    user &&
    (await passwordUtils.comparePassword(
      req.body.password,
      user.password,
    ));
  if (!isValidUser)
    throw new UnauthenticatedError('invalid credentials');

  res.send('login route');
};

export default {
  register,
  login,
};
