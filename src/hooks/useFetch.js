import { useState, useEffect } from 'react';

// const localHost = 'http://localhost:4000/api';
const server = 'https://react-notes-api.vector2912.repl.co/api';

const useFetch = (endpoint) => {
	const [data, setData] = useState(null);
	const [isPending, setisPending] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetch(server.concat(endpoint), {
			credentials: 'include'
		})
			.then(res => {
				// Check for errors in response
				if (!res.ok) {
					throw Error('Could not fetch the data for that resource');
				}
				// Convert the response to JSON;
				return res.json();
			})
			.then(data => {
				setData(data);
				setisPending(false);
				setError(null);
			})
			.catch(err => {
				setError(err.message);
				setisPending(false);
			})
	}, [endpoint]);
	
	return { data, isPending, error };

}

export default useFetch;