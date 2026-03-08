import { Router } from 'express';
import jobController from '../controllers/job.controller';
import validatorMiddleware from '../middleware/validator.middleware';
const router = Router();

router
  .route('/')
  .get(jobController.getAllJobs)
  .post(
    validatorMiddleware.validateJobInput,
    jobController.createJob,
  );

router
  .route('/:id')
  .get(
    validatorMiddleware.validateJobIdParam,
    jobController.getJob,
  )
  .patch(
    validatorMiddleware.validateJobIdParam,
    validatorMiddleware.validateJobInput,
    jobController.updateJob,
  )
  .delete(
    validatorMiddleware.validateJobIdParam,
    jobController.deleteJob,
  );

export default router;
