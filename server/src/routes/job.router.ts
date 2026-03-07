import { Router } from 'express';
import jobController from '../controllers/job.controller';
const router = Router();

router
  .route('/')
  .get(jobController.getAllJobs)
  .post(jobController.createJob);

router
  .route('/:id')
  .get(jobController.getJob)
  .patch(jobController.updateJob)
  .delete(jobController.deleteJob);

export default router;
