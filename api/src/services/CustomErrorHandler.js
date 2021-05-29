class CustomErrorHandler extends Error{
	constructor(status, msg) {
		super();
		this.status = status;
		this.message = msg;
	};

	static alreadyExists(message) {
		return new CustomErrorHandler(409, message);
	};

	static wrongCredentials(message = 'Incorrect credentials') {
		return new CustomErrorHandler(401);
	};

	static unAuthorized(message = 'Unauthorized') {
		return new CustomErrorHandler(401, message);
	};

	static notFound(message = '404 Not Found!') {
		return new CustomErrorHandler(404, message);
	};
}


export default CustomErrorHandler;