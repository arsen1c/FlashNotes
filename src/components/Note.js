import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useHistory } from 'react-router-dom';
import EditModal from './EditModal';
import React from 'react';

const Note = ({ notes, id }) => {
	const history = useHistory();
	const [showModal, setshowModal] = useState(false);
	
	const handleBackButton = () => {
		history.push("/todos");
	}
	const handleModal = (value) => {
		setshowModal(value);
	}

	// Get note with proper id
	const todo = notes.filter((item, index) => {
		return item.id === id;
	});

	return (
		<div className="details">
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
		</div>
	)
}


export default Note;