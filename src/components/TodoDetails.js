import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function TodoDetails() {
	const [collection, setCollection] = useState(JSON.parse(window.localStorage.getItem("todos")));
	const [data, setData] = useState(null);
	const [isPending, setisPending] = useState(true);
	const { id } = useParams();

	// const tdocollection.map((item) => {
	// 	if (item.id === parseInt(id)) {
	// 		console.log('Item Found: ', item)
	// 		setisPending(false);
	// 		setData(item);
	// 	}
	// })

	return(
		<div className="details">
			{/*{ isPending && <div className="loading">Loading...</div> }
			{ data && (
				<div className="details">
					<div className="title">{ data.title }</div>
					<div className="description">{ data.description }</div>
				</div>
			)}*/}
		</div>
	)
}