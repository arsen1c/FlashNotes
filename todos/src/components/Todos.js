import TodoHome from './TodoHome.js'
// import { useState } from 'react';
import useFetch from '../hooks/useFetch';

function Todos() {
 	// const collection = JSON.parse(window.localStorage.getItem("todos"));
 	// const [collection, setCollection] = useState(null);

 	const { data, error, isPending } = useFetch('http://localhost:4000/api/notes', JSON.parse(localStorage.getItem('jwt')));
 	
	return (
		<div className="Home">
			{ error && <div>{ error }</div> }
			{ isPending && <div>Loading...</div> }
		    { data && <TodoHome data={data.data.notes}/> }
		</div>
	);
}

export default Todos;
