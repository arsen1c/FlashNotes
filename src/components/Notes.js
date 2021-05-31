import NotesHome from './NotesHome.js'
import useFetch from '../hooks/useFetch';
import { Redirect } from 'react-router-dom';
import React from 'react';
import {Spinner} from './Spinner';


function Notes() {
	const isAuthenticated = localStorage.getItem('jwt');
 	const { data, error, isPending } = useFetch('https://react-notes-api.vector2912.repl.co/api/notes', JSON.parse(localStorage.getItem('jwt')));
	return isAuthenticated ? (
		<div className="Home">
			{ error && <div>{ error }</div> }
			{ isPending && <Spinner></Spinner> }
		    { data && <NotesHome data={data.data.notes}/> }
		</div>
	) : (
		<Redirect to={{ pathname: '/login' }} />
	)
}

export default Notes;
