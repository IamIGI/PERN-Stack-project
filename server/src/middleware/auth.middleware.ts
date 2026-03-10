import { RequestHandler } from 'express';
import {
  BadRequestError,
  UnauthenticatedError,
} from '../errors/customErrors';
import tokenUtils from '../utils/token.utils';
import { UserRole } from '../utils/constants';
import { Types } from 'mongoose';

const authenticateUser: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { token } = req.cookies;
  if (!token) {
    throw new UnauthenticatedError(
      'authentication invalid',
    );
  }

  try {
    const { userId, role } = tokenUtils.verifyJWT(token);

    const testUser =
      userId ===
      ('69af32f7a469e784e4b92a1a' as unknown as Types.ObjectId);
    req.user = { userId, role, testUser };

    next();
  } catch (error) {
    throw new UnauthenticatedError(
      'authentication invalid',
    );
  }
};

const authorizePermissions = (
  authorizedRoles: UserRole[],
): RequestHandler => {
  return (req, res, next) => {
    if (
      req.user &&
      !authorizedRoles.includes(req.user.role as UserRole)
    ) {
      throw new UnauthenticatedError(
        'Unauthorized to access this route',
      );
    }

    next();
  };
};

const checkForTestUser: RequestHandler = (
  req,
  res,
  next,
) => {
  if (req.user?.testUser) {
    throw new BadRequestError('Demo User. Read Only!');
  }
  next();
};

export default {
  authenticateUser,
  authorizePermissions,
  checkForTestUser,
};
