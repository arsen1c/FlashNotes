import { CustomErrorHandler, JwtService } from '../services';

const auth = async (req, res, next) => {
	// Get authorization header
	let authHeader = req.headers.authorization;

	if (!authHeader) {
		return next(CustomErrorHandler.unAuthorized());
	};

	const token = authHeader.split(' ')[1];

	try {
		// Verify JWT
		const { _id, username } = await JwtService.verify(token);
		const user = {
			_id,
			username
		};

		// add user object to req object
		req.user = user;
		next();
	} catch (err) {
		console.log(err.message);
		return next(CustomErrorHandler.unAuthorized('Invalid Token'));
	};
};


export default auth;