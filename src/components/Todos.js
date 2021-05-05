import Home from './Home.js'
import useFetch from '../hooks/useFetch';

function Todos() {
 	const { data: collection, isPending, error } = useFetch('http://localhost:8000/collection');

	return (
		<div className="Home">
			{ error && <div>{ error }</div> }
			{ isPending && <div>Loading...</div> }
		    { collection && <Home data={collection}/> }
		</div>
	);
}

export default Todos;
