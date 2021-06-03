import { useParams, Redirect } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Note from './Note';
import React from 'react'; 
import {Spinner} from './Animations';
import { getJwtToken } from '../helpers';

const NoteDetails = (props) => {
	const { id } = useParams();
	const token = getJwtToken();

	const { data, error, isPending } = useFetch('https://react-notes-api.vector2912.repl.co/api/notes', token);
	return token ? (
		<div>
			{ error && <div>{ error }</div> }
			{ isPending && <Spinner></Spinner> }
			{ data && <Note notes={data.data.notes} id={parseInt(id, 10)}/> }
		</div>
	) : (
		<Redirect to={{ pathname: '/login' }} />
	)
}

export default NoteDetails;