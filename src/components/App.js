import React, { useEffect } from 'react';
import Notes from './notes/Notes.js';
import NoteDetails from './notes/NoteDetails';
import Navbar from './navbar/Navbar.jsx';
import Login from './auth/Login.js';
import Register from './auth/Register.js';
import Me from './home/Me.js';
import Home from './home/Home.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { getJWT, getJwtToken } from '../helpers';

function App() {

	const token = getJwtToken();

	useEffect(() => {
		const jwt = getJWT();
		if (jwt) {
			const now = new Date(Date.now()).getTime();
			if (now > jwt.expiry) {
				localStorage.removeItem('jwt');
			};
		} 
	}, [])

  return (
    <Router>
    	<div className="App">
	        <Navbar />
	        <Switch>
	        	<Route exact path="/">
	        		<Home />
	        	</Route>
	        	<Route exact path="/notes">
	        		<Notes token={token}/>
	        	</Route>
	        	<Route path="/notes/:id">
	        		<NoteDetails />
	        	</Route>
	        	<Route path="/login">
	        		<Login />
	        	</Route>
	        	<Route path="/register">
	        		<Register />
	        	</Route>
	        	<Route path="/me">
	        		<Me token={token}/>
	        	</Route>
	        </Switch>
	    </div>
    </Router>
  );
}

export default App;
