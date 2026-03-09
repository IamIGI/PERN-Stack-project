import { Router } from 'express';
import userController from '../controllers/user.controller';
import validatorMiddleware from '../middleware/validator.middleware';
import authMiddleware from '../middleware/auth.middleware';
import { UserRole } from '../utils/constants';
import upload from '../middleware/multer.middleware';
const router = Router();

router.get('/current-user', userController.getCurrentUser);
router.get(
  '/admin/app-stats',
  authMiddleware.authorizePermissions([UserRole.ADMIN]),
  userController.getApplicationStats,
);
router.patch(
  '/update-user',
  upload.single('avatar'), //parse multipart form
  validatorMiddleware.validateUpdateUserInput,
  userController.updateUser,
);
export default router;
