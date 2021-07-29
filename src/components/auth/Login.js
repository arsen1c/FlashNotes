import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { SpinnerSmall } from '../Animations';
import axios from 'axios';

const Login = (porps) => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorText, setErrorText] = useState('');
	const [buttonText,  setbuttonText] = useState('Login');
	const history = useHistory();

	// const localHost = 'http://localhost:4000/api/login';
	const serverLogin = 'https://react-notes-api.vector2912.repl.co/api/login';

	const handleSubmit = (e) => {
		e.preventDefault();
		setbuttonText(<SpinnerSmall />);
		// Request to server
		axios.post(serverLogin, { JSON.stringify({ email, password }) },
		{
			withCredentials: true,
		}).then(res => {
			const data = res.data;
			// console.log(res);
			if (res.status === 401){ 
				// console.log(res)
				setErrorText('invalid credentials');
				throw new Error('invalid credentials')
			}

			setbuttonText('Login')
			const days = 7; //invalidate the token in 7 days
			const jwt = {};

			// Set token and expiry data for jwt
			jwt['token'] = data.accessToken;
			jwt['expiry'] = new Date(Date.now() + days*24*60*60*1000).getTime();

			window.localStorage.setItem("jwt", JSON.stringify(jwt));
			history.push('/me');
			// return res.json();
		}).catch(err => {
			setbuttonText('Login');
		})
	};

	return (
		<div className="login-form">
			<h1>Login</h1>
			<form onSubmit={(e) => handleSubmit(e)}>
				<label>Email</label>
				<input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
				<label>Password</label>
				<input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
				{ errorText && <div className="error">✕ {errorText}</div> }
				<button className="submit">{buttonText}</button>
				<div className="login-register">Need an account? <Link to="/register">Register</Link></div>
			</form>
		</div>
	);
};

export default Login;