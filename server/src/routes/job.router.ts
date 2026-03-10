import { Router } from 'express';
import jobController from '../controllers/job.controller';
import validatorMiddleware from '../middleware/validator.middleware';
import authMiddleware from '../middleware/auth.middleware';
const router = Router();

router
  .route('/')
  .get(jobController.getAllJobs)
  .post(
    authMiddleware.checkForTestUser,
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
    authMiddleware.checkForTestUser,
    validatorMiddleware.validateJobIdParam,
    validatorMiddleware.validateJobInput,
    jobController.updateJob,
  )
  .delete(
    authMiddleware.checkForTestUser,
    validatorMiddleware.validateJobIdParam,
    jobController.deleteJob,
  );

export default router;
