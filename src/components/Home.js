import Collection from './Collection.js'
import { useState, useEffect } from 'react';

function Home() {
 	
	const [collection, setCollection] = useState(null);
	const [isLoading, setisLoading] = useState(true);
	const [error, setError] = useState(null);

 	useEffect(() => {
 	 	fetch('http://localhost:8000/collection')
 	 		.then(res => {
 	 			if (!res.ok) {
 	 				throw Error("Could not fetch the data from that resource");
 	 			}
 	 			return res.json();
 	 		})
 	 		.then(data => {
 	 			setCollection(data);
 	 			setisLoading(false);
 	 			setError(null);
 	 		})
 	 		.catch(err => {
 	 			setError(err.message);
 	 			setisLoading(false);
 	 		})
 	 }, []) 

  return (
    <div className="Home">
    	{ error && <div>{ error }</div> }
    	{ isLoading && <div>Loading...</div> }
        { collection && <Collection data={collection}/> }
    </div>
  );
}

export default Home;
