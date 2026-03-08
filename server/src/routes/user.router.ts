import { Router } from 'express';
import userController from '../controllers/user.controller';
import validatorMiddleware from '../middleware/validator.middleware';
import authMiddleware from '../middleware/auth.middleware';
import { UserRole } from '../utils/constants';
const router = Router();

router.get('/current-user', userController.getCurrentUser);
router.get(
  '/admin/app-stats',
  authMiddleware.authorizePermissions([UserRole.ADMIN]),
  userController.getApplicationStats,
);
router.patch(
  '/update-user',
  validatorMiddleware.validateUpdateUserInput,
  userController.updateUser,
);
export default router;
