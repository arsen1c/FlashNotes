import express from 'express';
const router = express.Router();

// import controllers
import { registerController, loginController, userController } from '../controllers';
import auth from '../middlewares/auth';

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/me', auth, userController.me);

export default router;
