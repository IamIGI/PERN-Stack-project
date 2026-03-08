import { RequestHandler } from 'express';
import { UnauthenticatedError } from '../errors/customErrors';
import tokenUtils from '../utils/token.utils';
import { UserRole } from '../utils/constants';

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
    console.log('Triggered: authenticateUser', {
      user: { ...req.user },
    });
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
    console.log({
      user: req.user,
      authorizedRoles,
      result: authorizedRoles.includes(
        req.user!.role as UserRole,
      ),
    });
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

export default {
  authenticateUser,
  authorizePermissions,
};
