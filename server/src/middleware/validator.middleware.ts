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
} from '../errors/customErrors';
import generalUtil from '../utils/general.util';
import { JobStatus, JobType } from '../utils/constants';
import mongoose from 'mongoose';
import jobModel from '../models/job.model';

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

        if (errorMessages[0].startsWith('no job')) {
          throw new NotFoundError(errorMessages);
        }

        throw new BadRequestError(errorMessages);
      }
      //Run request
      next();
    },
  ];
};

const isRequiredValidator = (name: string) => {
  const displayName = generalUtil.camelToWords(name);
  return body(name)
    .notEmpty()
    .isLength({ min: 2 })
    .withMessage(`${displayName} is required`);
};

//#### EXPORT
const validateJobInput = withValidationErrors([
  isRequiredValidator('company'),
  isRequiredValidator('position'),
  isRequiredValidator('jobLocation'),
  body('jobStatus')
    .isIn(Object.values(JobStatus))
    .withMessage('invalid job status'),
  body('jobType')
    .isIn(Object.values(JobType))
    .withMessage('invalid job type'),
]);

const validateIdParam = withValidationErrors([
  param('id').custom(async (value: any) => {
    const isValidID =
      mongoose.Types.ObjectId.isValid(value);
    if (!isValidID)
      throw new BadRequestError('invalid MongoDB id');
    //Downside of this: id is checked there and in controller
    const job = await jobModel.findById(value);
    if (!job)
      throw new NotFoundError(`no job with id: ${value}`);
  }),
]);

export default {
  validateJobInput,
  validateIdParam,
};
