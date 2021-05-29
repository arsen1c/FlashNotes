import { useState } from 'react';
import { useHistory } from "react-router-dom";

const Login = (porps) => {

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Email:', email);
		console.log('Password:', password);

		// Request to server
		fetch("http://localhost:4000/api/login", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			credentials: 'include',
			body: JSON.stringify({ email, password })
		}).then(res => {
			console.log(res.ok);
			return res.json();
		}).then(data => {
			const jwt = document.cookie.split(';').filter(value => value.trim().startsWith('jwt='))[0].split('=')[1];
			window.localStorage.setItem("jwt", JSON.stringify(jwt));
			history.push('/me');
		}).catch(err => {
			console.log('Error Occurred!');
		})
	};

	return (
		<form className="login-form" onSubmit={(e) => handleSubmit(e)}>
			<label>Email</label>
			<input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
			<label>Password</label>
			<input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
			<button className="submit">Submit</button>
		</form>
	);
};

export default Login;