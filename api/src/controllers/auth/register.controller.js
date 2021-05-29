import Joi from 'joi';
import { User } from '../../models';
import bcrypt from 'bcrypt';
import CustomErrorHandler from '../../services/CustomErrorHandler';
import {JwtService} from '../../services';
// import { REFRESH_SECRET } from '../../config';

const registerController = {
	// POST to Register
	async register(req, res, next) {
		// Validate Input
		const registerSchema = Joi.object({
			username: Joi.string().min(3).max(30).required(),
			email: Joi.string().email().required(),
			password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
			repeat_password: Joi.ref('password')
		});

		const { error } = registerSchema.validate(req.body);

		if (error) {
			return next(error);
		};

		// Check if email exists
		try {
			const exists = await User.exists({ email: req.body.email });
			if (exists) {
				return next(CustomErrorHandler.alreadyExists('That email is already registered!'));
			};
		} catch (err) {
			return next(err)
		}
		const { username, email, password } = req.body;

		const hashedPassword = await bcrypt.hash(password, 10);

		// Prepare the model 
		const user = new User({
			username, 
			email,
			password: hashedPassword
		});

		let accessToken;

		try {
			const result = await user.save();
			console.log('Success:', result);
			// accessToken = JwtService.sign({ _id: result.id, username: result.username });
		} catch (err) {
			return next(err);
		}
		res.json({message: 'User Saved!'});
		// res.json({ 'access_token': accessToken });
	}
}

export default registerController;
