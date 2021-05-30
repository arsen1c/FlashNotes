import { useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Note from './Note'; 

const TodoDetails = (props) => {
	const { id } = useParams();
	const { data, error, isPending } = useFetch('http://localhost:4000/api/notes', JSON.parse(localStorage.getItem('jwt')));
	return(
		<div>
			{ error && <div>{ error }</div> }
			{ isPending && <div>Loading...</div> }
			{ data && <Note notes={data.data.notes} id={parseInt(id)}/> }
		</div>
	)
}

export default TodoDetails;