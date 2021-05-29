import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import EditModal from './EditModal';
import useFetch from '../hooks/useFetch';

export default function TodoDetails() {
	const { data, error, isPending } = useFetch('http://localhost:4000/api/notes', JSON.parse(localStorage.getItem('jwt')));
	const { id } = useParams();
	console.log('TODO ID:', id);
	// const history = useHistory();
	// const [showModal, setshowModal] = useState(false);
	// console.log(localStorage.getItem('jwt'));
	// console.log(data);
	let todo = data.data.notes.filter((item, index) => {
		return index + 1 === parseInt(id);
	})
	console.log(todo);

	// const handleBackButton = () => {
	// 	history.push("/todos");
	// }

	// const handleModal = (value) => {
	// 	setshowModal(value);
	// }

	return(
		<div className="details">
			{ error && <div>{ error }</div> }
			{ isPending && <div>Loading...</div> }
			{/*{ todo.length > 0 && 
				<div className="details-content">
					<div onClick={() => handleModal(true)} className="edit"><i className="far fa-edit fa-2x link"></i></div>
					<i className="fas fa-arrow-left fa-2x" onClick={handleBackButton}></i>			
					<h1 className="details-heading">{todo[0].title}</h1>
					<div className="details-date tasks-date">{todo[0].date}</div>	
					<div className="details-description">
						<ReactMarkdown  children={todo[0].description} />
					</div>
					<EditModal title={todo[0].title} description={todo[0].description} id={todo[0].id} onClose={() => handleModal(false)} show={showModal}/> 
				</div>
			}*/}
		</div>
	)
}