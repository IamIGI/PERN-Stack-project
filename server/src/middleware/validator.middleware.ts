import {
  body,
  validationResult,
  ValidationChain,
  param,
} from 'express-validator';
import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
} from 'express';
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from '../errors/customErrors';
import generalUtil from '../utils/general.utils';
import {
  JobStatus,
  JobType,
  UserRole,
} from '../utils/constants';
import mongoose from 'mongoose';
import jobModel from '../models/job.model';
import userModel from '../models/user.model';

const keyErrorMessageWords = {
  noJob: 'no job',
  notAuthorized: 'not authorized',
};

//#### INTER
const withValidationErrors = (
  validateValues: ValidationChain[],
): RequestHandler[] => {
  return [
    ...validateValues,
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors
          .array()
          .map((error) => error.msg);

        if (
          errorMessages[0].startsWith(
            keyErrorMessageWords.noJob,
          )
        ) {
          throw new NotFoundError(errorMessages);
        }

        if (
          errorMessages[0].startsWith(
            keyErrorMessageWords.notAuthorized,
          )
        ) {
          throw new UnauthorizedError(
            'not authorized to access this route',
          );
        }

        throw new BadRequestError(errorMessages);
      }
      //Run request
      next();
    },
  ];
};

const requiredInput = (name: string) => {
  const displayName = generalUtil.camelToWords(name);
  return body(name)
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage(`${displayName} is required`);
};

const requiredUniqueEmail = () =>
  requiredInput('email')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email) => {
      const user = await userModel.findOne({ email });
      if (user) {
        throw new Error('email already exists');
      }
    });

const requiredPassword = () =>
  requiredInput('password')
    .isLength({ min: 5 })
    .withMessage(
      'password must be at least 8 characters long',
    );

//#### EXPORT
const validateJobInput = withValidationErrors([
  requiredInput('company'),
  requiredInput('position'),
  requiredInput('jobLocation'),
  body('jobStatus')
    .isIn(Object.values(JobStatus))
    .withMessage('invalid job status'),
  body('jobType')
    .isIn(Object.values(JobType))
    .withMessage('invalid job type'),
]);

const validateJobIdParam = withValidationErrors([
  param('id').custom(async (value: string, { req }) => {
    console.log('Debug: ', value);
    const isValidID =
      mongoose.Types.ObjectId.isValid(value);
    if (!isValidID)
      throw new BadRequestError('invalid MongoDB id');

    //Downside of this: id is checked there and in controller
    const job = await jobModel.findById(value);
    if (!job)
      throw new NotFoundError(
        `${keyErrorMessageWords.noJob} with id: ${value}`,
      );

    const isAdmin = req.user.role === UserRole.ADMIN;
    const isOwner =
      req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner)
      throw new UnauthorizedError(
        `${keyErrorMessageWords.notAuthorized} to access this route`,
      );
  }),
]);

const validateRegisterInput = withValidationErrors([
  requiredInput('name'),
  requiredUniqueEmail(),
  requiredPassword(),
  requiredInput('location'),
  requiredInput('lastName'),
]);

const validateLoginInput = withValidationErrors([
  requiredInput('email')
    .isEmail()
    .withMessage('invalid email format'),
  requiredPassword(),
]);

const validateUpdateUserInput = withValidationErrors([
  requiredInput('name'),
  requiredInput('lastName'),
  requiredInput('location'),
  body('email')
    .not()
    .exists()
    .withMessage('Cannot change email'),
  body('role')
    .not()
    .exists()
    .withMessage('Cannot change role'),
]);

export default {
  validateJobInput,
  validateJobIdParam,
  validateRegisterInput,
  validateLoginInput,
  validateUpdateUserInput,
};
