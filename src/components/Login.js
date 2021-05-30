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
			console.log(res.ok);
			if (res.status === 401){ 
				console.log(res)
				setErrorText('Invalid Credentials');
				throw new Error('Invalid Credentials')
			}
			return res.json().then(data => {
				
				return data;
			});
			// return res.json();
		}).then(data => {
			console.log('From 2nd Then:', data);
			// console.log(data);
			const jwt = document.cookie.split(';').filter(value => value.trim().startsWith('jwt='))[0].split('=')[1];
			window.localStorage.setItem("jwt", JSON.stringify(jwt));
			history.push('/me');
		}).catch(err => {
			console.log(err.message);
			console.log(err);
			console.log('Error Occurred!');
		})
	};

	return (
		<form className="login-form" onSubmit={(e) => handleSubmit(e)}>
			<div>{errorText}</div>
			<label>Email</label>
			<input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
			<label>Password</label>
			<input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
			<button className="submit">Submit</button>
			<div>Need an account? <Link to="/register">Register</Link></div>
		</form>
	);
};

export default Login;