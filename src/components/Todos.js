import Home from './Home.js'
// import useFetch from '../hooks/useFetch';
import { useState } from 'react';

function Todos() {
 	const [collection, setCollection] = useState(JSON.parse(window.localStorage.getItem("todos")));
 	const [error, setError] = useState(null);
 	
 	try {
 		if (collection === null) {
			window.localStorage.setItem("todos", "[]");
		}
 	} catch (e) {
 		setError(e.message);
 	}

	return (
		<div className="Home">
			{ error && <div>{ error }</div> }
		    { collection && <Home data={collection}/> }
		</div>
	);
}

export default Todos;
