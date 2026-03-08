import { Router } from 'express';
import authController from '../controllers/auth.controller';
import validatorMiddleware from '../middleware/validator.middleware';

const router = Router();

router.post(
  '/register',
  validatorMiddleware.validateRegisterInput,
  authController.register,
);
router.post(
  '/login',
  validatorMiddleware.validateLoginInput,
  authController.login,
);
router.get('/logout', authController.logout);

export default router;
