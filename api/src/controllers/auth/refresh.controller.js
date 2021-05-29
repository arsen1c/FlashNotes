import Joi from 'joi';
import { REFRESH_SECRET } from '../../config';
import { RefreshToken, User } from '../../models';
import { JwtService, CustomErrorHandler } from '../../services';

const refreshController = {
	async refresh(req, res, next) {
		// Validation
		const token = req.query.token; // Add option for header

		// Database
		let refreshToken;
		try {
			refreshToken = await RefreshToken.findOne({ token });
			// If no refreshToken found in the DB 
			if (!refreshToken) {
				return next(CustomErrorHandler.unAuthorized('Invalid refresh token'));
			};

			let userId;

			try {
				const { _id } = await JwtService.verify(refreshToken.token, REFRESH_SECRET);
				userId = _id;	
			} catch (err) {
				return next(CustomErrorHandler.unAuthorized('Invalid Refresh Token'));
			};

			const user = await User.findOne({ _id: userId });

			if (!user) {
				return next(CustomErrorHandler.unAuthorized('No user found!'));
			};

			// If user found, generate a new token
			const access_token = JwtService.sign({ _id: user._id, username: user.username });
			const refresh_token = JwtService.sign({ _id: user._id, username: user.username }, '1y', REFRESH_SECRET);

			// Data whitelist
			await RefreshToken.create({ token: refresh_token });

			res.json({ access_token, refresh_token});
		} catch (err) {
			return next(err);
		};
	}
};


export default refreshController;