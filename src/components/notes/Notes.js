import NotesHome from './NotesHome.js'
import useFetch from '../../hooks/useFetch';
import React from 'react';
import {Spinner} from '../Animations';
import { Redirect } from 'react-router-dom';

function Notes() {
 	const { data, error, isPending } = useFetch('/notes');

	return (
		<div className="Home">
			{ error && <Redirect to={{ pathname: '/login' }} /> }
			{ isPending && <Spinner></Spinner> }
		    { data && <NotesHome data={data.data.notes} username={data.data.username}/> }
		</div>
	)
}

export default Notes;
