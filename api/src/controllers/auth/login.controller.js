import Joi from 'joi';
import { JwtService, CustomErrorHandler } from '../../services';
import bcrypt from 'bcrypt';
import { User } from '../../models';

const loginController = {
	async login(req, res, next) {
		// Validation of form input
		const loginSchema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
		});

		// Check for Validation Errors in Joi
		const { error } = loginSchema.validate(req.body);
		if (error) {
			return nex(err);
		};

		try {
			// Check for User in the DB
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return next(CustomErrorHandler.wrongCredentials());
			};

			// Match Password
			const match = await bcrypt.compare(req.body.password, user.password);
			if(!match) {
				return next(CustomErrorHandler.wrongCredentials());
			};

			// If passowrds match, generate a token
			const accessToken = JwtService.sign({ _id: user.id, username: user.username });

			res.json({ accessToken });
		} catch (err) {
			return next(err);
		}
	}
};

export default loginController;