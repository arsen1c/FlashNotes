import React, { useEffect } from 'react';
import Notes from './Notes.js';
import NoteDetails from './NoteDetails';
import Navbar from './Navbar.jsx';
import Login from './Login.js';
import Register from './Register.js';
import Me from './Me.js';
import Home from './Home.js';
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
