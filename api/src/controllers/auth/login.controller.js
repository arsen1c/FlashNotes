import Joi from 'joi';
import { JwtService, CustomErrorHandler } from '../../services';
import bcrypt from 'bcrypt';
import { User, RefreshToken } from '../../models';
import { REFRESH_SECRET } from '../../config';

const loginController = {
	async login(req, res, next) {
		const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds
		// Validation of form input
		const loginSchema = Joi.object({
			email: Joi.string().email().required(),
			password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
		});

		// Check for Validation Errors in Joi
		const { error } = loginSchema.validate(req.body);
		if (error) {
			return next(error);
		};

		try {
			// Check for User in the DB
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return next(CustomErrorHandler.wrongCredentials('Incorred Email'));
			};

			// Match Password
			const match = await bcrypt.compare(req.body.password, user.password);
			if(!match) {
				return next(CustomErrorHandler.wrongCredentials('Incorrect Password'));
			};

			// If passowrds match, generate a token
			const accessToken = JwtService.sign({ _id: user.id, username: user.username });
			const refreshToken = JwtService.sign({ _id: user.id, username: user.username }, '1y', REFRESH_SECRET);

			// Database whitelist
			await RefreshToken.create({ token: refreshToken });
			res.cookie('jwt', accessToken, { httpOnly: false, maxAge: maxAge * 1000});
			res.status(201).json({ accessToken, refreshToken });
		} catch (err) {
			return next(err);
		}
	}
};

export default loginController;