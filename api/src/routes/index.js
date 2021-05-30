import express from 'express';
const router = express.Router();

// import controllers
import { 
	registerController, 
	loginController, 
	userController, 
	refreshController,
	notesController
} from '../controllers';
import auth from '../middlewares/auth';

router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/notes', auth, notesController.add);
router.get('/me', auth, userController.me);
router.get('/refresh', refreshController.refresh);
router.get('/notes', auth, notesController.listAllNotes);
router.delete('/notes/:id', auth, notesController.delete);

export default router;
