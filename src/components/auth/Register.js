import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import { SpinnerSmall } from '../Animations';

const Register = (porps) => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setconfirmPassword] = useState('');
	const [errorText, setErrorText] = useState('');
	const [buttonText, setbuttonText] = useState('Register');
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setbuttonText(<SpinnerSmall />);

		// Request to server
		fetch("https://react-notes-api.vector2912.repl.co/api/register", {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			credentials: 'include',
			body: JSON.stringify({ username, email, password, repeat_password: confirmPassword, date: new Date().getTime() })
		}).then(res => {
			// console.log(res.ok);
			if (res.status === 401){ 
				// console.log(res)
				res.json().then((data) => setErrorText(data.message));
				throw new Error('Error Register')
			}

			if (!res.ok) {
				res.json().then((data) => {
					if (data.message === '"repeat_password" must be [ref:password]') {
						return setErrorText('Passwords mismathed!');
					}
					setErrorText(data.message);
				});
				throw new Error('Validation Error');
			}
			return res.json();
		}).then(data => {
			// console.log('Data:', data);
			setbuttonText('Register');
			history.push('/login');
		}).catch(err => {
			setbuttonText('Register');
			// console.log('Error Occurred!');
		})
	};

	return (
		<div className="login-form">
			<h1>Register</h1>
			<form  onSubmit={(e) => handleSubmit(e)}>
				<label>Username</label>
				<input name="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
				<label>Email</label>
				<input name="email" type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required/>
				<label>Password</label>
				<input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
				<label>Confirm Password</label>
				<input name="repeat_password" type="password" placeholder="Confirm Password" onChange={(e) => setconfirmPassword(e.target.value)} required />
				{ errorText && <div className="error">✕ {errorText}</div> }
				<button className="submit">{buttonText}</button>
				<div className="login-register">Already have an account? <Link to="/login">Login</Link></div>
			</form>
		</div>
	);
};

export default Register;