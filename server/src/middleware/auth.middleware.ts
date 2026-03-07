import { RequestHandler } from 'express';
import { UnauthenticatedError } from '../errors/customErrors';
import tokenUtils from '../utils/token.utils';

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
    req.user = { userId, role };

    next();
  } catch (error) {
    throw new UnauthenticatedError(
      'authentication invalid',
    );
  }
};

export default {
  authenticateUser,
};
