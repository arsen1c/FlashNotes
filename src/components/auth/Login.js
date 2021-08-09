import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { SpinnerSmall } from '../animations/Animations';

const Login = (porps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [buttonText, setbuttonText] = useState('Login');
  const history = useHistory();

  // const localhost = 'http://localhost:4000/api/login';
  const server = 'https://react-notes-api.vector2912.repl.co/api/login';

  const handleSubmit = (e) => {
    e.preventDefault();
    setbuttonText(<SpinnerSmall />);
    
    fetch(server, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (res.status === 401) {
          setErrorText('invalid credentials');
          throw new Error('invalid credentials');
        }
        return history.push('/notes');
      })
      .catch((err) => {
        setbuttonText('Login');
      });
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>Email</label>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorText && <div className="error">✕ {errorText}</div>}
        <button className="submit">{buttonText}</button>
        <div className="login-register">
          Need an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
