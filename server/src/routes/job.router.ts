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
    validatorMiddleware.validateIdParam,
    jobController.getJob,
  )
  .patch(
    validatorMiddleware.validateIdParam,
    validatorMiddleware.validateJobInput,
    jobController.updateJob,
  )
  .delete(
    validatorMiddleware.validateIdParam,
    jobController.deleteJob,
  );

export default router;
