import { RequestHandler } from 'express';
import userModel, { IUser } from '../models/user.model';
import { StatusCodes } from 'http-status-codes';
import passwordUtils from '../utils/password.utils';
import { UnauthenticatedError } from '../errors/customErrors';
import tokenUtils from '../utils/token.utils';
import { oneDay } from '../utils/constants';

const register: RequestHandler = async (req, res) => {
  const hashedPassword = await passwordUtils.hashPassword(
    req.body.password,
  );
  (req.body as IUser).password = hashedPassword;

  const user = await userModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ user });
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
      user.password!,
    ));
  if (!isValidUser)
    throw new UnauthenticatedError('invalid credentials');

  const token = tokenUtils.createJWT({
    userId: user._id,
    role: user.role,
  });

  res.cookie('token', token, {
    httpOnly: true, //can't be access by JS
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production', //https or http
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: 'User logged in' });
};

const logout: RequestHandler = (req, res) => {
  // res.clearCookie('token'); //Alternative
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res
    .status(StatusCodes.OK)
    .json({ msg: 'user logged out!' });
};

export default {
  register,
  login,
  logout,
};
