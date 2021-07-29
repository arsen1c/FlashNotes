import React, { useEffect } from 'react';
import Notes from './notes/Notes.js';
import NoteDetails from './notes/NoteDetails';
import Navbar from './navbar/Navbar.jsx';
import Login from './auth/Login.js';
import Register from './auth/Register.js';
import Me from './home/Me.js';
import Home from './home/Home.js';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
    	<div className="App">
	        <Navbar />
	        <Switch>
	        	<Route exact path="/">
	        		<Home />
	        	</Route>
	        	<Route exact path="/notes">
	        		<Notes/>
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
	        		<Me/>
	        	</Route>
	        </Switch>
	    </div>
    </Router>
  );
}

export default App;
