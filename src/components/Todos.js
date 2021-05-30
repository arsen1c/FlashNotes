import TodoHome from './TodoHome.js'
import useFetch from '../hooks/useFetch';
import { Redirect } from 'react-router-dom';
import React from 'react';

function Todos() {
	const isAuthenticated = localStorage.getItem('jwt');
 	const { data, error, isPending } = useFetch('https://react-notes-api.herokuapp.com/api/notes', JSON.parse(localStorage.getItem('jwt')));
	return isAuthenticated ? (
		<div className="Home">
			{ error && <div>{ error }</div> }
			{ isPending && <div>Loading...</div> }
		    { data && <TodoHome data={data.data.notes}/> }
		</div>
	) : (
		<Redirect to={{ pathname: '/login' }} />
	)
}

export default Todos;
