import { useParams } from 'react-router-dom';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import EditModal from './EditModal';

export default function TodoDetails() {
	const todos = JSON.parse(window.localStorage.getItem("todos"));
	const { id } = useParams();
	const history = useHistory();
	const [showModal, setshowModal] = useState(false);

	let todo = todos.filter((item, index) => {
		return item.id === parseInt(id);
	})

	const handleBackButton = () => {
		history.push("/todos");
	}

	const handleModal = (value) => {
		setshowModal(value);
	}

	return(
		<div className="details">

			{ todo.length > 0 && 
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
			}
		</div>
	)
}