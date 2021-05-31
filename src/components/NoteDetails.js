import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Note from './Note';
import React from 'react'; 
import {Spinner} from './Spinner';

const NoteDetails = (props) => {
	const { id } = useParams();
	const { data, error, isPending } = useFetch('https://react-notes-api.vector2912.repl.co/api/notes', JSON.parse(localStorage.getItem('jwt')));
	return(
		<div>
			{ error && <div>{ error }</div> }
			{ isPending && <Spinner></Spinner> }
			{ data && <Note notes={data.data.notes} id={parseInt(id, 10)}/> }
		</div>
	)
}

export default NoteDetails;