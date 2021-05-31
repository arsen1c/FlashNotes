import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";

const Login = (porps) => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorText, setErrorText] = useState('');
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Request to server
		fetch("https://react-notes-api.vector2912.repl.co/api/login", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			credentials: 'include',
			body: JSON.stringify({ email, password })
		}).then(res => {
			// console.log(res.ok);
			if (res.status === 401){ 
				// console.log(res)
				setErrorText('invalid credentials');
				throw new Error('invalid credentials')
			}
			return res.json().then(data => {
				return data;
			});
			// return res.json();
		}).then(data => {
			// console.log(data);
			// const jwt = data.accessToken.split(';').filter(value => value.trim().startsWith('jwt='))[0].split('=')[1];
			const jwt = data.accessToken;
			window.localStorage.setItem("jwt", JSON.stringify(jwt));
			history.push('/me');
		}).catch(err => {
			// console.log(err.message);
			console.log(err);
		})
	};

	return (
		<form className="login-form" onSubmit={(e) => handleSubmit(e)}>
			<label>Email</label>
			<input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
			<label>Password</label>
			<input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
			{ errorText && <div className="error">✕ {errorText}</div> }
			<button className="submit">Submit</button>
			<div className="login-register">Need an account? <Link to="/register">Register</Link></div>
		</form>
	);
};

export default Login;