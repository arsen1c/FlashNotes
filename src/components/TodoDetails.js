import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Note from './Note';
import React from 'react'; 

const TodoDetails = (props) => {
	const { id } = useParams();
	const { data, error, isPending } = useFetch('https://react-notes-api.herokuapp.com/api/notes', JSON.parse(localStorage.getItem('jwt')));
	return(
		<div>
			{ error && <div>{ error }</div> }
			{ isPending && <div>Loading...</div> }
			{ data && <Note notes={data.data.notes} id={parseInt(id, 10)}/> }
		</div>
	)
}

export default TodoDetails;