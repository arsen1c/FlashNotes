const getJWT = () => {
	const jwt = JSON.parse(localStorage.getItem('jwt'));
	if (jwt) {
		return jwt
	}
}

const getJwtToken = () => {
	const jwt = getJWT();

	if (jwt) {
		return jwt.token;
	}
	return null;
}


export {
	getJWT,
	getJwtToken
}