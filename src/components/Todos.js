import Home from './Home.js'
import { useState } from 'react';

function Todos() {
 	const [error, setError] = useState(null);

 	const collection = JSON.parse(window.localStorage.getItem("todos"));
 	
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
